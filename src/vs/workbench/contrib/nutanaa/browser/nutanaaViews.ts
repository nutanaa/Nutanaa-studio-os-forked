/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Nutanaa Studio OS. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Disposable } from '../../../../base/common/lifecycle.js';
import { localize2 } from '../../../../nls.js';
import { Registry } from '../../../../platform/registry/common/platform.js';
import { SyncDescriptor } from '../../../../platform/instantiation/common/descriptors.js';
import { IInstantiationService } from '../../../../platform/instantiation/common/instantiation.js';
import { Action2, MenuId, registerAction2 } from '../../../../platform/actions/common/actions.js';
import { ContextKeyExpr } from '../../../../platform/contextkey/common/contextkey.js';
import { TreeView, TreeViewPane } from '../../../browser/parts/views/treeView.js';
import {
	Extensions as ViewExtensions,
	ITreeViewDescriptor,
	IViewsRegistry,
	ViewContainer,
} from '../../../common/views.js';
import { NUTANAA_AGENT_EXPLORER_REFRESH_COMMAND_ID, NUTANAA_AGENT_EXPLORER_VIEW_ID } from '../common/nutanaa.js';
import { AgentExplorerViewDataProvider } from './agentExplorerViewDataProvider.js';
import { nutanaaRefreshIcon } from './nutanaaIcons.js';

/**
 * Registers all views hosted inside the Nutanaa view container.
 *
 * Currently registers the Agent Explorer; Workflow Explorer, Provider
 * Explorer, Memory Explorer and Task Explorer follow the identical pattern
 * established here and are added incrementally, per Nutanaa Studio OS's
 * "build incrementally, never rewrite completed modules" rule.
 */
export class NutanaaViews extends Disposable {

	constructor(
		container: ViewContainer,
		@IInstantiationService private readonly instantiationService: IInstantiationService,
	) {
		super();
		this.registerAgentExplorerView(container);
	}

	private registerAgentExplorerView(container: ViewContainer): void {
		const viewsRegistry = Registry.as<IViewsRegistry>(ViewExtensions.ViewsRegistry);
		const name = localize2('nutanaa.agentExplorer.title', "Agents");

		const treeView = this._register(this.instantiationService.createInstance(TreeView, NUTANAA_AGENT_EXPLORER_VIEW_ID, name.value));
		const dataProvider = this._register(this.instantiationService.createInstance(AgentExplorerViewDataProvider));
		treeView.showRefreshAction = true;
		treeView.dataProvider = dataProvider;

		const viewDescriptor: ITreeViewDescriptor = {
			id: NUTANAA_AGENT_EXPLORER_VIEW_ID,
			name,
			ctorDescriptor: new SyncDescriptor(TreeViewPane),
			canToggleVisibility: true,
			canMoveView: true,
			treeView,
			collapsed: false,
			order: 100,
		};

		viewsRegistry.registerViews([viewDescriptor], container);

		this._register(registerAction2(class extends Action2 {
			constructor() {
				super({
					id: NUTANAA_AGENT_EXPLORER_REFRESH_COMMAND_ID,
					title: localize2('nutanaa.agentExplorer.refresh', "Refresh Agents"),
					icon: nutanaaRefreshIcon,
					menu: {
						id: MenuId.ViewTitle,
						when: ContextKeyExpr.equals('view', NUTANAA_AGENT_EXPLORER_VIEW_ID),
						group: 'navigation',
					},
				});
			}

			run(): void {
				treeView.refresh();
			}
		}));
	}
}
