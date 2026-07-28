import { ICommandService } from '../../../../platform/commands/common/commands.js';

export class NutanaaCommandPalette {
	constructor(
		@ICommandService commandService: ICommandService
	) {
		void commandService;
	}
}