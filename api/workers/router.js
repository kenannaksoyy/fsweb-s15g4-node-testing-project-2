const workerModel=require("./model");
const { checkWorkerId,chechNewWorker} = require("./mw");
const router = require("express").Router();

router.get("/", async(req, res, next)=>{
    try{
        const workers = await workerModel.find();
        res.status(200).json(workers);
    }
    catch(err){
        next(err);
    }
});

router.get("/:id",checkWorkerId ,(req, res, next)=>{
    try{
        res.status(200).json(req.worker);
    }
    catch(err){
        next(err);
    }
});

router.post("/",chechNewWorker, (req,res,next)=>{
    try{
        res.status(201).json(req.cWorker);
    }
    catch(err){
        next(err);
    }
})

module.exports = router;