const express = require("express");
const router = new express.Router();
const userController = require("../controller/authController");
const todoController = require("../controller/todoRoutes")

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
// router.get("/validuser", userController.validUser);
// router.get("/validuser", authenticate, userController.validUser);
// router.delete("/:id", authenticate, inputController.deleteInput); aa krvanu cheeeee

router.post('/', todoController.createTodo);
router.get('/', todoController.getAllTodos);
router.put('/:id', todoController.updateTodoById);
router.delete('/:id', todoController.deleteTodoById);

module.exports = router;

// http://localhost:7000/



