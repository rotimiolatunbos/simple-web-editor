
const HTML_MODE = {
	name: 'xml',
	htmlMode: true
}
const CSS_MODE = 'css';
const JS_MODE = 'javascript';

const HTML_EDITOR_VALUE = '<h1>Hello World!</h1>';
const CSS_EDITOR_VALUE = `h1 { 
	text-align: center;
}`
const JS_EDITOR_VALUE = `console.log('hello world!')\n`

function defaultEditorConfig(mode, value) {
	return {
		lineNumbers: true,
		lineWrapping: true,
		theme: 'ayu-dark',
		// scrollbarStyle: 'null',
		value: value ? value : '',
		mode: mode
	}
}

function createEditor(elem, mode, value) {
	return CodeMirror(elem, defaultEditorConfig(mode, value));
}

function createHtmlDocument(htmlSnippet, cssStyles, jsCode) {
	return `<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width">
	${cssStyles}
	${jsCode}
</head>
<body>
	${htmlSnippet}
</body>
</html>`
}

function createScript(jsCode) {
	return `<script type='text/javascript'>
	${jsCode}
</script>`
}

function createStyle(cssStyle) {
	return `<style type='text/css'>
	${cssStyle}
</style>`
}

function getEditorElement(lang) {
	return document.getElementById(lang).querySelector('main');
}

function getEditorContent(editor) {
	return editor.getValue();
}

function createUrl(htmlDoc, oldUrl) {
	if (oldUrl) {
		URL.revokeObjectURL(oldUrl);
	}

	const file = new Blob([htmlDoc], {type: 'text/html'});
	return URL.createObjectURL(file);
}