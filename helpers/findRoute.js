// this is needed to find the route of the current page from middleware
// req.params is not available in middleware, so we need to find dynamic routes in a different way
import routes from '../router/router.js';

// function om de juiste route te vinden bij de url
const findRoute = async (reqUrl) => {
	reqUrl = reqUrl.split('?')[0];
	const urlPathSegments = reqUrl.split('/').slice(1).filter((segment) => segment);

	routeLoop:
	for (const [i, route] of routes.entries()) {
		const routeSegments = route.path.split('/').slice(1).filter((segment) => segment);
		// if the n of segments of the route does not match the n of segments of the url, this is not the right route
		if (urlPathSegments.length !== routeSegments.length) continue;

		// loop to check which part of the route is a parameter
		let paramNames = [];
		let paramValues = [];
		for (let i = 0; i < routeSegments.length; i++) {
			if (routeSegments[i].startsWith(':')) {
				paramNames.push(routeSegments[i].slice(1));
				paramValues.push(urlPathSegments[i]);
			} else if (routeSegments[i] !== urlPathSegments[i]) {
				// if the route does not match the url and no param has been found, this is not the right route
				continue routeLoop;
			}
		}

		// this is the one :0
		return { route: route, paramValues: paramValues, paramNames: paramNames };
	}
	// return error route if no route is found
	return { route: routes[routes.length - 1], paramValues: [], paramNames: [] };
}

export { findRoute };