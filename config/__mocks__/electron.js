export const require = jest.fn();
export const match = jest.fn();
export const app = {
	getPath: jest.fn(function () {
		return "./";
	}),
};
export const remote = jest.fn();
export const shell = jest.fn();
export const dialog = jest.fn();
