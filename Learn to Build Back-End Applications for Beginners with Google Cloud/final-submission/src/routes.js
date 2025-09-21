// Import handler functions from the 'handlers' file
const {
    addBooksHandlerFunction,
    getBooksByIdHandlerFunction,
    getAllBooksHandlerFunction,
    updateBooksByIdHandlerFunction,
    deleteBooksByIdHandlerFunction,
} = require('./handlers');

// API route definitions
const routes = [
    {
        method: 'POST',  // HTTP POST method for adding a new book
        path: '/books',  // URL path for adding a book
        handler: addBooksHandlerFunction,  // Handler function to be executed for this route
    },
    {
        method: 'GET',  // HTTP GET method for retrieving all books
        path: '/books',  // URL path for getting the list of all books
        handler: getAllBooksHandlerFunction,  // Handler function for retrieving all books
    },
    {
        method: 'GET',  // HTTP GET method for retrieving a book by ID
        path: '/books/{bookId}',  // URL path for getting a book by a specific ID, ID is provided as a parameter
        handler: getBooksByIdHandlerFunction,  // Handler function for retrieving a book by ID
    },
    {
        method: 'PUT',  // HTTP PUT method for updating a book by ID
        path: '/books/{bookId}',  // URL path for updating a book by a specific ID
        handler: updateBooksByIdHandlerFunction,  // Handler function for updating a book by ID
    },
    {
        method: 'DELETE',  // HTTP DELETE method for deleting a book by ID
        path: '/books/{bookId}',  // URL path for deleting a book by a specific ID
        handler: deleteBooksByIdHandlerFunction,  // Handler function for deleting a book by ID
    },
];

// Export routes for use in other parts of the application
module.exports = routes;