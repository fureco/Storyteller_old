import reducer from '.'
import { projectActions } from './../../actions'

import { initialState } from '.'

describe('Project reducer', () => {
    
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            abstract: "",
            chapters: [],
            parts: [],
            title: ""
        })
    })

    it('should handle ADD_PART', () => {
        expect(
            reducer(initialState, {
                type: projectActions.ADD_PART,
                partName: 'test'
            })
        ).toEqual({
            abstract: "",
            chapters: [],
            parts: [{ "id": 1, "name": "test", "position": 1 }],
            title: ""
        })
    })
})