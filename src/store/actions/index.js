// import actions from other files (modules)
import * as appStateActions from './appState/actions.appState.index.js'
import * as chapterActions from './../reducers/chapters/chapter.actions.index.js'
import * as charactersActions from './characters/actions.characters.index.js'
import * as partsActions from './parts/actions.parts.index.js'
import * as projectActions from './../reducers/project/project.actions.index'
import * as scenesActions from './scenes/actions.scenes.index.js'

// export all actions as modules
export {
	appStateActions,
	chapterActions,
	charactersActions,
	partsActions,
	projectActions,
	scenesActions
}
