window.onload = function () {
	let source;

	const htmlContainer = getEditorElement('html');
	const cssContainer = getEditorElement('css');
	const jsContainer = getEditorElement('js');

	const htmlEditor = createEditor(htmlContainer, HTML_MODE, HTML_EDITOR_VALUE);
	const cssEditor = createEditor(cssContainer, CSS_MODE, CSS_EDITOR_VALUE);
	const jsEditor = createEditor(jsContainer, JS_MODE, JS_EDITOR_VALUE);

	const display = document.querySelector('#display');

	const runButton = document.querySelector('.run-button');

	function updateDisplay() {
		const html = getEditorContent(htmlEditor);
		const css = createStyle(getEditorContent(cssEditor));
		const js = createScript(getEditorContent(jsEditor));

		// display.srcdoc = createHtmlDocument(html, css, js);
		source = createUrl(createHtmlDocument(html, css, js), source);
		display.src = source;
	}

	runButton.onclick = updateDisplay;
	
	// htmlEditor.on('change', updateDisplay);
	// cssEditor.on('change', updateDisplay);
	// jsEditor.on('change', updateDisplay);

	updateDisplay();
}