const express = require('express');
const bookRouter = express.Router();
const debug = require('debug')('app:bookRoutes');
const connection = require('../../services/connection');

function router(nav) {

	bookRouter.use((req, res, next) => {
		if (req.user) {
			next();
		} else {
			res.redirect('/')
		}
	});

	bookRouter.route('/')
		.get((req, res) => {

			connection.query('SELECT * from books', function (err, rows, fields) {
				if (err) throw err;

				// debug(fields)
				res.render(
					'bookListView',
					{
						nav,
						title: 'Library',
						books: rows
					}
				);
			});

		});

	bookRouter.route('/:id')
		.all((req, res, next) => {
			const { id } = req.params;
			connection.query(`SELECT * from books where id = ?`, id, function (err, rows, fields) {
				if (err) throw err

				debug(rows)
				req.book = rows;
				next();

			});
		})
		.get((req, res) => {
			// TOOD: if no book, show 404
			res.render(
				'bookListView',
				{
					nav,
					title: 'Library',
					books: req.book
				}
			);
		});
	
	return bookRouter;
}


module.exports = router;
