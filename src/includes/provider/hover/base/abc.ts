import {
	CancellationToken,
	Hover,
	HoverProvider,
	Position,
	ProviderResult,
	TextDocument,
	MarkdownString
}                           from 'vscode';
import { ExtensionSetting } from '../../../settings/extension';

export abstract class AbstractHoverProvider implements HoverProvider {
	protected settings: ExtensionSetting;
	protected regex:    RegExp;

	constructor(settings: ExtensionSetting, regex: RegExp) {
		this.settings = settings;
		this.regex    = regex;
	}

	public provideHover(document: TextDocument, position: Position, token: CancellationToken): ProviderResult<Hover> {
		const wordRange = document.getWordRangeAtPosition(position, this.regex);

		if (undefined === wordRange) {
			return Promise.reject();
		} else {
			const word     = document.lineAt(position.line).text.slice(wordRange.start.character, wordRange.end.character);
			const contents = this.analyze(word);

			return Promise.resolve(new Hover(contents));
		}
	}

	protected abstract analyze(word: string): MarkdownString;
}
