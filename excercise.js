// Book constructor (title only for now)
function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Array to store books
let myLibrary = [];

// Function to add a book and update the table
function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  displayBooks();
}

function removeBook(e) {
  const bookId = e.target.dataset.bookId;
  myLibrary = myLibrary.filter((book) => book.id !== bookId);
  displayBooks();
}

function ReadStatus(e){
  const bookId=e.target.dataset.bookId;
  const book=myLibrary.find(book=>book.id===bookId);
  if(book){
    book.read=!book.read;
    displayBooks();
  }
}

// Function to display books in the table (title only)
function displayBooks() {
  const table = document.querySelector(".library-table");
  // Remove all rows except the header
  table
    .querySelectorAll(".library-row:not(.library-header)")
    .forEach((row) => row.remove());

  // Add each book as a new row
  myLibrary.forEach((book) => {
    const row = document.createElement("div");
    row.classList.add("library-row");
    row.dataset.bookId = book.id;
    // Title cell
    const titleCell = document.createElement("div");
    titleCell.classList.add("library-cell");
    titleCell.textContent = book.title;
    row.appendChild(titleCell);

    const authorCell = document.createElement("div");
    authorCell.classList.add("library-cell");
    authorCell.textContent = book.author;
    row.appendChild(authorCell);

    const pagesCell = document.createElement("div");
    pagesCell.classList.add("library-cell");
    pagesCell.textContent = book.pages;
    row.appendChild(pagesCell);

    const readCell = document.createElement("div");
    readCell.classList.add("library-cell");
    readCell.textContent = book.read ? "Yes" : "No";
readCell.appendChild(document.createTextNode(" "));
    const readBtn=document.createElement("button");
    readBtn.textContent="Toggle";
    readBtn.classList.add("read-btn");
    readBtn.dataset.bookId=book.id;
    readBtn.addEventListener("click", ReadStatus);
    readCell.appendChild(readBtn);


    row.appendChild(readCell);

    //Remove Button:
    const removeCell = document.createElement("div");
    removeCell.classList.add("library-cell");
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn");
    removeBtn.dataset.bookId = book.id;
    removeBtn.addEventListener("click", removeBook);
    removeCell.appendChild(removeBtn);
    row.appendChild(removeCell);

    table.appendChild(row);
  });
}

// Handle form submission
document.getElementById("submit").addEventListener("click", function (e) {
  e.preventDefault();
  const title = document
    .querySelector('input[placeholder="Title"]')
    .value.trim();
  const author = document
    .querySelector('input[placeholder="Author"]')
    .value.trim();
  const pages = document
    .querySelector('input[placeholder="Pages"]')
    .value.trim();
  const read = document.getElementById("read").checked;

  if (title && author && pages) {
    addBookToLibrary(title, author, pages, read);
    document.querySelector('input[placeholder="Title"]').value = "";
    document.querySelector('input[placeholder="Author"]').value = "";
    document.querySelector('input[placeholder="Pages"]').value = "";
    document.getElementById("read").checked = false;
  }
});

displayBooks();
