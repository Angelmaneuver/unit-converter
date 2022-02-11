import { BaseInputGuide } from './base/input';
import { BaseValidator }  from './validator/base';

export abstract class AbstractSizeGuide extends BaseInputGuide {
	public init(): void {
		super.init();

		this.validate = this.validator;
	}

	abstract validator(value: string): Promise<string | undefined>;
}

export class PixelSizeGuide extends AbstractSizeGuide {
	public init(): void {
		super.init();

		this.itemId = 'pixel';
		this.prompt = 'Enter the Pixel value.';
	}

	protected async lastInputStepExecute(): Promise<void> {
		const basePx = this.settings.getBasePx();
		const p2r    = Number(this.guideGroupResultSet[this.itemId]) / basePx;

		this.state.message = `${p2r}rem`;

		if (this.settings.getSendClipboard()) {
			this.state.clipboard = `${p2r}`;
		}
	}

	public async validator(value: string): Promise<string | undefined> {
		return BaseValidator.validateNumber('Pixel', value, { minimum: 0 });
	}
}

export class BasePixelSizeGuide extends PixelSizeGuide {
	public init(): void {
		this.state.initailValue = String(this.settings.getBasePx());

		super.init();
	}

	protected async inputStepAfter(): Promise<void> {
		this.settings.setBasePx(Number(this.guideGroupResultSet[this.itemId]));

		return super.inputStepAfter();
	}
}
