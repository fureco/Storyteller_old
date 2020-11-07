import {
	Colors,
} from '@blueprintjs/core';

export function getBorderStyle(state) {
	return "1px solid " + (state.theme == 'bp3-dark' ? Colors.DARK_GRAY1 : Colors.LIGHT_GRAY1)
}
