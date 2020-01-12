import * as actions from './actions.parts.index.js';

describe('Parts actions', () => {

	it('should dispatch ADD_PART action', () => {

		var test_part = {
			position: 1,
			name: "test"
		};

		expect(actions.addPart(test_part)).toEqual({
			part: {
				position: 1,
				name: "test"
			},
			type: 'ADD_PART'
		});
	})
});
