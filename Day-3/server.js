const express = require("express");
const app = express();

app.use(express.json())

const notes =[]


app.post("/notes",(req,res)=>{
    res.send("Note created")

    notes.push(req.body)

    console.log(req.body)
})


app.get("/notes",(req,res)=>{
    res.send(notes)
})


app.listen(3000,()=>{
    console.log("Server is running at 3000 port")
})
