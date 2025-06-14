// webapp/src/main.tsx

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// 1. Import Apollo Client libraries
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// 2. Create the Apollo Client instance
const client = new ApolloClient({
  // The URI of our Go GraphQL API.
  uri: import.meta.env.VITE_API_URL || "http://localhost:8080/query",
  // The cache is used to store results, making our app feel faster.
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
);
