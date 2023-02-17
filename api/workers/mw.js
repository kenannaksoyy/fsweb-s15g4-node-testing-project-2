const model = require("./model");
const checkWorkerId = async (req, res, next) => {
    try{
      const possible = await model.findById(req.params.id);
      if(!possible){
          next({
            status:404,
            message:"Worker Bulunumadı"
          })
      }
      else{
          req.worker=possible
      }
      next();
  }
  catch(err){
      next(err)
    }
}
const chechNewWorker = async (req,res,next) =>{
    try{
        const {firstname, lastname} = req.body;
        if(!firstname || !lastname ){
            next({
                status:400,
                message:"Eksik Var"
            })
        }
        else{
            const id = (await model.insert(req.body))["wid"];
            const cWorker = await model.findById(id);
            req.cWorker = cWorker;
        }
        next();
    }
    catch(err){
        next(err);
    }
}
module.exports = {checkWorkerId,chechNewWorker}