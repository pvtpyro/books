const express = require('express');
const authRouter = express.Router();
const debug = require('debug')('app:adminRoutes');
const connection = require('../../services/connection');

function router() {
	authRouter.route('/signUp')
		.post((req, res) => {
			const { username, password } = req.body;
			debug(req.body);
			
			// create user
			const user = { username, password };
			connection.query('INSERT INTO users set ?', user, function (err, rows, fields) {
				if (err) throw err;

				// log user in. This is stupid, but it's good enough for now
				const id = rows.insertId
				req.login({id, ...user}, () => {
					res.redirect('/auth/profile');
				});
			});

		});

	authRouter.route('/profile')
		.get((req, res) => {
			res.json(req.user);
		});

	return authRouter;
}

module.exports = router;