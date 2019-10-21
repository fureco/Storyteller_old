import React from 'react';
import { shallow, mount, render } from 'enzyme';

import { TopNavBar } from './TopNavBar';
import { initialState as appState } from './../../store/models/appStateModel'

test('TopNavBar - does not render tabs, when no path it set', () => {

    const topNavBar = shallow(
        <TopNavBar appState={appState}/>
    );

    const topNavBarContainer = topNavBar.dive().find('#TopNavBarContainer');
    expect(topNavBarContainer.length).toEqual(1);
    expect(topNavBarContainer.text()).toEqual("<Blueprint3.NavbarGroup /><Blueprint3.NavbarGroup />");

	const TopNavTabs = topNavBarContainer.find('#TopNavTabs');
	expect(TopNavTabs.length).toEqual(0);
});

test('TopNavBar - does render tabs when path is set', () => {

    appState.path = "./../../../test_projects/test_project_path/";

    const topNavBar = shallow(
        <TopNavBar appState={appState} />
    );

    const topNavBarContainer = topNavBar.dive().find('#TopNavBarContainer');
    expect(topNavBarContainer.length).toEqual(1);
    expect(topNavBarContainer.text()).toEqual("<Blueprint3.NavbarGroup /><Blueprint3.NavbarGroup />");

	const TopNavTabs = topNavBarContainer.find('#TopNavTabs');
	expect(TopNavTabs.length).toEqual(1);

	expect(TopNavTabs.dive().text()).toEqual("<Blueprint3.TabTitle /><Blueprint3.TabTitle /><Blueprint3.TabTitle /><Blueprint3.TabTitle />");
});
