const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        if (!isValid(username)) { 
            users.push({"username":username,"password":password});
            return res.status(200).json({message: "User successfully registred. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});    
        }
    } 
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
    let books_promise = new Promise((resolve, reject) => {
        resolve(res.send(JSON.stringify(books, null, 4)));
    });
    books_promise.then(() => console.log("Promise resolved"))
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
    let isbn_promise = new Promise((resolve, reject) => {
      const isbn = req.params.isbn;
      resolve(res.send(books[isbn]));
    });
    isbn_promise.then(() => console.log("Promise resolved"))
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
    let author_promise = new Promise((resolve, reject) => {
      const author = req.params.author;
      const result = [];
      Object.keys(books).forEach(x => {
        const temp = books[x];
        if (temp.author === author) {
            result.push(temp);
        }
      })
      resolve(res.send(result));
    });
    author_promise.then(() => console.log("Promise resolved"))
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
    let title_promise = new Promise((resolve, reject) => {
        const title = req.params.title;
        const result = [];
        Object.keys(books).forEach(x => {
            const temp = books[x];
            if (temp.title === title) {
                result.push(temp);
            }
        })
        resolve(res.send(result));
    });
    title_promise.then(() => console.log("Promise resolved"))


    
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
    const isbn = req.params.isbn;
    res.send(books[isbn]["reviews"]);
});

module.exports.general = public_users;
