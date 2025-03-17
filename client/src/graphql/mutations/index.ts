import { gql } from "@apollo/client";

export const CREATE_USER = gql`
    mutation CreateUser(
        $name: String!
        $username: String!
        $password: String!
    ) {
        createUser(name: $name, username: $username, password: $password) {
            id
        }
    }
`;

export const UPDATE_USER = gql`
    mutation UpdateUser($updateUserId: ID!) {
        updateUser(id: $updateUserId) {
            id
        }
    }
`;

export const DELETE_USER = gql`
    mutation DeleteUser($deleteUserId: ID!) {
        deleteUser(id: $deleteUserId) {
            message
        }
    }
`;

export const CREATE_TODO = gql`
    mutation CreateTodo(
        $title: String!
        $description: String!
        $user: String!
    ) {
        createTodo(title: $title, description: $description, user: $user) {
            id
            title
            description
            isCompleted
        }
    }
`;

export const UPDATE_TODO = gql`
    mutation UpdateTodo($updateTodoId: ID!) {
        updateTodo(id: $updateTodoId) {
            id
        }
    }
`;

export const DELETE_TODO = gql`
    mutation DeleteTodo($deleteTodoId: ID!) {
        deleteTodo(id: $deleteTodoId)
    }
`;
