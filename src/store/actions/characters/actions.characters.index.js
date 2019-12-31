// ############ ACTION TYPES ##############
export const ADD_CHARACTER = 'ADD_CHARACTER';

// ############## ACTIONS #################
export const createCharacter = (character) => ({ type: ADD_CHARACTER, character });
