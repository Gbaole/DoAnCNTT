//Catch Async Error 
module.exports = func => (req,res, next) => 
    Promise.resolve(func (req,res,next))
        .catch(next)