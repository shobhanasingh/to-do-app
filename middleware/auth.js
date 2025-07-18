const jwt = require('jsonwebtoken')
const SECRET = 'eyJhsw5c'

const authMiddleware = (req,res,next) => {
    const authHeader = req.headers.authorization
    if(!authHeader) return res.status(401).send({error:'No token provided'})
 
    const token = authHeader.split(' ')[1]
    try{
        const decoded = jwt.verify(token,SECRET)
        req.userId = decoded.userId;
        next()
    }catch(e){
        res.status(403).send({error:'Invalid token'})
    }


}

module.exports = authMiddleware;