const express = require('express');
const passport = require('passport');
const authRouter = express.Router();
// const debug = require('debug')('app:adminRoutes');
const connection = require('../../services/connection');

function router(nav) {

	authRouter.route('/signUp')
		.post((req, res) => {
			const { username, password } = req.body;
			// debug(req.body);

			// create user
			const user = { username, password };
			connection.query('INSERT INTO users set ?', user, function (err, rows, fields) {
				if (err) throw err;

				// log user in. This is stupid, but it's good enough for now
				const id = rows.insertId
				req.login({ id, ...user }, () => {
					res.redirect('/auth/profile');
				});
			});
		});

	authRouter.route('/signin')
		.get((req, res) => {
			res.render('signin', {
				nav,
				title: 'Sign In'
			});
		})
		.post(passport.authenticate('local', {
			successRedirect: '/auth/profile',
			failureRedirect: '/'
		}));

	authRouter.route('/profile')
		.all((req, res, next) => {
			if (req.user) {
				next();
			} else {
				res.redirect('/')
			}
		})
		.get((req, res) => {
			res.json(req.user);
		});

	authRouter.route('/logout')
		.get((req, res) => {
			req.logout();
			res.redirect('/');
		});

	return authRouter;
}

module.exports = router;