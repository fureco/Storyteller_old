import reducer from './reducer.characters.index'
import { charactersActions as actions } from '../../actions'
import { initialState as initialStateCharacter } from './../../models/characterModel'

const initialState = [];

describe('Characters reducer', () => {

	it('should return the initial state for an unknown action', () => {
		expect(reducer(undefined, {})).toEqual(initialState)
	})

	it('should handle ADD_CHARACTER', () => {
		expect(
			reducer(initialState, {
				type: actions.ADD_CHARACTER,
				character: initialStateCharacter
			})
		).toEqual(
			Object.assign([], initialState, [
				initialStateCharacter
			])
		)
	})

	it('should handle CREATE_CHARACTER', () => {
		expect(
			reducer(initialState, {
				type: actions.CREATE_CHARACTER,
				character: initialStateCharacter
			})
		).toEqual(
			Object.assign([], initialState, [
				initialStateCharacter
			])
		)
	})

	it('should handle SET_CHARACTERS', () => {
		expect(
			reducer(initialState, {
				type: actions.SET_CHARACTERS,
				characters: [{ "test": "test" }]
			})
		).toEqual(
			Object.assign([], initialState, [{ "test": "test" }])
		)
	})

	it('should handle SET_DELETED_AT', () => {

		const character = initialStateCharacter;

		const state = reducer(initialState, {
			type: actions.ADD_CHARACTER,
			character: character
		})

		const expected_result = Object.assign({}, character, { deleted_at: '01-01-1900 00:00:00' })

		expect(
			reducer(state, {
				type: actions.SET_DELETED_AT,
				character: state[0],
				deleted_at: '01-01-1900 00:00:00'
			})
		).toEqual(
			Object.assign([], initialState, [
				expected_result
			])
		)
	})

})
