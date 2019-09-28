import React from 'react';
import { TopNavBar } from '.';
import { shallow, mount, render } from 'enzyme';

// import configureStore from 'redux-mock-store';

// const mockStore = configureStore();

// let store;

// const initialState = {
// };

const project = {
    path: 'D:\\Dropbox\\Melle\\Writing\\Manuskripte\\Storyteller_Test',
    appState: {
        selectedMainArea: 'script'
    }
};

test('TopNavBar - renders', () => {

    // store = mockStore(initialState) //creates the store with any initial state or middleware needed

    const topNavBar = shallow(
        <TopNavBar project={project}/>
    );

    expect(topNavBar.text()).toEqual("<Blueprint3.Navbar />");
    expect(topNavBar.dive().text()).toEqual("<Blueprint3.NavbarGroup /><Blueprint3.NavbarGroup />");
});