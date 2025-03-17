import { TodoController } from "../../controllers/todo.controller.js";
import { UserController } from "../../controllers/user.controller.js";

const { getTodo, getTodos, updateTodo, deleteTodo, createTodo } =
    TodoController;
const { createUser, signinUser, updateUser, deleteUser, getUserByToken } =
    UserController;

export const resolvers = {
    Query: {
        getTodos,
        getTodo,
        signinUser,
        getUserByToken,
    },
    Mutation: {
        createTodo,
        updateTodo,
        deleteTodo,
        createUser,
        updateUser,
        deleteUser,
    },
};
