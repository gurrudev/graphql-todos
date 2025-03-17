import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./index.css";
import App from "./App.tsx";
import { UserProvider } from "./context/UserContext.tsx";

const client = new ApolloClient({
    uri: import.meta.env.VITE_GRAPHQL_URI,
    cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ApolloProvider client={client}>
            <UserProvider>
                <App />
            </UserProvider>
        </ApolloProvider>
    </StrictMode>,
);
