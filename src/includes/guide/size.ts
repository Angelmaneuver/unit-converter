import { State }          from './base/base';
import { BaseInputGuide } from './base/input';
import { BaseValidator }  from './validator/base';

export abstract class AbstractSizeGuide extends BaseInputGuide {
	protected displayName: string;
	protected displaySize: string;

	constructor(state: State, displayName: string, displaySize: string) {
		super(state);

		this.displayName = displayName;
		this.displaySize = displaySize;
	}

	public init(): void {
		super.init();

		this.prompt   = `Enter the ${this.displayName} value.`;
		this.validate = this.validator;
	}

	protected async lastInputStepExecute(): Promise<void> {
		const result = this.calculation(
			Number(this.guideGroupResultSet[this.itemId]),
			this.settings.basePx
		);

		this.state.message = `${result}${this.displaySize}`;

		if (this.settings.sendClipboard) {
			this.state.clipboard = `${result}${this.displaySize}`;
		}
	}

	protected abstract calculation(value: number, basePx: number): number;

	public abstract validator(value: string): Promise<string | undefined>;
}

export class PixelSizeGuide extends AbstractSizeGuide {
	constructor(state: State) {
		super(state, 'Pixel', 'rem');
	}

	public init(): void {
		super.init();

		this.itemId = 'pixel';
	}

	protected calculation(value: number, basePx: number): number {
		return value / basePx;
	}

	public async validator(value: string): Promise<string | undefined> {
		return BaseValidator.validateNumber('Pixel', value, { minimum: 0 });
	}
}

export class BasePixelSizeGuide extends PixelSizeGuide {
	public init(): void {
		this.state.initailValue = String(this.settings.basePx);

		super.init();
	}

	protected async inputStepAfter(): Promise<void> {
		this.settings.setBasePx(Number(this.guideGroupResultSet[this.itemId]));

		return super.inputStepAfter();
	}
}

export class RemSizeGuide extends AbstractSizeGuide {
	constructor(state: State) {
		super(state, 'Rem', 'px');
	}

	public init(): void {
		super.init();

		this.itemId = 'rem';
	}

	protected calculation(value: number, basePx: number): number {
		return value * basePx;
	}

	public async validator(value: string): Promise<string | undefined> {
		return BaseValidator.validateNumber('Rem', value, { minimum: 0 });
	}
}
