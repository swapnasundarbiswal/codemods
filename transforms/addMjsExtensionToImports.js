import fs from 'fs';
import path from 'path';

/**
 * List of paths that needs to be ignored
 * Ideally node_modules that  are part of npm
 */
const ignorePaths = [
	'fs',
	'path',
	'url',
	'crypto',
	'http',
];

function filterPaths(path) {
	const {value: sourceName} = path.node.source;

		if (ignorePaths.includes(sourceName)) {
			return false;
		}

		if (sourceName.match(/^.*\.(js|mjs|json)$/gm)) {
			return false;
		}

		if (sourceName.startsWith('./') || sourceName.startsWith('../')) {
			return true;
		}

		if (fs.existsSync(`node_modules/${sourceName}`)) {
			return false;
		}

		return true;
}

export default function transformer(file, api) {
	const j = api.jscodeshift;
	const fileDir = path.dirname(file.path);

	const replace = (p) => {
		const sourceName = p.node.source.value;
		let source = j.literal(`${sourceName}.mjs`);

		if (fs.existsSync(`${fileDir}/${sourceName}/index.mjs`)) {
			source = j.literal(`${sourceName}/index.mjs`);
		}

		return j.importDeclaration(p.value.specifiers, source);
	};

	return j(file.source)
		.find(j.ImportDeclaration)
		.filter(filterPaths)
		.replaceWith(replace)
		.toSource({ quote: 'single', useTabs: true });
}
