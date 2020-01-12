import reducer from './reducer.character.index'
import { charactersActions as actions } from '../../actions'
import { initialState } from './../../models/characterModel'

describe('Character reducer', () => {

	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(
			{
				"deleted_at": null,
				"first_name": "",
				"last_name": "",
				"nickname": ""
			}
		)
	})

	it('should handle SET_FIRST_NAME', () => {
		expect(
			reducer(initialState, {
				type: actions.SET_FIRST_NAME,
				first_name: 'first_name'
			})
		).toEqual(
			Object.assign({}, initialState, {
				first_name: "first_name"
			})
		)
	})

	it('should handle SET_LAST_NAME', () => {
		expect(
			reducer(initialState, {
				type: actions.SET_LAST_NAME,
				last_name: 'last_name'
			})
		).toEqual(
			Object.assign({}, initialState, {
				last_name: "last_name"
			})
		)
	})

	it('should handle SET_NICKNAME', () => {
		expect(
			reducer(initialState, {
				type: actions.SET_NICKNAME,
				nickname: 'nickname'
			})
		).toEqual(
			Object.assign({}, initialState, {
				nickname: "nickname"
			})
		)
	})

	it('should handle SET_DELETED_AT', () => {
		expect(
			reducer(initialState, {
				type: actions.SET_DELETED_AT,
				deleted_at: 'deleted_at'
			})
		).toEqual(
			Object.assign({}, initialState, {
				deleted_at: "deleted_at"
			})
		)
	})

})
