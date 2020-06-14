export const initialState = {
	cover: "",
	title: "",
	author: "",
	abstract: "",
	dedication: "",
	route: {
		current: "script",
		script: {
			current: "structure",
			structure: {
				current: "cover"
			}
		},
		characters: {

		},
		locations: {

		},
		timeline: {

		}
	},
	styles: {
		default: {
			fontSize: "1em",
		},
		title: {
			fontSize: "4em",
		},
		dedication: {
			textAlign: "center"
		}
	}
};
