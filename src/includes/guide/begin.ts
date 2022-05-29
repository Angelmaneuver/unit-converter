import { AbstractQuickPickSelectGuide } from './base/pick';
import { State }                        from './base/base';

const items = {
	p2r:       { label: '$(export) px => rem',     description: 'Converts a px value to a rem value.' },
	r2p:       { label: '$(export) rem => px',     description: 'Converts a rem value to a px value.' },
	basePx:    { label: '$(whitespace) Base px',   description: 'Set the base px size to be used for conversion.' },
	clipboard: { label: '$(go-to-file) Clipboard', description: 'Set the clipboard setting.' },
	uninstall: { label: '$(trashcan) Uninstall',   description: 'Remove all parameters for this extension.' },
	exit:      { label: '$(sign-out) Exit',        description: 'Exit this extenion.' },
};

export class StartMenuGuide extends AbstractQuickPickSelectGuide {
	public init(): void {
		super.init();

		this.placeholder = 'Select the item you want to do.';
		this.items       = this.items.concat(items.p2r, items.r2p, items.basePx, items.clipboard, items.uninstall, items.exit);
	}

	protected getExecute(label: string | undefined): (() => Promise<void>) | undefined {
		switch (label) {
			case items.p2r.label:
				return this.setNext('PixelSizeGuide', this.createBaseState(' - PX to REM', 'convert', 1));
			case items.r2p.label:
				return this.setNext('RemSizeGuide',   this.createBaseState(' - REM to PX', 'convert', 1));
			case items.basePx.label:
				return this.setNext('BasePixelSizeGuide', this.createBaseState(' - Set the Base px', 'settingBasePx'));
			case items.clipboard.label:
				return this.setNext('ClipboardGuide', this.createBaseState(' - Set the clipboard setting', 'settingSendClipboard'));
			case items.uninstall.label:
				return this.uninstall();
			default:
				return undefined;
		}
	}

	private setNext(className: string, state: Partial<State>): () => Promise<void> {
		return async () => {
			this.setNextSteps([{ key: className, state: state }]);
		};
	}

	private uninstall(): () => Promise<void> {
		return async () => {
			this.state.placeholder = 'Do you want to uninstall the all settings related to this extension?';
			this.setNextSteps([{
				key:   'BaseConfirmGuide',
				state: { title: this.title },
				args:  [
					{ yes: 'Uninstall.', no: 'Back to previous.' },
					( async () => {
						this.settings.setBasePx(16);
						this.settings.setSendClipboard(true);
					} )
				]
			}]);
		};
	}
}
