import { ApolloClient, InMemoryCache } from "@apollo/client";

export const api = new ApolloClient({
	uri: "http://localhost/api/graphql",
	cache: new InMemoryCache(),
});
