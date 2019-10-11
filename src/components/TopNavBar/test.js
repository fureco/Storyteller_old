import React from 'react';
import { TopNavBar } from '.';
import { shallow, mount, render } from 'enzyme';

import { initialState as appState } from './../../reducers/appStateReducer'

test('TopNavBar - does not render tabs, when no path it set', () => {

    const topNavBar = shallow(
        <TopNavBar appState={appState}/>
    );

    const topNavBarContainer = topNavBar.dive().find('#TopNavBarContainer');
    expect(topNavBarContainer.length).toEqual(1);
    expect(topNavBarContainer.text()).toEqual("<Blueprint3.NavbarGroup /><Blueprint3.NavbarGroup />");

    const topNavBarGroupLeft = topNavBarContainer.find('#TopNavBarGroupLeft');
    expect(topNavBarGroupLeft.length).toEqual(1);
    expect(topNavBarGroupLeft.dive().text()).toEqual("<Blueprint3.Tooltip /><Blueprint3.Tooltip /><Blueprint3.Tooltip /><Blueprint3.Tooltip /><Blueprint3.NavbarDivider />");
});

test('TopNavBar - does render tabs when path is set', () => {

    appState.path = "D:\\Dropbox\\Melle\\Writing\\Manuskripte\\Storyteller_Test";

    const topNavBar = shallow(
        <TopNavBar appState={appState} />
    );

    const topNavBarContainer = topNavBar.dive().find('#TopNavBarContainer');
    expect(topNavBarContainer.length).toEqual(1);
    expect(topNavBarContainer.text()).toEqual("<Blueprint3.NavbarGroup /><Blueprint3.NavbarGroup />");

    const topNavBarGroupLeft = topNavBarContainer.find('#TopNavBarGroupLeft');
    expect(topNavBarGroupLeft.length).toEqual(1);
    expect(topNavBarGroupLeft.dive().text()).toEqual("<Blueprint3.Tooltip /><Blueprint3.Tooltip /><Blueprint3.Tooltip /><Blueprint3.Tooltip /><Blueprint3.NavbarDivider /><Blueprint3.Tabs />");
});