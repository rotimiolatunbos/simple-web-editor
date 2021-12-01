window.onload = function () {
	let source;

	const savedHtml = getContent('html');
	const savedCss = getContent('css');
	const savedJs = getContent('js');

	const htmlContainer = getEditorElement('html');
	const cssContainer = getEditorElement('css');
	const jsContainer = getEditorElement('js');

	const htmlEditor = createEditor(
		htmlContainer, HTML_MODE, 
		savedHtml ? savedHtml : HTML_EDITOR_DEFAULT_VALUE
	);
	const cssEditor = createEditor(
		cssContainer, CSS_MODE, 
		savedCss ? savedCss : CSS_EDITOR_DEFAULT_VALUE
	);
	const jsEditor = createEditor(
		jsContainer, JS_MODE, 
		savedJs ? savedJs : JS_EDITOR_DEFAULT_VALUE
	);

	const display = document.querySelector('#display');

	const runButton = document.querySelector('.run-button');

	function updateDisplay() {
		const html = saveContent(
			'html', getEditorContent(htmlEditor)
		);
		const css = createStyle(saveContent(
			'css', getEditorContent(cssEditor)
		));
		const js = createScript(saveContent(
			'js', getEditorContent(jsEditor)
		));

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