const express = require("express");
const app = express();
const cors = require("cors");
const { getConnection } = require("./connection");
const bodyParser = require("body-parser");
const { loginHandler } = require('./handler')
const cookieParser = require('cookie-parser')
const { cookieWithJwt } = require('./middleware')
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true

  })
);

app.use(cookieParser())

//crud

app.get("/", function (req, res) {
  res.send("Hello World");
});
app.get("/test", async function (req, res) {
  res.send("testing application");
  const getConn = await getConnection();
  console.log(getConn, "getconnection");
  const result = await getConn.query("select * from Users");
  res.send(result.recordsets[0]);
});

app.post("/api/login", loginHandler);


app.get('/api/User', async function(req, res){

  const getCon =await getConnection();
  console.log(getCon, 'getconnection')
  const result = await getCon.query(
     "SELECT * FROM Users u"
  ); 
  res.send(result.recordsets[0])
})


app.get('/api/User/:mobileNo', async function(req,res){
  try{
    const { mobileNumber } = req.params;
    const getCon =await getConnection();
    console.log(getCon, 'getconnection')
    const result = await getCon.query(
       `SELECT * FROM Users  where mobileNo = ${mobileNumber}`
    ); 
    res.send(result.recordset[0])

  }catch(err) {
    console.log(err.message);
  }
})

app.delete("/api/deleteUser/:mobileNo.", cookieWithJwt ,async function (req, res) {
  try {
    const { firstName } = req.params;
    const getConn = await getConnection();
    const result = await getConn.query(
      `delete from Users where mobileNo. = ${mobileNumber}`
    );
    res.send("success");
  } catch (err) {
    console.log(err.message);
  }
});

app.put("/api/updateUser", cookieWithJwt ,async function (req, res) {
  try {
    const { firstName, lastName, email, mobileNumber, password, confirmPassword } = req.body;
  
    const getConn = await getConnection();
    const result = await getConn.query(
      `UPDATE Users
      SET firstName = '${firstName}', lastName= '${lastName}', email = '${email}', mobileNumber= '${mobileNumber}', password= '${password}', confirmPassword= '${confirmPassword}'
      WHERE emailAddress = ${email};`
    );

    res.send("success");
  } catch (err) {
    console.log(err.message);
    res.send("");
  }
});

app.post('/api/Users', async function (req, res) {
  try {
    const { firstName, lastName, mobileNumber, email, password, confirmPassword } = req.body;

    const getConn = await getConnection();
    const result = await getConn.query(
      `INSERT INTO Users
        VALUES ('${firstName}','${lastName}','${mobileNumber}', '${email}', '${password}','${confirmPassword}' )`
    );

    console.log("success 1");
    res.send(result.recordsets[0]);
  } catch (err) {
    console.log(err.message);
    res.send("");
  }
});

app.listen(process.env.PORT, () => {
  console.log(`node is running on ${process.env.PORT}`);
});
