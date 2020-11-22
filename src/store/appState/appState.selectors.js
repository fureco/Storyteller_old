import {
	Colors,
} from '@blueprintjs/core';

export function getBorderStyle(state) {

	if (!state) return "1px solid " + Colors.LIGHT_GRAY1;

	return "1px solid " + (state.theme == 'bp3-dark' ? Colors.DARK_GRAY1 : Colors.LIGHT_GRAY1)
}

export function getColor(state) {

	if (!state) return Colors.LIGHT_GRAY1;

	return state.theme == 'bp3-dark' ? Colors.DARK_GRAY5 : Colors.LIGHT_GRAY1;
}
