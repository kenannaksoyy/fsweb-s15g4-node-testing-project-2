const model = require("./model");
const checkEngineerId = async (req, res, next) => {
    try{
      const possible = await model.findById(req.params.id);
      if(!possible){
          next({
            status:404,
            message:"Muhendis Bulunumadı"
          })
      }
      else{
          req.engineer=possible
      }
      next();
  }
  catch(err){
      next(err)
    }
}
const chechNewEngineer = async (req,res,next) =>{
    try{
        const {firstname, lastname, title} = req.body;
        if(!firstname || !lastname || !title){
            next({
                status:400,
                message:"Eksik Var"
            })
        }
        else{
            const id = (await model.insert(req.body))["eid"];
            const cEngineer = await model.findById(id);
            req.cEngineer = cEngineer;
        }
        next();
    }
    catch(err){
        next(err);
    }
}
module.exports = {checkEngineerId,chechNewEngineer}