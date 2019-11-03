import { appStateActions } from './../';

import { initialState as initialPartState } from './../../models/partModel';


// ############ ACTION TYPES ##############
export const SET_TITLE = 'SET_TITLE';
export const SET_ABSTRACT = 'SET_ABSTRACT';

// ############## ACTIONS #################
export const setTitle = (title) => ({ type: SET_TITLE, title });
export const setAbstract = (abstract) => ({ type: SET_ABSTRACT, abstract });
