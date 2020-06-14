const fs = require('fs-extra');

var path_to_project = "";
var dist_folder = "";
var dist_folder_toc = "";
var dist_folder_fonts = "";
var dist_folder_styles = "";
var dist_folder_cover = "";
var dist_folder_script = "";

const navPoints = [
	{
		id: "cover",
		playOrder: "0",
		label: "Cover",
		src: "cover/cover.xhtml"
	},
	{
		id: "title",
		playOrder: "1",
		label: "Titel",
		src: "script/title.xhtml"
	},
	{
		id: "dedication",
		playOrder: "2",
		label: "Danksagung",
		src: "script/dedication.xhtml"
	},
];

export const exportAsEpub = () => {

	console.log("exporting project...")

	return (dispatch, getState) => {

		path_to_project = getState().appStateReducer.path;
		dist_folder = path_to_project + "/dist";
		dist_folder_toc = dist_folder + "/meta-content/toc.ncx";
		dist_folder_cover = dist_folder + "/cover";
		dist_folder_fonts = dist_folder + "/fonts";
		dist_folder_styles = dist_folder + "/styles";
		dist_folder_script = dist_folder + "/script";

 		if (!fs.existsSync(dist_folder)) {
			// create destination folder if it does not yet exist
			fs.mkdirSync(dist_folder);
		}
		else {
			// clear destination folder if it does exist
			fs.emptyDirSync(dist_folder);
		}

		// copy fonts
		if (!fs.existsSync(dist_folder_fonts)) {
			// create destination folder if it does not yet exist
			fs.mkdirSync(dist_folder_fonts);
		}

		fs.copySync(path_to_project + "/src/assets/fonts", dist_folder_fonts);

		// copy styles
		if (!fs.existsSync(dist_folder_styles)) {
			// create destination folder if it does not yet exist
			fs.mkdirSync(dist_folder_styles);
		}

		fs.copySync("./src/templates/styles/stylesheet.template", dist_folder_styles + "/stylesheet.css");
		prepareStyles(getState().project);

		// copy META-INF
        fs.copySync("./src/templates/META-INF", dist_folder + "/META-INF");

		// meta-content = metadata.opf, mimetype, toc.ncx
        fs.copySync("./src/templates/meta-content", dist_folder + "/meta-content");
        prepareTOC(getState().project);
		prepareMetadataOPF(path_to_project + '/dist/meta-content/metadata.opf', getState().project);

		// copy cover
		if (!fs.existsSync(dist_folder_cover)) {
			// create destination folder if it does not yet exist
			fs.mkdirSync(dist_folder_cover);
		}

		fs.copySync("./src/templates/cover", dist_folder_cover);
		fs.copySync(path_to_project + "/src/assets/cover", dist_folder_cover);

		// copy title page, dedication and script
		if (!fs.existsSync(dist_folder + "/script")) {
			// create destination folder if it does not yet exist
			fs.mkdirSync(dist_folder + "/script");
		}

		fs.copySync("./src/templates/script/title.xhtml", dist_folder + "/script/title.xhtml");
		prepareTitlePage(getState().project);

		fs.copySync("./src/templates/script/dedication.xhtml", dist_folder + "/script/dedication.xhtml");
		prepareDedication(getState().project);

		fs.copySync(path_to_project + "/src/script", dist_folder + "/script");

        createEpub();
	}
};

function prepareTOC(project) {

	var data = fs.readFileSync(dist_folder_toc, 'utf8');

	data = data.replace(/@_TITLE_@/g, project.title);

	var navmap = "";

	navPoints.forEach(navPoint => {
		navmap += "<navPoint id=\"" + navPoint.id + "\" playOrder=\"" + navPoint.playOrder + "\">\n";
		navmap += "\t\t<navLabel>\n";
		navmap += "\t\t\t<text>" + navPoint.label + "</text>\n";
		navmap += "\t\t</navLabel>\n";
		navmap += "\t\t<content src=\"" + navPoint.src + "\" />\n";
		navmap += "\t</navPoint>\n";
	});

	data = data.replace(/@_NAVMAP_@/g, navmap);

	fs.writeFileSync(dist_folder_toc, data, 'utf8');
}

function prepareMetadataOPF(pathToMetadataOPF, project) {

	var data = fs.readFileSync(pathToMetadataOPF, 'utf8');

	data = data.replace(/@_TITLE_@/g, project.title);
	data = data.replace(/@_AUTHOR_@/g, project.author);

	var spine = "";

	navPoints.forEach(navPoint => {
		spine += "<itemref idref=\"" + navPoint.id + "\" />\n";
	});

	data = data.replace(/@_SPINE_@/g, spine);

	fs.writeFileSync(pathToMetadataOPF, data, 'utf8');
}

function prepareStyles(project) {

	var data = fs.readFileSync(dist_folder_styles + "/stylesheet.css", 'utf8');

	data = data.replace(/@_TITLE_FONT_SIZE_@/g, project.styles.title.fontSize);
	data = data.replace(/@_DEDICATION_TEXT_ALIGN_@/g, project.styles.dedication.textAlign);

	fs.writeFileSync(dist_folder_styles + "/stylesheet.css", data, 'utf8');
}

function prepareTitlePage(project) {

	var data = fs.readFileSync(dist_folder_script + "/title.xhtml", 'utf8');

	data = data.replace(/@_TITLE_@/g, project.title);
	data = data.replace(/@_AUTHOR_@/g, project.author);

	fs.writeFileSync(dist_folder_script + "/title.xhtml", data, 'utf8');
}

function prepareDedication(project) {

	var data = fs.readFileSync(dist_folder_script + "/dedication.xhtml", 'utf8');

	data = data.replace(/@_TITLE_@/g, project.title);
	data = data.replace(/@_DEDICATION_@/g, project.dedication);

	fs.writeFileSync(dist_folder_script + "/dedication.xhtml", data, 'utf8');
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

    fs.readdirSync(dist_folder_fonts).forEach(file => {
        console.log(file);
        archive.append(fs.createReadStream(dist_folder_fonts + "/" + file), { name: 'fonts/' + file });
	});

	fs.readdirSync(dist_folder_cover).forEach(file => {
		console.log(file);
		archive.append(fs.createReadStream(dist_folder_cover + "/" + file), { name: 'cover/' + file });
	});

	fs.readdirSync(dist_folder_script).forEach(file => {
		console.log(file);
		archive.append(fs.createReadStream(dist_folder_script + "/" + file), { name: 'script/' + file });
	});

	archive.finalize();

	console.log('done!');
}
