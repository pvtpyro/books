const mysql = require('mysql');

const config = {
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'books'
};

const connection = mysql.createConnection(config);

module.exports = connection;