require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Student = require("./schema.js");

// const db = process.env.SECRET;
const db =
  "mongodb+srv://vidipt01:vidu2602@crudoperations.5a1kc.mongodb.net/StudentInfo?retryWrites=true&w=majority";

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => {
    console.log("No connection");
  });

const app = express();
app.use(express.json());
const port = 3000;

app.get("/", (req, res) => {
  res.send("Server Started!");
});

app.post("/create", async (req, res) => {
  const student = new Student(req.body);
  console.log(req.body);
  try {
    await student.save();
    res.send({
      message: "Saved",
      data: student,
    });
  } catch {
    res.status(404).send("error");
  }
});

app.delete("/delete", async (req, res) => {
  try {
    Student.findByIdAndDelete(req.body.id, () => {
      res.status(200).send({
        message: "Deleted",
      });
    });
  } catch {
    res.status(404).send("error");
  }
});

app.get("/read", async (req, res) => {
  try {
    const student = await Student.find({});
    res.status(201).send(student);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/find", async (req, res) => {
  try {
    const student = await Student.findById(req.body.id);
    res.send({
      message: "Showing data",
      data: student,
    });
  } catch (error) {
    res.status(404).send(error);
  }
});

app.patch("/update", async (req, res) => {
  try {
    const { id, name, regNo, address } = req.body;
    // console.log(id);
    await Student.findOneAndUpdate(
      { _id: id },
      { name, regNo, address },
      async function (err, data) {
        if (err) {
          console.log(err);
        }
        await data.save();
        console.log(data);
        res.status(200).send({
          message: "Updated!",
          data,
        });
      },
      {
        new: true,
      }
    );
    // console.log("Completed");
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log("Server is listening at port: " + port);
});
