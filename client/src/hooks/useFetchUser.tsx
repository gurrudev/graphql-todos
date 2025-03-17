import { useQuery } from "@apollo/client";
import { GET_USER_BY_TOKEN } from "../graphql/queries";

export const useFetchUser = ({token}: {token: string}) => {
    const { loading, data, error, refetch } = useQuery(GET_USER_BY_TOKEN, {
        variables: {
            token
        },
    });
    return { loading, data, error, refetch };
};