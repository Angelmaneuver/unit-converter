import { ExtensionContext } from 'vscode';
import { State }            from './guide/base/base';
import { start }            from './kickstarter';

export async function guidance(context: ExtensionContext): Promise<void> {
	const state = { title: 'Unit Converter', resultSet: {} } as Partial<State>;

	start(context, 'StartMenuGuide', state);
}
