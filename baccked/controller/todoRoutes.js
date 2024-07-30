const Todo = require("../models/Todo")

exports.createTodo = async (req, res) => {
  const { name, email, description } = req.body;
  try {
    const newTodo = new Todo({
      name,
      email,
      description,
    });
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTodoById = async (req, res) => {
  const { id } = req.params;
  const { name, email, description } = req.body;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { name, email, description },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTodoById = async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json(deletedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
