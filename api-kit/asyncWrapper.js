const asyncWrapper = (fn) => (req, res, next)=> Promise.resolve().then(() => (fn(req,res,next))).catch(next)
module.exports = asyncWrapper