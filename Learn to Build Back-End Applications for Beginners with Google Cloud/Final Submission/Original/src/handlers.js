// Import nanoid from nanoid package and books array from books.js
const { nanoid } = require('nanoid');
const books = require('./books');

// Function to add a new book
const addBooksHandlerFunction = (request, h) => {
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading
    } = request.payload;

    // Create a unique ID for the book using nanoid
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = (pageCount === readPage);

    // Create a new book object
    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
    };

    /*
        Case 1: If the client does not include the name property, send a failure response
    */
    
    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Failed to add the book. Please provide the book name'
        });
        response.code(400);
        return response;
    }

    /*
        Case 2: If the value of readPage is greater than pageCount, send a failure response
    */

    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Failed to add the book. readPage cannot be greater than pageCount'
        });
        response.code(400);
        return response;
    }

    /*
        Case 3: If all rules are met, add the book to the books array
    */

    books.push(newBook);

    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Book successfully added',
            data: {
                bookId: id,
            },
        });
        response.code(201);
        return response;
    }
};

// Function to get all books
const getAllBooksHandlerFunction = (request, h) => {
    const {
        name,
        reading,
        finished
    } = request.query;

    // Copy the books array into a temporary variable
    let sortedBooks = books;

    // Filter by name query parameter (if provided)
    if (name !== undefined) {
        sortedBooks = books.filter((b) => b.name.toLowerCase().includes(name.toLowerCase()));
    } 
    // Filter by reading status (if provided)
    else if (reading !== undefined) {
        sortedBooks = books.filter((b) => b.reading === !!Number(reading));
    } 
    // Filter by finished status (if provided)
    else if (finished !== undefined) {
        sortedBooks = books.filter((b) => b.finished === !!Number(finished));
    }
    
    // If no matching books, return an empty array
    if (sortedBooks.length === 0) {
      const response = h.response({
        status: 'success',
        data: {
          books: [],
        }
      });
      response.code(200);
      return response;
    }

    // Return the result showing only id, name, and publisher
    const response = h.response({
        status: 'success',
        data: {
            books: sortedBooks.map((book) => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
            })),
        },
    });
    response.code(200);
    return response;
};

// Function to get a book by ID
const getBooksByIdHandlerFunction = (request, h) => {
    const { bookId } = request.params;

    // Find the book by ID
    const book = books.filter((book) => book.id === bookId)[0];

    /*
        Case 1: If the book is found by ID
    */

    if (book !== undefined) {
        const response = h.response({
            status: 'success',
            data: {
                book,
            },
        });
        response.code(200);
        return response;
    }

    /*
        Case 2: If the book is not found by ID
    */

    const response = h.response({
        status: 'fail',
        message: 'Book not found'
    });
    response.code(404);
    return response;
}

// Function to update a book by ID
const updateBooksByIdHandlerFunction = (request, h) => {
    const { bookId } = request.params;

    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading
    } = request.payload;
    const updatedAt = new Date().toISOString();

    /*
        Case 1: If the name property is not provided, send a failure response
    */

    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Failed to update the book. Please provide the book name'
        });
        response.code(400);
        return response;
    }

    /*
        Case 2: If the value of readPage is greater than pageCount, send a failure response
    */

    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Failed to update the book. readPage cannot be greater than pageCount'
        });
        response.code(400);
        return response;
    }

    /*
        Case 3: If all rules are met, update the book
    */
    const index = books.findIndex((book) => book.id === bookId);

    if (index !== -1) {
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            updatedAt
        };

        const response = h.response({
            status: 'success',
            message: 'Book successfully updated',
        });
        response.code(200);
        return response;
    }

    /*
        Case 4: If the ID is not found, send a failure response
    */

    const response = h.response({
        status: 'fail',
        message: 'Failed to update the book. Id not found',
    });
    response.code(404);
    return response;
};

// Function to delete a book by ID
const deleteBooksByIdHandlerFunction = (request, h) => {
    const { bookId } = request.params;

    const index = books.findIndex((book) => book.id === bookId);

    /*
        Case 1: If the ID is found, delete the book and send a success response
    */

    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Book successfully deleted',
        });
        response.code(200);
        return response;
    }

    /*
        Case 2: If the ID is not found, send a failure response
    */

    const response = h.response({
        status: 'fail',
        message: 'Failed to delete the book. Id not found',
    });
    response.code(404);
    return response;
}

// Export all functions for use in other handlers
module.exports = {
    addBooksHandlerFunction,
    getBooksByIdHandlerFunction,
    getAllBooksHandlerFunction,
    updateBooksByIdHandlerFunction,
    deleteBooksByIdHandlerFunction,
};