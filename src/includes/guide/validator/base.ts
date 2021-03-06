import { Optional } from '../../utils/base/optional';

export class BaseValidator {
	public static async validateNumber(
		name:     string,
		value:    string,
		options?: { minimum?: number; maximum?: number; }
	): Promise<string | undefined> {
		const minimum: number = Optional.ofNullable(options?.minimum).orElseNonNullable(0);
		const maximum: number = Optional.ofNullable(options?.maximum).orElseNonNullable(65555);
		const string2Number   = Number(value);

		if (0 === value.length || value.length > 0 && (isNaN(string2Number) || string2Number > maximum || string2Number <= minimum)) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			return new Promise<string>((resolve, reject) => {
				resolve(`Enter a number between greater than ${minimum} and ${maximum} for ${name}.`);
			});
		} else {
			return undefined;
		}
	}
}
