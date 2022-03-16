import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

const typeOrmConfig: TypeOrmModuleOptions = {
	type: "postgres",
	host: process.env.DB_HOST,
	port: parseInt(process.env.DB_PORT),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
	entities: [],
	synchronize: true,
};

@Module({
	imports: [TypeOrmModule.forRoot(typeOrmConfig)],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
