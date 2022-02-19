import { ExtensionContext } from 'vscode';
import { ExtensionSetting } from './settings/extension';
import { State }            from './guide/base/base';
import { start }            from './kickstarter';

export async function guidance(context: ExtensionContext, settings: ExtensionSetting): Promise<void> {
	const state = { title: 'Unit Converter', resultSet: {}, settings: settings } as Partial<State>;

	start(context, 'StartMenuGuide', state);
}
