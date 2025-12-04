import { resolve } from "node:path";
import { cwd } from "node:process";
import { DataSource } from "typeorm";
import { FollowEntity } from "./entities/follow.entity";
import { ProfileEntity } from "./entities/profile.entity";
import { UserEntity } from "./entities/user.entity";

if (process.env.NODE_ENV === "development") {
	process.loadEnvFile(resolve(cwd(), ".env"));
}

export const AppDataSource = new DataSource({
	type: "postgres",
	host: process.env.DATABASE_HOST || "localhost",
	port: parseInt(process.env.DATABASE_PORT || "5432", 10),
	username: process.env.DATABASE_USER || "postgres",
	password: process.env.DATABASE_PASSWORD || "postgres",
	database: process.env.DATABASE_NAME || "blog_db",
	synchronize: true,
	logging: true,
	entities: [UserEntity, ProfileEntity, FollowEntity],
	migrations: [],
	subscribers: [],
});
