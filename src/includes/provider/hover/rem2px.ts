import { MarkdownString }        from 'vscode';
import { AbstractHoverProvider } from './base/abc';
import { ExtensionSetting }      from '../../settings/extension';

export const rem2PxTarget = [
	{ scheme: 'file', language: 'html'},
	{ scheme: 'file', language: 'css' },
	{ scheme: 'file', language: 'scss' },
];

export class Rem2PxHoverProvider extends AbstractHoverProvider {
	constructor(settings: ExtensionSetting) {
		super(settings, /[+-]?([0-9]+(\.[0-9]*)?|\.[0-9]+)rem/);
	}

	protected analyze(word: string): MarkdownString {
		const rem    = Number(word.slice(0, word.length - 3));
		const basePx = this.settings.basePx;
		const px     = rem * basePx;

		return new MarkdownString(`
| Size | (base:${basePx}px) |
| :--- | :----------------- |
| px:  | ${px}px            |
| rem: | ${rem}rem          |`
		);
	}
}
