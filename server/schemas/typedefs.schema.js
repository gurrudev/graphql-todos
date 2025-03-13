import { gql } from "apollo-server-express";

export const typeDefs = gql`
    type Todo {
        id: ID!
        title: String!
        description: String!
        isCompleted: Boolean!
        user: User!
        createdAt: String!
        updatedAt: String!
    }
    type User {
        id: ID!
        name: String!
        username: String!
        password: String!
        todos: [Todo]!
        createdAt: String!
        updatedAt: String!
    }
    # AuthResponse type will be used for sign-in to return both the user and token
    type AuthResponse {
        token: String!
    }
    type UserDeleteResponse{
        message: String!
    }
    type Query {
        # Signin query: Authenticate the user and return user info + token
        signinUser(username: String!, password: String!): AuthResponse!
        # Query to get user by JWT token (for protected routes)
        getUserByToken(token: String!): User
        # Queries to get todos
        getTodos: [Todo]
        getTodo(id: ID!): Todo
    }
    type Mutation {
        # Create, update, and delete users
        createUser(name: String!, username: String!, password: String!): User
        updateUser(
            id: ID!
            name: String
            username: String
            password: String
        ): User
        deleteUser(id: ID!): UserDeleteResponse!
        # Create, update, and delete todos
        createTodo(title: String!, description: String!, user: String!): Todo
        updateTodo(
            id: ID!
            title: String!
            description: String!
            isCompleted: Boolean!
        ): Todo
        deleteTodo(id: ID!): String
    }
`;
