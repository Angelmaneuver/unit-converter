import {
	window,
	commands,
	env,
	ExtensionContext
} from 'vscode';
import { MultiStepInput }    from './utils/multiStepInput';
import { State }             from './guide/base/base';
import { GuideFactory }      from './guide/factory/base';

export async function start(context: ExtensionContext, className: string, state: Partial<State>): Promise<void> {
	try {
		const menu = GuideFactory.create(className, state, context);
		await MultiStepInput.run((input: MultiStepInput) => menu.start(input));
	} catch (e) {
		if (e instanceof Error) {
			window.showWarningMessage(e.message);
			console.debug(e);
		}
	}

	if (state.message && state.message.length > 0) {
		window.showInformationMessage(state.message);
	}

	if (state.clipboard && state.clipboard.length > 0) {
		env.clipboard.writeText(state.clipboard);
	}

	if (state.reload) {
		commands.executeCommand('workbench.action.reloadWindow');
	}
}
