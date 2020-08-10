module.exports = function (req,res,next) { 
    if(!req.user.isAmin) return res.status(403).send('forbidden')
    next()
}