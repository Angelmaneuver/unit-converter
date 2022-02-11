import { BaseQuickPickGuide } from './base/pick';

const items = {
	yes: { label: '$(check) Yes', 'description': '' },
	no:  { label: '$(x) No',      'description': '' },
};

export class ClipboardGuide extends BaseQuickPickGuide {
	public init(): void {
		super.init();

		this.placeholder = 'When displaying conversion results, do you want to copy the conversion result values to the clipboard?';
        this.items       = this.items.concat(items.yes, items.no);
		this.activeItem  = this.settings.getSendClipboard() ? this.items[0] : this.items[1];
	}

	protected async inputStepAfter(): Promise<void> {
		this.settings.setSendClipboard(this.items[0] === this.activeItem ? true : false);

		return super.inputStepAfter();
	}
}
