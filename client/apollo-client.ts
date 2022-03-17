import { ApolloClient, InMemoryCache } from "@apollo/client";

export const api = new ApolloClient({
	uri: "/api/graphql",
	cache: new InMemoryCache(),
});
