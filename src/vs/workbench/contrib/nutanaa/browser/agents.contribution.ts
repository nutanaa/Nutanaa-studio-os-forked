import { Registry } from '../../../../platform/registry/common/platform.js';
import { Extensions as ViewExtensions, IViewsRegistry, IViewContainersRegistry } from '../../../common/views.js';
import { SyncDescriptor } from '../../../../platform/instantiation/common/descriptors.js';
import { localize } from '../../../../nls.js';
import { AgentExplorerTreeView } from './agentExplorerTreeView.js';
import { AGENT_EXPLORER_VIEW_ID } from './agents.identifiers.js';
import { NUTANAA_VIEW_CONTAINER_ID } from './constants.js';

const viewContainersRegistry = Registry.as<IViewContainersRegistry>(ViewExtensions.ViewContainersRegistry);
const viewsRegistry = Registry.as<IViewsRegistry>(ViewExtensions.ViewsRegistry);

const container = viewContainersRegistry.get(NUTANAA_VIEW_CONTAINER_ID);

if (container) {
	viewsRegistry.registerViews([{
		id: AGENT_EXPLORER_VIEW_ID,
		name: { value: localize('agentExplorer', 'Agent Explorer'), original: 'Agent Explorer' },
		ctorDescriptor: new SyncDescriptor(AgentExplorerTreeView),
		canToggleVisibility: true,
		canMoveView: true,
		order: 1
	}], container);
}