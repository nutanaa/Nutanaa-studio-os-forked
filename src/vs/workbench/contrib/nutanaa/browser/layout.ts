// src/vs/workbench/contrib/nutanaa/browser/layout.ts

import { Disposable } from '../../../../base/common/lifecycle.js';
import { IWorkbenchLayoutService } from '../../../services/layout/browser/layoutService.js';

export class NutanaaLayoutContribution extends Disposable {
	constructor(
		@IWorkbenchLayoutService private readonly layoutService: IWorkbenchLayoutService
	) {
		super();
	}

	protected get _layout(): IWorkbenchLayoutService {
		return this.layoutService;
	}
}