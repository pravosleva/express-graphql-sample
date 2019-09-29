// const todos = require('./_fake-todos-data');
const Todo = require('./model');

module.exports = {
  // Note: Каждая из функций должна вернуть тип в соотв. со схемой
  todo: ({ id }) => Todo.findById(id),
  todos: () => Todo.find(),
  completedTodos: () => Todo.find({ completed: true }),
  todosByStatus: ({ status }) => Todo.find({ status }),
  createTodo: ({ input }) => Todo.create(input),
  updateTodo: ({ id, input }) => {
    return Todo.findByIdAndUpdate(id, input, {
      new: true, // Верни мне обновленный объект
    });
  },
  deleteTodo: ({ id }) => {
    return Todo.deleteOne({ _id: id })
      .then(() => id);
  },
};
