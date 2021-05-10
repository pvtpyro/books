const axios = require('axios');
const debug = require('debug')('app:bookService');

function bookService() {
	function getBookById(id) {
		return new Promise((resolve, reject) => {

			axios.get(`https://openlibrary.org/works/${id}.json`)
				.then((response) => {
					debug(response);
					resolve(response.data)
				})
				.catch((error) => {
					reject(error);
					debug(error);
				})
			
		})
	}

	return { getBookById };
}

module.exports = bookService();