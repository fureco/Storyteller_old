import * as selectors from './appState.selectors'

describe('AppState selectors', () => {

	describe('getBorderStyle()', () => {

		it('should return "1px solid #182026" if theme is set to "bp3-dark"', () => {

			const state = {
				theme: 'bp3-dark'
			}

			expect(selectors.getBorderStyle(state)).toEqual("1px solid #182026")
		})

		it('should return "1px solid #CED9E0" if theme is set to "bp3-body"', () => {

			const state = {
				theme: 'bp3-body'
			}

			expect(selectors.getBorderStyle(state)).toEqual("1px solid #CED9E0")
		})

	})

})
