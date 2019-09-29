import React from 'react';
import { ScriptPartCreationDialog } from '.';
import { shallow, mount, render } from 'enzyme';

import { projectActions } from "../../../../actions";

import configureStore from 'redux-mock-store';

const mockStore = configureStore();

const initialState = {
};

let store = mockStore(initialState) //creates the store with any initial state or middleware needed

const project = {
    path: 'D:\\Dropbox\\Melle\\Writing\\Manuskripte\\Storyteller_Test',
    appState: {
        selectedMainArea: 'script'
    }
};

test('ScriptPartCreationDialog - open edit mode', () => {

    const scriptPartCreationDialog = shallow(
        <ScriptPartCreationDialog isInEditMode={false} />
    );

    const openScriptPartEditModeButton = scriptPartCreationDialog.find('#OpenScriptPartEditModeButton');
    expect(openScriptPartEditModeButton.length).toEqual(1);
    openScriptPartEditModeButton.simulate('click');
    expect(scriptPartCreationDialog.text()).toEqual('<Blueprint3.InputGroup />');
});

test('ScriptPartCreationDialog - close edit mode', () => {

    const scriptPartCreationDialog = shallow(
        <ScriptPartCreationDialog isInEditMode={true} />
    );

    // find input group
    const scriptPartCreationInputGroup = scriptPartCreationDialog.find('#ScriptPartCreationInputGroup')
    expect(scriptPartCreationInputGroup.length).toEqual(1);

    // find close button
    const closeScriptPartEditModeButton = scriptPartCreationInputGroup.dive().find('#CloseScriptPartEditModeButton');
    expect(closeScriptPartEditModeButton.length).toEqual(1);

    // close edit mode
    closeScriptPartEditModeButton.simulate('click');
    const openScriptPartEditModeButton = scriptPartCreationDialog.find('#OpenScriptPartEditModeButton');
    expect(openScriptPartEditModeButton.length).toEqual(1);
});

test('ScriptPartCreationDialog - create new script part', () => {

    const scriptPartCreationDialog = shallow(
        <ScriptPartCreationDialog
            store={store}
            addScriptPart={projectActions.addScriptPartAction}
            saveProject={projectActions.save}
            isInEditMode={true} />
    );

    // find input group
    const scriptPartCreationInputGroup = scriptPartCreationDialog.find('#ScriptPartCreationInputGroup')
    expect(scriptPartCreationInputGroup.length).toEqual(1);

    // put in name of new script part
    const event = { target: { value: 'test' } }
    scriptPartCreationInputGroup.simulate('change', event);
    expect(scriptPartCreationDialog.state().partName).toEqual('test');

    // find save button
    const scriptPartCreationSaveButton = scriptPartCreationInputGroup.dive().find('#ScriptPartCreationSaveButton');
    expect(scriptPartCreationSaveButton.length).toEqual(1);

    // save
    scriptPartCreationSaveButton.simulate('click');
});