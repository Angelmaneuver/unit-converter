import * as vscode  from 'vscode';
import { guidance } from './includes/guidance';
import { p2r }      from './includes/direct';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		vscode.commands.registerCommand('unit-converter.guidance', () => {
			guidance(context);
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand('unit-converter.p2r', () => {
			p2r(context);
		})
	);
}

export function deactivate() {}
