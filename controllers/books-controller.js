const Book = require("../model/Book");

const getAllBooks = async (req, res, next) => {
  let books;
  try {
    books = await Book.find();
  } catch (err) {
    console.log(err);
  }

  if (!books) {
    return res.status(404).json({ message: "No Product found" });
  }
  return res.status(200).json({ books });
};

const getGoodEmotion = async (req, res, next) => {
  let books;
  try {
    books = await Book.find({ emotion: { $gte: 3 } });
  } catch (err) {
    console.log(err);
  }

  if (!books) {
    return res.status(404).json({ message: "No Good Emotion found" });
  }
  return res.status(200).json({ books });
};

const getById = async (req, res, next) => {
  const id = req.params.id;
  let book;
  try {
    book = await Book.findById(id);
  } catch (err) {
    console.log(err);
  }

  if (!book) {
    return res.status(404).json({ message: "No Book found" });
  }
  return res.status(200).json({ book });
};

const addBook = async (req, res, next) => {
  const {
    name,
    author,
    description,
    price,
    available,
    image,
    date,
    today,
    emotion,
    content,
  } = req.body;
  let book;
  try {
    book = new Book({
      name,
      author,
      description,
      price,
      available,
      image,
      date,
      today,
      emotion,
      content,
    });
    await book.save();
  } catch (err) {
    console.log(err);
  }

  if (!book) {
    return res.status(500).json({ message: "Unable to Add" });
  }
  return res.status(201).json({ book });
};

const updateBook = async (req, res, next) => {
  const id = req.params.id;
  const {
    name,
    author,
    description,
    price,
    available,
    image,
    date,
    today,
    emotion,
    content,
  } = req.body;
  let book;
  try {
    book = await Book.findByIdAndUpdate(id, {
      name,
      author,
      description,
      price,
      available,
      image,
      date,
      today,
      emotion,
      content,
    });
    book = await book.save();
  } catch (err) {
    console.log(err);
  }

  if (!book) {
    return res.status(404).json({ message: "Unable to Update By this ID" });
  }
  return res.status(200).json({ book });
};

const deleteBook = async (req, res, next) => {
  const id = req.params.id;
  let book;
  try {
    book = await Book.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }

  if (!book) {
    return res.status(404).json({ message: "Unable to Delete By this ID" });
  }
  return res.status(200).json({ message: "Product Successfully Deleted" });
};

exports.getAllBooks = getAllBooks;
exports.getGoodEmotion = getGoodEmotion;
exports.getById = getById;
exports.addBook = addBook;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;
