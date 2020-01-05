export function getNewID(array_of_objects_in_state) {
	let max_id = array_of_objects_in_state.reduce(
		/* istanbul ignore next */
		(prev, current) => { return (prev.id > current.id) ? prev.id : current.id }, 0
	)
	return max_id + 1;
}
