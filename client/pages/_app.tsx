import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { api } from "../apollo-client";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ApolloProvider client={api}>
			<Component {...pageProps} />
		</ApolloProvider>
	);
}

export default MyApp;
