import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
const middlewares = [thunk] // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares)

import * as actions from './project.actions';

const fs = require('fs-extra');
const dir = process.cwd();
const path_to_workspaces = dir + "\\config\\test_workspaces\\project_actions_tests";

describe('Project actions', () => {

	it('should dispatch SET_COVER action', () => {
		expect(actions.setCover("cover")).toEqual({
			cover: 'cover',
			type: 'SET_COVER'
		});
	})

	it('should dispatch SET_TITLE action', () => {
		expect(actions.setTitle("title")).toEqual({
			title: 'title',
			type: 'SET_TITLE'
		});
	})

	it('should dispatch SET_AUTHOR action', () => {
		expect(actions.setAuthor("author")).toEqual({
			author: 'author',
			type: 'SET_AUTHOR'
		});
	})

	it('should dispatch SET_ABSTRACT action', () => {
		expect(actions.setAbstract("test")).toEqual({
			abstract: 'test',
			type: 'SET_ABSTRACT'
		});
	})

	it('should dispatch SET_DEDICATION action', () => {
		expect(actions.setDedication("dedication")).toEqual({
			dedication: 'dedication',
			type: 'SET_DEDICATION'
		});
	})

	it('should dispatch SET_SELECTED_CHAPTER action', () => {
		expect(actions.setSelectedChapter("test")).toEqual({
			chapter: 'test',
			type: 'SET_SELECTED_CHAPTER'
		});
	})

	it('should dispatch SET_STYLES action', () => {
		expect(actions.setStyles("test")).toEqual({
			styles: 'test',
			type: 'SET_STYLES'
		});
	})

	it('should dispatch SET_ROUTE action', () => {
		expect(actions.setRoute("test")).toEqual({
			route: 'test',
			type: 'SET_ROUTE'
		});
	})

	describe('on file system', () => {

		it('should create a new project', () => {

			const path_to_workspace = path_to_workspaces + "\\project_actions_should_create_a_new_project";

			clearWorkspace(path_to_workspace);

			const mockState = {}

			const store = mockStore({
				workspace: {
					path: path_to_workspace
				}
			})

			store.getState = () => mockState

			const path = path_to_workspace + "\\test_project";

			store.dispatch(actions.createProjectAction(path))

			var fileNameExists = false;

			fs.readdirSync(path + "\\src").forEach(fileName => {
				if (fileName == "project.json") fileNameExists = true;
			});

			expect(fileNameExists).toEqual(true)
		})
	})
});

const clearWorkspace = (path_to_workspace) => {
	fs.emptyDirSync(path_to_workspace)
}
