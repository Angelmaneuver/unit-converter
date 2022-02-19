import { ExtensionContext } from 'vscode';
import { ExtensionSetting } from './settings/extension';
import { State }            from './guide/base/base';
import { start }            from './kickstarter';

export async function p2r(context: ExtensionContext, settings: ExtensionSetting): Promise<void> {
	const state = {
		title:      'Unit Converter - PX to REM',
		itemId:     'convert',
		totalSteps: 1,
		resultSet:  {},
		settings:   settings,
	} as Partial<State>;

	start(context, 'PixelSizeGuide', state);
}
