import { gql } from "@apollo/client";

export const GET_TODOS = gql`
    query GetTodos {
        getTodos {
            id
            title
            description
            isCompleted
        }
    }
`;

export const GET_TODO = gql`
    query GetTodos($getTodoId: ID!) {
        getTodo(id: $getTodoId) {
            id
            title
            description
            isCompleted
        }
    }
`;

export const SIGNIN_USER = gql`
    query SigninUser($username: String!, $password: String!) {
        signinUser(username: $username, password: $password) {
            token
        }
    }
`;

export const GET_USER_BY_TOKEN = gql`
    query GetUserByToken($token: String!) {
        getUserByToken(token: $token) {
            id
            name
            username
            todos {
                id
                description
                title
                createdAt
            }
            createdAt
        }
    }
`;
