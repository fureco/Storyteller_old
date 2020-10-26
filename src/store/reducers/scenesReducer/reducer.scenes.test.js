import reducer from './reducer.scenes.index'
import { scenesActions as actions } from '../../actions'
import { initialState as initialStateScene } from './../../models/sceneModel'

const initialState = [];

describe('Scenes reducer', () => {

    it('should return the initial state for an unknown action', () => {
		expect(reducer(undefined, {})).toEqual(initialState)
	})

	it('should handle ADD_SCENE', () => {
		expect(
			reducer(initialState, {
				type: actions.ADD_SCENE,
				scene: initialStateScene
			})
		).toEqual(
			Object.assign([], initialState, [
				initialStateScene
			])
		)
	})

	it('should handle CREATE_SCENE', () => {
		expect(
			reducer(initialState, {
				type: actions.CREATE_SCENE,
				scene: initialStateScene
			})
		).toEqual(
			Object.assign([], initialState, [
				initialStateScene
			])
		)
	})

	it('should handle SET_DELETED_AT', () => {

		const scene = initialStateScene;

		const state = reducer(initialState, {
			type: actions.ADD_SCENE,
			scene: scene
		})

		const expected_result = Object.assign({}, scene, { deleted_at: '01-01-1900 00:00:00' })

		expect(
			reducer(state, {
				type: actions.SET_DELETED_AT,
				scene: state[0],
				deleted_at: '01-01-1900 00:00:00'
			})
		).toEqual(
			Object.assign([], initialState, [
				expected_result
			])
		)
	})

})
