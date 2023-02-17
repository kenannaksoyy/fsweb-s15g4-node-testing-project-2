const server  = require("./api/server.js");
require("dotenv").config();
const port = process.env.port || 9000;

server.listen(port, ()=>{
    console.log(`${port} dinleniyor`);
});