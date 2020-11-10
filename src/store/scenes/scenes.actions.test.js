import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
const middlewares = [thunk] // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares)

import * as actions from './scenes.actions';

jest.mock('fs');
jest.mock('electron-json-storage-sync');

describe('Project actions', () => {

	it('should dispatch ADD_SCENE action', () => {

		expect(actions.addScene('scene')).toEqual({
			scene: 'scene',
			type: 'ADD_SCENE'
		});
	})

	it('should dispatch CREATE_SCENE action', () => {

		expect(actions.createScene('scene')).toEqual({
			scene: 'scene',
			type: 'CREATE_SCENE'
		});
	})

	describe('deleteScene', () => {

		it('should dispatch SET_DELETED_AT action', () => {

			const mockState = {}

			const store = mockStore({
			})

			store.getState = () => mockState

			store.dispatch(actions.deleteScene("scene"))

			const executed_actions = store.getActions();

			expect(executed_actions[0].type).toEqual("SET_DELETED_AT")
			expect(executed_actions[0].scene).toEqual("scene")
			expect(executed_actions[0].deleted_at.toString().length).toEqual(64);
		})
	})

/* 	describe('save', () => {

		it('should dispatch save action', () => {

			const mockState = {}

			const store = mockStore({
				scenes: 'test'
			})

			store.getState = () => mockState

			require('electron-json-storage-sync').set('storyteller', { "status": true, "data": { "path": "" } });

			store.dispatch(actions.save())

			const executed_actions = store.getActions();

			expect(executed_actions).toEqual({})
		})
	}) */
})
