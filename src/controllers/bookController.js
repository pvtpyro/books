const connection = require('../../services/connection');
const debug = require('debug')('app:bookController');

function bookController(bookService, nav) {

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
			connection.query(`SELECT * from books where id = ? LIMIT 1`, id, async function (err, rows, fields) {
				if (err) throw err;

				const book = rows[0];
				book.details = await bookService.getBookById(book.ol_id);
				debug(book);
				res.render(
					'bookView',
					{
						nav,
						title: 'Library',
						book
					}
				);
			});
		
		
	}

	function middleware(req, res, next) {
		// if (req.user) {
			next();
		// } else {
			// res.redirect('/')
		// }
	}

	return {
		getIndex,
		getById,
		middleware
	};

}

module.exports = bookController;