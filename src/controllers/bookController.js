const connection = require('../../services/connection');
const debug = require('debug')('app:bookController');

function bookController(nav) {

	function getIndex(req, res) {
		connection.query('SELECT * from books', function (err, rows, fields) {
			if (err) throw err;
			res.render(
				'bookListView',
				{
					nav,
					title: 'Library',
					books: rows
				}
			);
		});
	}

	function getById(req, res) {
		// TOOD: if no book, show 404
		const { id } = req.params;
			connection.query(`SELECT * from books where id = ?`, id, function (err, rows, fields) {
				if (err) throw err
				debug(rows)
				req.book = rows;
				res.render(
					'bookListView',
					{
						nav,
						title: 'Library',
						books: req.book
					}
				);
			});
		
		
	}

	function middleware(req, res, next) {
		if (req.user) {
			next();
		} else {
			res.redirect('/')
		}
	}

	return {
		getIndex,
		getById,
		middleware
	};

}

module.exports = bookController;