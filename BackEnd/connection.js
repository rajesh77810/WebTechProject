const sql = require('mssql')
const sqlConfig = {
  user: 'DB_GROUP_21',
  password: 'DB_GROUP_21',
  database: 'DB_GROUP_21',
  server: '141.215.69.65',
  options: {
    trustServerCertificate: true 
  }
}


async function getConnection(){
    try {
        console.log(sqlConfig, 'sqlConfig')

        let pool = await new sql.ConnectionPool(sqlConfig);
        let connect = await pool.connect();
        let request = await connect.request();
          return request;
       } catch (err) {
        // ... error checks
        console.log(err.message)
       }
}

module.exports = {
    getConnection
}