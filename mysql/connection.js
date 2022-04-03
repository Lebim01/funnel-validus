import mysql from 'mysql-await'

const connection = mysql.createConnection({
    host: '67.205.189.142',
    user: 'user',
    password: '123987xd',
    database: 'validus'
});

connection.connect();

export default connection