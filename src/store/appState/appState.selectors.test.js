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

	describe('getColor()', () => {

		it('should return "#394B59" if theme is set to "bp3-dark"', () => {

			const state = {
				theme: 'bp3-dark'
			}

			expect(selectors.getColor(state)).toEqual("#394B59")
		})

		it('should return "#CED9E0" if theme is set to "bp3-body"', () => {

			const state = {
				theme: 'bp3-body'
			}

			expect(selectors.getColor(state)).toEqual("#CED9E0")
		})

	})

})
