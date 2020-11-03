import * as selectors from './project.selectors'

describe('Project selectors', () => {

	describe('getRoute()', () => {

		it('should return "" if no current route is set', () => {

			const state = {
				route: {
				}
			}

			expect(selectors.getRoute(state)).toEqual("")
		})

		it('should return the current route if it is set', () => {

			const state = {
				route: {
					current: "test",
					test: {
						current: "index"
					}
				}
			}

			expect(selectors.getRoute(state)).toEqual("/test/index")
		})

	})

})
