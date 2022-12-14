const { getConnection } = require("./connection");
const jwt = require('jsonwebtoken');

const secretKey = 'asjdgfjhdgjkadgkdgjdf';

 const loginHandler =  async (req, res)=> {
    try {
      const { email, password } = req.body;
      if(email && password){

        const getConn = await getConnection();
        const result = await getConn.query(
          `select top 1 * from Users where emailAddress = '${email}' and password = '${password}'`
        );
    
const user = result.recordsets[0][0];
          console.log(user);
       const jwtToken=  jwt.sign(user, secretKey, { expiresIn: '1h' });

        res.cookie('token', jwtToken, { maxAge: 900000, httpOnly: true , Path:'/'});
        res.status(200).send({ user, token: jwtToken});

      }else{
        res.status(500).json({error:'ot emailAddress and password'});
      }
  

    } catch (err) {
      console.log(err.message);
      res.status(500).json({error:err.message});
    }
  }

  module.exports ={
    loginHandler
  }