export function getRoute(state) {
	return getSubRoute(state.route);
}

function getSubRoute(current_route_object) {

	var route_string = "";

	if (current_route_object.current) {

		route_string += "/" + current_route_object.current;

		if (current_route_object.current != 'index') {
			if (current_route_object[current_route_object.current]) {
				route_string += getSubRoute(current_route_object[current_route_object.current]);
			}
		}
		else {
			route_string += "/index"
		}
	}

	return route_string;
}