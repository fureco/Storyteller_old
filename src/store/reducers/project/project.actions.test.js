import * as projectActions from './project.actions.index.js';

describe('Project actions', () => {

	it('should dispatch SET_COVER action', () => {
		expect(projectActions.setCover("cover")).toEqual({
			cover: 'cover',
			type: 'SET_COVER'
		});
	})

	it('should dispatch SET_TITLE action', () => {
		expect(projectActions.setTitle("title")).toEqual({
			title: 'title',
			type: 'SET_TITLE'
		});
	})

	it('should dispatch SET_AUTHOR action', () => {
		expect(projectActions.setAuthor("author")).toEqual({
			author: 'author',
			type: 'SET_AUTHOR'
		});
	})

	it('should dispatch SET_ABSTRACT action', () => {
		expect(projectActions.setAbstract("test")).toEqual({
			abstract: 'test',
			type: 'SET_ABSTRACT'
		});
	})

	it('should dispatch SET_DEDICATION action', () => {
		expect(projectActions.setDedication("dedication")).toEqual({
			dedication: 'dedication',
			type: 'SET_DEDICATION'
		});
	})

	it('should dispatch SET_SELECTED_CHAPTER action', () => {
		expect(projectActions.setSelectedChapter("test")).toEqual({
			chapter: 'test',
			type: 'SET_SELECTED_CHAPTER'
		});
	})

	it('should dispatch SET_STYLES action', () => {
		expect(projectActions.setStyles("test")).toEqual({
			styles: 'test',
			type: 'SET_STYLES'
		});
	})

	it('should dispatch SET_ROUTE action', () => {
		expect(projectActions.setRoute("test")).toEqual({
			route: 'test',
			type: 'SET_ROUTE'
		});
	})
});
