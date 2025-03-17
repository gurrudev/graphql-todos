import { useQuery } from "@apollo/client";
import { SIGNIN_USER } from "../graphql/queries";

interface useSignInProps {
    username: string;
    password: string;
}

export const useSignIn = ({ username, password }: useSignInProps) => {
    const { loading, error, data, refetch } = useQuery(SIGNIN_USER, {
        skip: true, // Initially don't execute the query
        variables: {
            username,
            password,
        },
    });
    return { loading, error, data, refetch };
};
