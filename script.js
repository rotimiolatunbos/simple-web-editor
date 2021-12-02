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

	const main = document.querySelector('#main');

	const view = Array.from(document.querySelector('.view').querySelectorAll('span'));

	function setView(value) {
		main.setAttribute('class', `${value}-view`);
	}

	for (let node of view) {
		if (node.getAttribute('class') == 'active') {
			setView(node.innerText);
		}

		node.onclick = function (event) {
			view.forEach(function (node) {
				if (node.getAttribute('class') == 'active') {
					node.classList.remove('active');
				}
			})
			setView(event.target.innerText);
			node.classList.add('active');
		}
	}

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