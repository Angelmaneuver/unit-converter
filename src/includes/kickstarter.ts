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

	if (present(state.message)) {
		window.showInformationMessage(state.message as string);
	}

	if (present(state.clipboard)) {
		env.clipboard.writeText(state.clipboard as string);
	}

	if (state.reload) {
		commands.executeCommand('workbench.action.reloadWindow');
	}
}

function present(value?: string): boolean {
	return (value && value.length > 0) ? true : false;
}
