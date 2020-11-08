// __mocks__/sync_storage.js
'use strict';

const sync_storage = jest.genMockFromModule('electron-json-storage-sync');

var mock_storage = {}

function get(key) {
	return mock_storage[key] || [];
}

sync_storage.get = get;

function set(key, value) {
	mock_storage[key] = value;
}

sync_storage.set = set;

module.exports = sync_storage;
