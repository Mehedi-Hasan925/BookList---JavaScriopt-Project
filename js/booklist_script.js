//define all elements
let form_book = document.querySelector("#book_form");
let title_book = document.querySelector("#book_title");
let author_name = document.querySelector("#author");
let isbn = document.querySelector("#isbn");
let table_body = document.querySelector("#tbody_show");
let index=1;


//declare class
class Book{
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}


//add eventlistener
form_book.addEventListener("submit",add_book);
table_body.addEventListener("click",delete_book);

//UI function
class UI{
    constructor(){

    }
    add_to_booklist(book){
        let tbody = document.querySelector("#tbody_show");
        let row = document.createElement("tr");
        let th = document.createElement("th");
        th.setAttribute("scope","row");
        row.innerHTML=`<th scope="row">${index}</th>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#">x</a></td>`
        tbody.appendChild(row);
        index+=1;
    }

    clear_bookfield(){
          title_book.value ="";
          author_name.value ="";
          isbn.value ="";
    }

    show_alert_field(message,class_name)
    {
        let div = document.createElement("div");
        div.className =`showalert ${class_name}`;
        div.appendChild(document.createTextNode(message));
        let container = document.querySelector(".container");
        let form = document.querySelector("#book_form");
        container.insertBefore(div,form);
        setTimeout(function(){
            div.remove();
        },3000)
    }
}


//Define function
function add_book(e){
    e.preventDefault();
    let title = title_book.value;
    let author = author_name.value;
    let isbn_num = isbn.value;
    let ui = new UI();

    if(title==="" || author==="" || isbn_num===""){
        ui.show_alert_field("Please fill all the Fields","bg-danger");
    }
    else{
        let book = new Book(title,author,isbn_num);
        ui.add_to_booklist(book);
        ui.show_alert_field("Book added successfully","bg-info");
        ui.clear_bookfield();  
        store.addBooksInLS(book);
        
    }
    
}

function delete_book(e){
    let ui = new UI();
    if(e.target.hasAttribute("href")){
        let remove_tr = e.target.parentElement.parentElement;
        remove_tr.remove();
        let isbn = e.target.parentElement.previousElementSibling.textContent.trim();
        store.deleteFromLS(isbn);
        ui.show_alert_field("Book removed successfully","bg-info");
       
    }
}

//local storage
class store{
    static getBooks(){
        let books;
        if(localStorage.getItem("books")==null){
            books=[];
        }
        else{
            books = JSON.parse(localStorage.getItem("books"));
        }
        return books;
       
    }

    static addBooksInLS(book){
        let books = store.getBooks();
        books.push(book);
        localStorage.setItem("books",JSON.stringify(books));
    }

    static dispalyBooksFromLS(){
        let ui = new UI();
        let books = store.getBooks();
        books.forEach((book) => {
            ui.add_to_booklist(book);
        });
    }

    static deleteFromLS(isbn){
        let books = store.getBooks();
        books.forEach((book,index) => {
            if(book.isbn==isbn){
                books.splice(index,1);
            }
        });
        localStorage.setItem("books",JSON.stringify(books));
    }
}
document.addEventListener("DOMContentLoaded",store.dispalyBooksFromLS());