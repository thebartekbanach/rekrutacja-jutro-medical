import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { Invitation } from "./invitations/invitation.entity";
import { InvitationsModule } from "./invitations/invitations.module";
import { PartyModule } from "./party/party.module";

const typeOrmConfig: TypeOrmModuleOptions = {
	type: "postgres",
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	entities: [Invitation],
	synchronize: true,
};

@Module({
	imports: [
		TypeOrmModule.forRoot(typeOrmConfig),
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: "schema.gql",
			playground: true,
		}),
		InvitationsModule,
		PartyModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
