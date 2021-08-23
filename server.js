const express = require('express');
const mongoose = require('mongoose');
const myModel = require("./schema.js");

const db = "mongodb+srv://vidipt01:vidu2602@crudoperations.5a1kc.mongodb.net/StudentInfo?retryWrites=true&w=majority";


mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(()=>{
    console.log("Connection Successful");
}).catch((err)=>{
    console.log("No connection");
})

const app = express();
const port = 3000;

app.get('/', (req,res) => {
    res.send("Server Started!");
})

app.post('/create', async (req,res) => {
    const student = new myModel(req.body);
    try{
        await student.save();
        res.send({
          message: "Saved",
          data: student
        })
    }
    catch{
        res.status(404).send("error");
    }
})

app.post('/delete', async (req,res) => {
    student.findOneAndRemove(req.body);
    try{
        await student.save();
        res.send({
            message: "Deleted"
        })
    }
    catch{
        res.status(404).send("error");
    }
})

app.get('/read', async (req,res) => {
    try{
        res.send({
            message: "Showing all data",
            data: student
        })
    }
    catch{
        res.status(404).send("error");
    }
})



app.listen(port, () => {
    console.log("Server is listening at port: "+port);
});
