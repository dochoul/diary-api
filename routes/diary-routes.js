const express = require("express");
const router = express.Router();
const booksController = require("../controllers/diary-controller");

router.get("/", booksController.getAllBooks);
router.get("/good-emotion", booksController.getGoodEmotion);
router.get("/:id", booksController.getById);
router.post("/", booksController.addBook);
router.put("/:id", booksController.updateBook);
router.delete("/:id", booksController.deleteBook);

module.exports = router;
