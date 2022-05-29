import { AbstractGuide    } from '../base/abc';
import { StartMenuGuide   } from '../begin';
import { BaseConfirmGuide } from '../confirm';
import {
	PixelSizeGuide,
	BasePixelSizeGuide,
	RemSizeGuide,
}                           from '../size';
import { ClipboardGuide }   from '../clipboard';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface Constructable<T> extends Function { new (...args: Array<any>): T; }

export abstract class GuideFactory {
	private static guides: Record<string, Constructable<AbstractGuide>> = {};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public static create(className: string, ...args: Array<any>): AbstractGuide {
		if (0 === Object.keys(this.guides).length) {
			this.init();
		}

		const guideName = Object.keys(this.guides).find(guide => guide === className);

		if (guideName) {
			return new this.guides[guideName](...args);
		} else {
			throw new ReferenceError('Requested ' + className + ' class not found...');
		}
	}

	private static init(): void {
		/* eslint-disable @typescript-eslint/naming-convention */
		this.guides = {
			StartMenuGuide:     StartMenuGuide,
			BaseConfirmGuide:   BaseConfirmGuide,
			PixelSizeGuide:     PixelSizeGuide,
			BasePixelSizeGuide: BasePixelSizeGuide,
			RemSizeGuide:       RemSizeGuide,
			ClipboardGuide:     ClipboardGuide,
		};
		/* eslint-enable @typescript-eslint/naming-convention */
	}
}
