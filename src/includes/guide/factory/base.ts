import { AbstractGuide    } from '../base/abc';
import { StartMenuGuide   } from '../begin';
import { BaseConfirmGuide } from '../confirm';
import {
	PixelSizeGuide,
	BasePixelSizeGuide,
}                           from '../size';
import { ClipboardGuide }   from '../clipboard';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface Constructable<T> extends Function { new (...args: Array<any>): T; }

export abstract class GuideFactory {
	private static guides: Array<Constructable<AbstractGuide>> = [];

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public static create(className: string, ...args: Array<any>): AbstractGuide {
		if (this.guides.length === 0) {
			this.init();
		}

		const classObject = this.guides.find(
			(guide) => {
				return guide.name === className;
			}
		);

		if (classObject) {
			return new classObject(...args);
		} else {
			throw new ReferenceError('Requested ' + className + ' class not found...');
		}
	}

	private static init(): void {
		this.guides.push(
			StartMenuGuide,
			BaseConfirmGuide,
			PixelSizeGuide,
			BasePixelSizeGuide,
			ClipboardGuide
		);
	}
}
