const passport = require('passport');
const { Strategy } = require('passport-local');
const debug = require('debug')('app:local.strategy');
const connection = require('../../../services/connection');

module.exports = function localStrategy() {

	passport.use(new Strategy(
		{
			usernameField: 'username',
			passwordField: 'password'
		}, (username, password, done) => {
			connection.query('SELECT * from users where username = ? LIMIT 1', username, function (err, rows, fields) {
				if (err) {
					throw err;
				}

				const user = rows[0];

				if (user.password == password) {
					done(null, user);
				}
				else {
					done(null, false);
				}
			});

		}
	));

}