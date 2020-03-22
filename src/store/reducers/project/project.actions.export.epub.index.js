const fs = require('fs-extra');

var path_to_project = "";
var dist_folder = "";
var dist_folder_fonts = "";
var dist_folder_cover = "";
var dist_folder_toc = "";

export const exportAsEpub = () => {

	console.log("exporting project...")

	return (dispatch, getState) => {

		path_to_project = getState().appStateReducer.path;
		dist_folder = path_to_project + "/dist";
		dist_folder_cover = dist_folder + '/cover';
		dist_folder_fonts = dist_folder + '/fonts';
		dist_folder_toc = dist_folder + '/meta-content/toc.ncx';

 		if (!fs.existsSync(dist_folder)) {
			// create destination folder if it does not yet exist
			fs.mkdirSync(dist_folder);
		}
		else {
			// clear destination folder if it does exist
			fs.emptyDirSync(dist_folder);
		}

		// copy cover
		if (!fs.existsSync(dist_folder_cover)) {
			// create destination folder if it does not yet exist
			fs.mkdirSync(dist_folder_cover);
		}

		fs.copySync("./src/templates/cover", dist_folder_cover);
		fs.copySync(path_to_project + "/src/assets/cover", dist_folder_cover);

		// copy fonts
		if (!fs.existsSync(dist_folder_fonts)) {
			// create destination folder if it does not yet exist
			fs.mkdirSync(dist_folder_fonts);
		}

		fs.copySync(path_to_project + "/src/assets/fonts", dist_folder_fonts);

		// copy styles
		fs.copySync("./src/templates/stylesheet.css", path_to_project + "/dist/styles/stylesheet.css");

		// copy script
		if (!fs.existsSync(dist_folder + "/script")) {
			// create destination folder if it does not yet exist
			fs.mkdirSync(dist_folder + "/script");
		}

		fs.copySync(path_to_project + "/src/script", dist_folder + "/script");

        fs.copySync("./src/templates/META-INF", dist_folder + "/META-INF");

		// meta-content = metadata.opf, mimetype, toc.ncx
        fs.copySync("./src/templates/meta-content", dist_folder + "/meta-content");

        prepareTOC(getState().project);

        prepareMetadataOPF(path_to_project + '/dist/meta-content/metadata.opf', getState().project);

        createEpub();
	}
};

function prepareTOC(project) {

	var data = fs.readFileSync(dist_folder_toc, 'utf8');

	data = data.replace(/@_TITLE_@/g, project.title);

	var navmap = "";

	navmap += "<navPoint id=\"cover\" playOrder=\"0\">\n";
	navmap += "\t\t<navLabel>\n";
	navmap += "\t\t\t<text>Cover</text>\n";
	navmap += "\t\t</navLabel>\n";
	navmap += "\t\t<content src=\"cover/cover.xhtml\" />\n";
	navmap += "\t</navPoint>\n";

	navmap += "<navPoint id=\"dedication\" playOrder=\"1\">\n";
	navmap += 	"\t\t<navLabel>\n";
	navmap += 		"\t\t\t<text>Danksagung</text>\n";
	navmap += 	"\t\t</navLabel>\n";
	navmap += 	"\t\t<content src=\"script/0_dedication-Dedication.xhtml\" />\n";
	navmap += "\t</navPoint>\n";

	data = data.replace(/@_NAVMAP_@/g, navmap);

	fs.writeFileSync(dist_folder_toc, data, 'utf8');
}

function prepareMetadataOPF(pathToMetadataOPF, project) {

	var data = fs.readFileSync(pathToMetadataOPF, 'utf8');

	data = data.replace(/@_TITLE_@/g, project.title);

	fs.writeFileSync(pathToMetadataOPF, data, 'utf8');
}

function createEpub() {

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

	var stylesheet = path_to_project + '/dist/styles/stylesheet.css';
	archive.append(fs.createReadStream(stylesheet), { name: 'styles/stylesheet.css' });

	fs.readdirSync(dist_folder_cover).forEach(file => {
		console.log(file);
		archive.append(fs.createReadStream(dist_folder_cover + "/" + file), { name: 'cover/' + file });
	});

    fs.readdirSync(dist_folder_fonts).forEach(file => {
        console.log(file);
        archive.append(fs.createReadStream(dist_folder_fonts + "/" + file), { name: 'fonts/' + file });
	});

	fs.readdirSync(path_to_project + '/dist/script/').forEach(file => {
		console.log(file);
		archive.append(fs.createReadStream(dist_folder + "/script/" + file), { name: 'script/' + file });
	});

	archive.finalize();

	console.log('done!');
}
