import { ConfigurationTarget } from 'vscode';
import { SettingBase }         from './base';

const defaultBasePx        = 16;
const defaultSendClipboard = true;

export class ExtensionSetting extends SettingBase {
	private basePx:        number;
	private sendClipboard: boolean;

	constructor() {
		super('unit-converter', ConfigurationTarget.Global);

		this.basePx        = this.get('basePx') as number;
		this.sendClipboard = this.get('sendClipboard') as boolean;
	}

	public async setBasePx(value: number): Promise<void> {
		this.basePx = value;
		return this.update('basePx', value, defaultBasePx);
	}

	public getBasePx(): number {
		return this.basePx;
	}

	public getSendClipboard(): boolean {
		return this.sendClipboard;
	}

	public async setSendClipboard(value: boolean): Promise<void> {
		this.sendClipboard = value;
		return this.update('sendClipboard', value, defaultSendClipboard);
	}
}
