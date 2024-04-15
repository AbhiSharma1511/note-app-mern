const express = require("express")
const cors = require("cors");
const dotenv = require("dotenv")
const app = express();

dotenv.config(
    {
        path: "./.env"
    }
)

app.use(express.json());

app.use(
    cors({
        origin:"*",
    })
);
app.get("/",(req,res)=>{
    res.send("Hello from server")
})

module.exports =  app;