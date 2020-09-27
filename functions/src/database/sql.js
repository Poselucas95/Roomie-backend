const sql = require( "mssql" );

var dbConfig = {
    server: '35.198.31.187',
    database: 'rumi-backend',
    user:'admin',
    password:'admin',
    options: {
        encrypt: true,
        enableArithAbort: true
        },
};


const getConnection = async () => {
    try {
       return await sql.connect(dbConfig)
    } catch ( err ) {
        console.log(err)
        return null
    }
};



module.exports = {getConnection};