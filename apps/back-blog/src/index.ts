import "reflect-metadata";
import { App } from "./app";
import { AppDataSource } from "./db/db";

async function bootstrap(): Promise<void> {
	const app = new App();
	app.initModules([]);
	await AppDataSource.initialize();
	app.listen();
}

bootstrap().catch((error) => {
	console.error("Failed to start application:", error);
	process.exit(1);
});
