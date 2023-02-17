const express = require("express");
const server = express();
const rEngineer = require("./engineers/router");
const rWorker = require("./workers/router");
server.use(express.json());
server.use("/api/engineers",rEngineer);
server.use("/api/workers",rWorker);

server.get("/",async (req,res) =>{
    res.status(200).json({
        message:"Server Get Deneme",
    });
});

server.use("*", (req,res) => {
    res.status(404).json({
        message:"Opps Sayfa Yok"
    });
});

server.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    });
});
  

module.exports = server;