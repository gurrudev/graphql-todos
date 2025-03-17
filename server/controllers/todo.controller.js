import { Todo } from "../models/todo.model.js";
import { User } from "../models/user.model.js";

export class TodoController {
    static getTodos = async () => {
        try {
            const todos = await Todo.find().populate("user", "name").exec();
            return todos;
        } catch (error) {
            console.log(error);
            throw new Error("Internal server error");
        }
    };
    static getTodo = async (_, { id }) => {
        try {
            const todo = await Todo.findById(id);
            if (!todo) throw new Error("Todo not found");
            return todo;
        } catch (error) {
            throw new Error("Internal server error");
        }
    };
    static createTodo = async (_, { title, description, user }) => {
        try {
            const existingUser = await User.findById(user);
            if (!existingUser) {
                throw new Error("User not found");
            }
            const newTodo = new Todo({
                title,
                description,
                user,
            });
            await newTodo.save();
            existingUser.todos.push(newTodo._id);
            await existingUser.save();
            return newTodo;
        } catch (error) {
            console.log(error);
            throw new Error("Internal server error");
        }
    };
    static updateTodo = async (_, { id, title, description, isCompleted }) => {
        try {
            const todo = await Todo.findByIdAndUpdate(
                id,
                { title, description, isCompleted },
                { new: true },
            );
            if (!todo) throw new Error("Todo not found");
            return todo;
        } catch (error) {
            throw new Error("Internal server error");
        }
    };
    static deleteTodo = async (_, { id }) => {
        try {
            const todo = await Todo.findByIdAndDelete(id);
            if (!todo) throw new Error("Todo not found");
            return "Todo deleted";
        } catch (error) {
            throw new Error("Internal server error");
        }
    };
    static getTodosByUserId = async (userId) => {
        try {
            const todos = await Todo.find({ user: userId });
            return todos;
        } catch (error) {
            throw new Error("Internal server error");
        }
    };
}
