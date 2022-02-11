import { ExtensionContext } from 'vscode';
import { State }            from './guide/base/base';
import { start }            from './kickstarter';

export async function p2r(context: ExtensionContext): Promise<void> {
	const state = {
		title:      'Unit Converter - PX to REM',
		itemId:     'convert',
		totalSteps: 1,
		resultSet:  {},
	} as Partial<State>;

	start(context, 'PixelSizeGuide', state);
}
