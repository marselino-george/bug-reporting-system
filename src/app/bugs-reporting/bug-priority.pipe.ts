import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'bugPriority'
})
export class BugPriorityPipe implements PipeTransform {

	transform(value: number): string {
		let weightsTranslation: { [id: number]: string } = {};
		weightsTranslation[0] = 'High';
		weightsTranslation[1] = 'Moderate';
		weightsTranslation[2] = 'Low';

		return weightsTranslation.hasOwnProperty(value) ? weightsTranslation[value] : '';
	}

}
