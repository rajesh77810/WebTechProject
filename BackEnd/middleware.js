const jwt = require('jsonwebtoken');

const KEY = 'asjdgfjhdgjkadgkdgjdf';


const cookieWithJwt = (req,res,next) =>{
    const {authorization} = req.headers;
    const token = authorization?.split('Bearer ')[1];
    if(!token ){
        return res.status(401).send({error:'error'})
    }
    try{
        const user = jwt.verify(token, KEY);
        req.user = user;
        // console.log(user,'user');
        next();
    } catch(err){
        console.log('asgadfgdfg', err.message)
        res.status(401).send({error:err.message})
    }
}

module.exports = {
    cookieWithJwt
}