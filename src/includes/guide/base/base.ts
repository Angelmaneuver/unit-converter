import {
	QuickPickItem,
	ExtensionContext
}                           from 'vscode';
import { 
	AbstractState,
	AbstractGuide
}                           from './abc';
import { ExtensionSetting } from '../../settings/extension';

export interface State extends AbstractState {
	context:      ExtensionContext,
	settings:     ExtensionSetting,
	message?:     string                  | undefined;
	clipboard?:   string,
	reload?:      boolean
	prompt?:      string,
	placeholder?: string,
	items?:       Array<QuickPickItem>,
	activeItem?:  QuickPickItem,
}

export abstract class AbstractBaseGuide extends AbstractGuide {
	constructor(
		state:    State,
		context?: ExtensionContext
	) {
		super(state);

		if (context) {
			this.state.context = context;
		}
	}

	protected stateClear(): void {
		super.stateClear();

		this.state.prompt      = undefined;
		this.state.placeholder = undefined;
		this.state.items       = undefined;
		this.state.activeItem  = undefined;
	}

	protected get state(): State {
		return this._state as State;
	}

	protected get context(): ExtensionContext {
		if (this.state.context) {
			return this.state.context;
		} else {
			throw ReferenceError('Extension Context not set...');
		}
	}

	protected get settings(): ExtensionSetting {
		if (!this.state.settings) {
			this.state.settings = new ExtensionSetting();
		}

		return this.state.settings;
	}

	protected async inputStepAfter(): Promise<void> {
		if (this.totalSteps === 0) {
			this.prev();
		} else if (this.step === this.totalSteps) {
			await this.lastInputStepExecute();
		}
	}

	protected async lastInputStepExecute(): Promise<void> {}
}
