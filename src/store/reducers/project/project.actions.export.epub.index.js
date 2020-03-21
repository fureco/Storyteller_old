const fs = require('fs-extra')

export const exportAsEpub = () => {

	console.log("exporting project...")

	return (dispatch, getState) => {

		const path = require('path');

		var path_to_project = getState().appStateReducer.path;
		var dist_folder = path_to_project + "/dist";

		if (!fs.existsSync(dist_folder)) {
			// create destination folder if it does not yet exist
			fs.mkdirSync(dist_folder);
		}
		else {
			// clear destination folder if it does exist
			fs.emptyDir(dist_folder, err => {

				if (err) return console.error(err)

				// copy fonts
				/* fs.copy(path_to_project + "/src/assets/fonts", path_to_project + "/dist/fonts/", (err) => {
					if (err) {
						return console.error(err);
					}
					console.log('done!');
				}); */

				// copy styles
				/* fs.copy(path_to_project + "/src/assets/styles", path_to_project + "/dist/styles/", (err) => {
					if (err) {
						return console.error(err);
					}
					console.log('done!');
				}); */

				fs.copy(path_to_project + "/src/script", dist_folder + "/script")
					.then(() => {
						fs.copy("./src/assets/META-INF", dist_folder + "/META-INF")
							.then(() => {
								fs.copy("./src/assets/meta-content", dist_folder + "/meta-content")
									.then(() => createArchive(path_to_project))
									.catch(err => console.error(err))
							})
							.catch(err => console.error(err))
					})
					.catch(err => console.error(err))
			})
		}
	};
};

function createArchive(path_to_project) {

	var archiver = require('archiver');

	if (!fs.existsSync(path_to_project + "/epub")) {
		fs.mkdirSync(path_to_project + "/epub");
	}

	// create a file to stream archive data to.
	var output = fs.createWriteStream(path_to_project + "/epub/example.epub");
	var archive = archiver('zip');

	// listen for all archive data to be written
	// 'close' event is fired only when a file descriptor is involved
	output.on('close', function () {
		console.log(archive.pointer() + ' total bytes');
		console.log('archiver has been finalized and the output file descriptor has closed.');
	});

	// This event is fired when the data source is drained no matter what was the data source.
	// It is not part of this library but rather from the NodeJS Stream API.
	// @see: https://nodejs.org/api/stream.html#stream_event_end
	output.on('end', function () {
		console.log('Data has been drained');
	});

	// good practice to catch warnings (ie stat failures and other non-blocking errors)
	archive.on('warning', function (err) {
		if (err.code === 'ENOENT') {
			// log warning
		} else {
			// throw error
			throw err;
		}
	});

	// good practice to catch this error explicitly
	archive.on('error', function (err) {
		throw err;
	});

	// pipe archive data to the file
	archive.pipe(output);

	var mimetype = path_to_project + '/dist/meta-content/mimetype';
	archive.append(fs.createReadStream(mimetype), { name: 'mimetype', store: true });

	var metadata = path_to_project + '/dist/meta-content/metadata.opf';
	archive.append(fs.createReadStream(metadata), { name: 'metadata.opf' });

	// toc = table of content
	var toc = path_to_project + '/dist/meta-content/toc.ncx';
	archive.append(fs.createReadStream(toc), { name: 'toc.ncx' });

	var container_xml = path_to_project + '/dist/META-INF/container.xml';
	archive.append(fs.createReadStream(container_xml), { name: 'META-INF/container.xml' });

	archive.directory(path_to_project + 'script/', false); // false = put at the root of the archive

	archive.finalize();

	console.log('done!');
}
