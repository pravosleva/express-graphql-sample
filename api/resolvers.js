// const todos = require('./_fake-todos-data');
const Todo = require('./model');

module.exports = {
  // Note: Каждая из функций должна вернуть тип в соотв. со схемой
  // todo: ({ id }) => todos.find(t => t.id == id),
  todo: ({ id }) => Todo.findById(id),
  todos: () => Todo.find(),
  completedTodos: () => Todo.find({ completed: true }),
  // todosByStatus: ({ status }) => {
  //   switch (status) {
  //     case 'COMPLETED':
  //       return todos.filter(t => t.completed);
  //     case 'UNCOMPLETED':
  //       return todos.filter(t => !t.completed);
  //     default:
  //       return todos;
  //   },
  // },
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
