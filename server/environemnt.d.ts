// https://stackoverflow.com/questions/45194598/using-process-env-in-typescript

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: "development" | "production";

			// TypeORM database configuration
			DB_HOST: string;
			DB_PORT: string;
			DB_USERNAME: string;
			DB_PASSWORD: string;
			DB_DATABASE: string;
		}
	}
}

export {};
