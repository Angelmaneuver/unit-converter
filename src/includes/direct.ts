import {
	window,
	commands,
	env,
	ExtensionContext
} from 'vscode';
import { MultiStepInput }    from './utils/multiStepInput';
import { State }             from './guide/base/base';
import { GuideFactory }      from './guide/factory/base';

export async function p2r(context: ExtensionContext): Promise<void> {
	const state = {
		title:      'Unit Converter - PX to REM',
		itemId:     'convert',
		totalSteps: 1,
		resultSet:  {},
	} as Partial<State>;

	try {
		const menu = GuideFactory.create('PixelSizeGuide', state, context);
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
