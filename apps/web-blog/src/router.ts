type RouteHandler = (params?: Record<string, string>) => void;

interface Route {
	path: string;
	handler: RouteHandler;
	regex?: RegExp;
	paramNames?: string[];
}

export class Router {
	private routes: Route[] = [];
	private notFoundHandler?: RouteHandler;

	constructor() {
		window.addEventListener("popstate", () => this.handleRoute());

		document.addEventListener("click", (e) => {
			const target = e.target as HTMLElement;
			const link = target.closest("a[data-link]");

			if (link) {
				e.preventDefault();
				const href = link.getAttribute("href");
				if (href) this.navigate(href);
			}
		});
	}

	private handleRoute(): void {
		const pathname = window.location.pathname;

		for (const route of this.routes) {
			if (route.regex) {
				const params = this.extractParams(route, pathname);
				if (params) {
					route.handler(params);
					return;
				}
			} else if (route.path === pathname) {
				route.handler();
				return;
			}
		}

		if (this.notFoundHandler) {
			this.notFoundHandler();
		}
	}

	private pathToRegex(path: string): { regex: RegExp; paramNames: string[] } {
		const paramNames: string[] = [];

		const regexPattern = path
			.replace(/\//g, "\\/")
			.replace(/:(\w+)/g, (_, paramName) => {
				paramNames.push(paramName);
				return "([^\\/]+)";
			});

		return {
			regex: new RegExp(`^${regexPattern}$`),
			paramNames,
		};
	}

	private extractParams(
		route: Route,
		pathname: string,
	): Record<string, string> | null {
		if (!route.regex || !route.paramNames) return null;

		const match = pathname.match(route.regex);
		if (!match) return null;

		const params: Record<string, string> = {};
		route.paramNames.forEach((name, index) => {
			params[name] = match[index + 1];
		});

		return params;
	}

	addRoute(path: string, handler: RouteHandler): Router {
		const route: Route = {
			path,
			handler,
			...this.pathToRegex(path),
		};

		this.routes.push(route);
		return this;
	}

	setNotFound(handler: RouteHandler): Router {
		this.notFoundHandler = handler;
		return this;
	}

	navigate(path: string): void {
		history.pushState(null, "", path);
		this.handleRoute();
	}

	replace(path: string): void {
		history.replaceState(null, "", path);
		this.handleRoute();
	}

	init(): void {
		this.handleRoute();
	}

	getQueryParams(): URLSearchParams {
		return new URLSearchParams(window.location.search);
	}

	back(): void {
		history.back();
	}

	forward(): void {
		history.forward();
	}
}

const router = new Router();

export default router;
