import cors from "cors";
import express, { type Express, type Router } from "express";
import morgan from "morgan";

type Route = {
	path: string;
	router: Router;
};

export class App {
	private app: Express;
	private basePath: string = "/api";

	constructor() {
		this.app = express();
		this.initMiddleware();
	}

	private initMiddleware(): void {
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
		this.app.use(cors({ origin: ["*"] }));
		this.app.use(morgan("dev"));
	}

	initModules(modules: Route[]): void {
		modules.map((module) =>
			this.app.use(this.basePath + module.path, module.router),
		);
	}

	listen(): void {
		this.app.listen(8080, () => {
			console.log("🚀 Server running on http://localhost:8080");
		});
	}
}
