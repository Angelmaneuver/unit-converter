import * as vscode                           from 'vscode';
import { ExtensionSetting }                  from './includes/settings/extension';
import { guidance }                          from './includes/guidance';
import { p2r, r2p }                          from './includes/direct';
import { rem2PxTarget, Rem2PxHoverProvider } from './includes/provider/hover/rem2px';
import { px2RemTarget, Px2RemHoverProvider } from './includes/provider/hover/px2rem';

export function activate(context: vscode.ExtensionContext) {
	const settings = new ExtensionSetting();

	context.subscriptions.push(
		vscode.commands.registerCommand('unit-converter.guidance', () => {
			guidance(context, settings);
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('unit-converter.p2r', () => {
			p2r(context, settings);
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('unit-converter.r2p', () => {
			r2p(context, settings);
		})
	);

	context.subscriptions.push(
		vscode.languages.registerHoverProvider(rem2PxTarget, new Rem2PxHoverProvider(settings))
	);

	context.subscriptions.push(
		vscode.languages.registerHoverProvider(px2RemTarget, new Px2RemHoverProvider(settings))
	);
}

export function deactivate() {}
