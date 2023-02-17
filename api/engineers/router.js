const engineerModel=require("./model");
const { checkEngineerId, chechNewEngineer } = require("./mw");
const router = require("express").Router();

router.get("/", async(req, res, next)=>{
    try{
        const engineers = await engineerModel.find();
        res.status(200).json(engineers);
    }
    catch(err){
        next(err);
    }
});

router.get("/:id",checkEngineerId ,(req, res, next)=>{
    try{
        res.status(200).json(req.engineer);
    }
    catch(err){
        next(err);
    }
});

router.post("/",chechNewEngineer, (req,res,next)=>{
    try{
        res.status(201).json(req.cEngineer);
    }
    catch(err){
        next(err);
    }
})

module.exports = router;