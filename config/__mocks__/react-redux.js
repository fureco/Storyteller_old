const mockDispatch = () => { };

function mapEverything(mapStateToProps, mapDispatchToProps, mergeProps, state, ownProps) {

	const stateProps = mapStateToProps
		? mapStateToProps(state, ownProps)
		: {};

	const dispatchProps = mapDispatchToProps
		? mapDispatchToProps(mockDispatch, ownProps)
		: {
			dispatch: mockDispatch,
		};

	const mergedProps = mergeProps
		? mergeProps(stateProps, dispatchProps, ownProps)
		: {
			...stateProps,
			...dispatchProps,
			...ownProps,
		};

	return mergedProps;
}

module.exports = {

	Provider: ({ children }) => children,

	/**
	 * Returns a modified redux connector which adds a
	 * new method `getMappedProps` to the component for testing purposes.
	 */
	connect: (mapStateToProps, mapDispatchToProps, mergeProps) => (component) => {
		// Provide access to the mapped props from the component.
		// eslint-disable-next-line no-param-reassign
		component.getMappedProps = (state = {}, ownProps = {}) =>
			mapEverything(mapStateToProps, mapDispatchToProps, mergeProps, state, ownProps);

		return component;
	},

};
