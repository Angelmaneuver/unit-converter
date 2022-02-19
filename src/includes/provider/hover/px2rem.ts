import { MarkdownString }        from 'vscode';
import { AbstractHoverProvider } from './base/abc';
import { ExtensionSetting }      from '../../settings/extension';

export const px2RemTarget = [
	{ scheme: 'file', language: 'html'},
	{ scheme: 'file', language: 'css' },
	{ scheme: 'file', language: 'scss' },
];

export class Px2RemHoverProvider extends AbstractHoverProvider {
	constructor(settings: ExtensionSetting) {
		super(settings, /[+-]?([0-9]+(\.[0-9]*)?|\.[0-9]+)px/);
	}

	protected analyze(word: string): MarkdownString {
		const px     = Number(word.slice(0, word.length - 2));
		const basePx = this.settings.basePx;
		const rem    = px / basePx;

		return new MarkdownString(`
| Size | (base:${basePx}px) |
| :--- | :----------------- |
| px:  | ${px}px            |
| rem: | ${rem}rem          |`
		);
	}
}
