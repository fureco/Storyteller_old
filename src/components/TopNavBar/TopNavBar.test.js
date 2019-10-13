import React from 'react';
import { shallow, mount, render } from 'enzyme';

import { TopNavBar } from './TopNavBar';
import { initialState as appState } from '../../store/reducers/appStateReducer'

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

    appState.path = "./../../../..config/test_project_path/";

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
