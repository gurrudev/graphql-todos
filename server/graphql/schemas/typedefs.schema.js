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
    type AuthResponse {
        token: String!
    }
    type UserDeleteResponse {
        message: String!
    }
    type Query {
        signinUser(username: String!, password: String!): AuthResponse!
        getUserByToken(token: String!): User
        getTodos: [Todo]
        getTodo(id: ID!): Todo
    }
    type Mutation {
        createUser(name: String!, username: String!, password: String!): User
        updateUser(
            id: ID!
            name: String
            username: String
            password: String
        ): User
        deleteUser(id: ID!): UserDeleteResponse!
        createTodo(title: String!, description: String!, user: String!): Todo
        updateTodo(
            id: ID!
            title: String
            description: String
            isCompleted: Boolean
        ): Todo
        deleteTodo(id: ID!): String
    }
`;
