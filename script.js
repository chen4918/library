//variables
let myLibrary = [];
let addTableRow;
let bookTitle;
let bookAuthor;
let bookPages;
let readStatus;
let userInput;

//query selectors
const tableContents = document.querySelector('#tBody');
const addToBookListButton = document.querySelector('#addToBookListButton');

//event listeners
addToBookListButton.addEventListener('click', () => {
  addBookToLibrary();
  render(myLibrary);
  clearInputs();
});

//constructors
function Book(title, author, pages, readStatus) {
  this.title = title
  this.author = author
  this.pages = pages
  this.readStatus = readStatus
};

//functions
function addBookToLibrary() {
  bookTitle = document.getElementById('bookTitle').value;
  bookAuthor = document.getElementById('bookAuthor').value;
  bookPages = document.getElementById('bookPages').value;
  bookReadStatus = document.getElementById('bookReadStatus').value;

  if (bookTitle == '' || bookAuthor == '' || bookPages == '' || bookReadStatus == '') {
    alert('Missing entry. Please enter a value into each field.')
    return
  };

  if (isNaN(bookPages)) {
    alert('Invalid entry. Please enter a number of pages.')
    return
  };

  userInput = new Book(bookTitle, bookAuthor, bookPages, bookReadStatus);
  myLibrary.push(userInput);
};

function render(myLibrary) {
  let myLibraryIndex = 0;
  tableContents.innerText = '';
  for (let index in myLibrary) {
    addTableRow = document.createElement('tr');

    for (let property in myLibrary[index]) {
      let td = document.createElement('td')
      if (property == 'readStatus') {
        addReadSelection(td, myLibrary, index, property);
      } else {
          td.textContent = (`${myLibrary[index][property]}`)
      }
      addTableRow.appendChild(td)
    }

    tableContents.appendChild(addTableRow)
    addDeleteButton(myLibraryIndex);
    myLibraryIndex++;
  }
};

function addReadSelection(td, myLibrary, index, property) {
  let readSelection = document.createElement('select');
  td.appendChild(readSelection);
  let readStatusArray = ['No', 'Yes', 'In Progress']
    for (let i = 0; i < readStatusArray.length; i++) {
      let option = document.createElement('option');
      option.value = readStatusArray[i];
      option.text = readStatusArray[i];
      readSelection.appendChild(option)
    }
  let userReadStatus = myLibrary[index][property];
    for (let i, h = 0; i = readSelection.options[h]; h++) {
      if (i.value == userReadStatus) {
        readSelection.selectedIndex = h;
        break;
      }
    }
};

function addDeleteButton(myLibraryIndex) {
  let deleteButton = document.createElement('button');
  deleteButton.setAttribute('class', 'deleteButton');
  deleteButton.setAttribute('data-index', myLibraryIndex);
  deleteButton.textContent = 'Delete';
  addTableRow.appendChild(deleteButton);

  deleteButton.addEventListener('click', () => {
    myLibrary.splice(myLibraryIndex, 1);
    render(myLibrary);
  })
};

function clearInputs() {
  document.getElementById('bookTitle').value = '';
  document.getElementById('bookAuthor').value = '';
  document.getElementById('bookPages').value = '';
  document.getElementById('readStatus').value = 'No';
};
