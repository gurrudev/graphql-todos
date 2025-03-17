import {
    createContext,
    useState,
    ReactNode,
    Dispatch,
    SetStateAction,
    useEffect,
} from "react";
import { useFetchUser } from "../hooks/useFetchUser";

interface UserContextType {
    user: UserType | null;
    setUser: Dispatch<SetStateAction<UserType | null>>;
    loading: boolean;
}

export interface UserType {
    __typename: string
    id: string;
    name: string;
    username: string;
    todos: {
        __typename: string
        id: string;
        title: string;
        description: string;
        createdAt: string;
    }[];
    createdAt: string;
}

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserType | null>(null);
    const token = sessionStorage.getItem("authToken")
    const { data, loading } = useFetchUser(token ? { token } : { token: '' });
    useEffect(() => {
        setUser(data?.getUserByToken);
    }, [data, token]);
    const contextValue = { user, setUser, loading };
    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};
