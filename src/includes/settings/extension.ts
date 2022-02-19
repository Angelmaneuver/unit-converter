import { ConfigurationTarget } from 'vscode';
import { SettingBase }         from './base';

const defaultBasePx        = 16;
const defaultSendClipboard = true;

export class ExtensionSetting extends SettingBase {
	private _basePx:        number;
	private _sendClipboard: boolean;

	constructor() {
		super('unit-converter', ConfigurationTarget.Global);

		this._basePx        = this.get('basePx') as number;
		this._sendClipboard = this.get('sendClipboard') as boolean;
	}

	public async setBasePx(value: number): Promise<void> {
		this._basePx = value;
		return this.update('basePx', value, defaultBasePx);
	}

	public get basePx(): number {
		return this._basePx;
	}

	public async setSendClipboard(value: boolean): Promise<void> {
		this._sendClipboard = value;
		return this.update('sendClipboard', value, defaultSendClipboard);
	}

	public get sendClipboard(): boolean {
		return this._sendClipboard;
	}
}
