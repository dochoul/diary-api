const Book = require("../model/Diary");

const getAllBooks = async (req, res, next) => {
  let books;
  const sort = req.query.sort;
  const emotion = req.query.emotion;
  const year = req.query.year;
  const month = req.query.month;

  var lastday = new Date(year, month, 0).getDate();
  const find_query = {
    date: {
      $gte: `${year}-${month}-01`,
      $lt: `${year}-${month}-${lastday}`,
    },
  };

  if (sort === "latest") {
    if (emotion === "all") {
      books = await Book.find(find_query)
        .sort({ date: -1 })
        .sort({ createdAt: -1 })
        .where("emotion")
        .gt(0);
    } else if (emotion === "good") {
      books = await Book.find(find_query)
        .sort({ date: -1 })
        .sort({ createdAt: -1 })
        .where("emotion")
        .lt(3);
    } else {
      books = await Book.find(find_query)
        .sort({ date: -1 })
        .sort({ createdAt: -1 })
        .where("emotion")
        .gte(3);
    }
  } else if(sort === "oldest"){
    if (emotion === "all") {
      books = await Book.find(find_query)
        .sort({ date: 1 })
        .sort({ createdAt: 1 })
        .where("emotion")
        .gt(0);
    } else if (emotion === "good") {
      books = await Book.find(find_query)
        .sort({ date: 1 })
        .sort({ createdAt: 1 })
        .where("emotion")
        .lt(3);
    } else {
      books = await Book.find(find_query)
        .sort({ date: 1 })
        .sort({ createdAt: 1 })
        .where("emotion")
        .gte(3);
    }
  }else{
    books = await Book.find()
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
