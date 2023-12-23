
const inputForm = document.getElementById('input-form');
const bookshelfCompleteRack = document.getElementById('book-rack-complete');
const bookshelfUncompleteRack = document.getElementById('book-rack-uncomplete');

inputForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addBook();
});

function addBook() {
    const bookTitle = document.getElementById('bookTitle').value;
    const bookAuthor = document.getElementById('bookAuthor').value;
    const bookYear = parseInt(document.getElementById('bookYear').value);
    const bookIsCompleted = document.getElementById('bookIsCompleted').checked;

    const bookId = new Date().getTime().toString();
    const book = {
        id: bookId,
        title: bookTitle,
        author: bookAuthor,
        year: bookYear,
        isComplete: bookIsCompleted
    };

    let books = getBooksFromStorage();
    books.push(book);
    saveBooksToStorage(books);
    showBooks();
    showSuccessPopup();
}

function deleteBook(bookId) {
    let books = getBooksFromStorage();
    const index = books.findIndex(book => book.id === bookId);

    if (index !== -1) {
        books.splice(index, 1);
        saveBooksToStorage(books);
        showBooks();
    }
}

function showBooks(books) {
    bookshelfCompleteRack.innerHTML = '';
    bookshelfUncompleteRack.innerHTML = '';

    if (!books) {
        books = getBooksFromStorage();
    }

    books.forEach(book => {
        const bookCard = createBookCard(book);
        if (book.isComplete) {
            bookshelfCompleteRack.appendChild(bookCard);
        } else {
            bookshelfUncompleteRack.appendChild(bookCard);
        }
    });
}

function createBookCard(book) {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');

    const titleElement = document.createElement('h3');
    titleElement.innerText = book.title;

    const authorElement = document.createElement('p');
    authorElement.innerText = `Penulis: ${book.author}`;

    const yearElement = document.createElement('p');
    yearElement.innerText = `Tahun Terbit: ${book.year}`;

    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete-btn');
    completeBtn.innerText = book.isComplete ? 'Tandai Belum Selesai Dibaca' : 'Tandai Selesai Dibaca';
    completeBtn.addEventListener('click', function() {
        toggleCompleteStatus(book.id);
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerText = 'Hapus Buku';
    deleteBtn.addEventListener('click', function() {
        deleteBook(book.id);
    });

    bookCard.appendChild(titleElement);
    bookCard.appendChild(authorElement);
    bookCard.appendChild(yearElement);
    bookCard.appendChild(completeBtn);
    bookCard.appendChild(deleteBtn);

    return bookCard;
}

function toggleCompleteStatus(bookId) {
    let books = getBooksFromStorage();
    const index = books.findIndex(book => book.id === bookId);

    if (index !== -1) {
        books[index].isComplete = !books[index].isComplete;
        saveBooksToStorage(books);
        showBooks();
    }
}

function showSuccessPopup() {
    alert('Buku berhasil ditambahkan!');
}

function getBooksFromStorage() {
    const storedBooks = localStorage.getItem('books');
    return storedBooks ? JSON.parse(storedBooks) : [];
}

function saveBooksToStorage(books) {
    localStorage.setItem('books', JSON.stringify(books));
}

showBooks();