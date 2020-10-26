import reducer from './reducer.scene.index'
import { scenesActions as actions } from '../../../actions'
import { initialState } from './../../../models/sceneModel'

describe('Scene reducer', () => {

	it('should return the initial state for an unknown action', () => {
		expect(reducer(undefined, {})).toEqual(initialState)
	})

	it('should handle SET_FROM', () => {
		expect(
			reducer(initialState, {
				type: actions.SET_FROM,
				from: 'from'
			})
		).toEqual(
			Object.assign({}, initialState, {
				from: "from"
			})
		)
	})

	it('should handle SET_TO', () => {
		expect(
			reducer(initialState, {
				type: actions.SET_TO,
				to: 'to'
			})
		).toEqual(
			Object.assign({}, initialState, {
				to: "to"
			})
		)
	})

	it('should handle SET_LOCATION_ID', () => {
		expect(
			reducer(initialState, {
				type: actions.SET_LOCATION_ID,
				location_id: 'location_id'
			})
		).toEqual(
			Object.assign({}, initialState, {
				location_id: "location_id"
			})
		)
	})

	it('should handle SET_TITLE', () => {
		expect(
			reducer(initialState, {
				type: actions.SET_TITLE,
				title: 'title'
			})
		).toEqual(
			Object.assign({}, initialState, {
				title: "title"
			})
		)
	})

	it('should handle SET_SUBTITLE', () => {
		expect(
			reducer(initialState, {
				type: actions.SET_SUBTITLE,
				subtitle: 'subtitle'
			})
		).toEqual(
			Object.assign({}, initialState, {
				subtitle: "subtitle"
			})
		)
	})

	it('should handle SET_SUMMARY', () => {
		expect(
			reducer(initialState, {
				type: actions.SET_SUMMARY,
				summary: 'summary'
			})
		).toEqual(
			Object.assign({}, initialState, {
				summary: "summary"
			})
		)
	})

	it('should handle SET_TEXT', () => {
		expect(
			reducer(initialState, {
				type: actions.SET_TEXT,
				text: 'text'
			})
		).toEqual(
			Object.assign({}, initialState, {
				text: "text"
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
