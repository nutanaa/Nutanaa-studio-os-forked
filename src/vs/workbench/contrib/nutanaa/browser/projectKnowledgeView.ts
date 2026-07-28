// src/vs/workbench/contrib/nutanaa/browser/projectKnowledgeView.ts

import { ViewPane, IViewPaneOptions } from '../../../browser/parts/views/viewPane.js';
import { IKeybindingService } from '../../../../platform/keybinding/common/keybinding.js';
import { IContextMenuService } from '../../../../platform/contextview/browser/contextView.js';
import { IConfigurationService } from '../../../../platform/configuration/common/configuration.js';
import { IContextKeyService } from '../../../../platform/contextkey/common/contextkey.js';
import { IViewDescriptorService, ITreeView, ITreeViewDataProvider, ITreeItem, TreeItemCollapsibleState } from '../../../common/views.js';
import { IInstantiationService } from '../../../../platform/instantiation/common/instantiation.js'
import { IOpenerService } from '../../../../platform/opener/common/opener.js';

import { IThemeService } from '../../../../platform/theme/common/themeService.js';

import { IHoverService } from '../../../../platform/hover/browser/hover.js';
import { Emitter, Event } from '../../../../base/common/event.js';
import { Codicon } from '../../../../base/common/codicons.js';

export class ProjectKnowledgeView extends ViewPane {
	private treeView!: ITreeView;

	constructor(
		options: IViewPaneOptions,
		@IKeybindingService keybindingService: IKeybindingService,
		@IContextMenuService contextMenuService: IContextMenuService,
		@IConfigurationService configurationService: IConfigurationService,
		@IContextKeyService contextKeyService: IContextKeyService,
		@IViewDescriptorService viewDescriptorService: IViewDescriptorService,
		@IOpenerService openerService: IOpenerService,
		@IThemeService themeService: IThemeService,
		@IInstantiationService instantiationService: IInstantiationService,
		@IHoverService hoverService: IHoverService
	) {
		super(options, keybindingService, contextMenuService, configurationService, contextKeyService, viewDescriptorService, instantiationService, openerService, themeService, hoverService);
	}

	protected override renderBody(container: HTMLElement): void {
		super.renderBody(container);
		const dataProvider = this.instantiationService.createInstance(ProjectKnowledgeDataProvider);		this.treeView.dataProvider = dataProvider;
		
	}
}

class ProjectKnowledgeDataProvider implements ITreeViewDataProvider {
	private readonly _onDidChangeTreeData = new Emitter<ITreeItem[] | void>();
	readonly onDidChangeTreeData: Event<ITreeItem[] | void> = this._onDidChangeTreeData.event;

	async getChildren(element?: ITreeItem): Promise<ITreeItem[]> {
		if (!element) {
			return [
				{ handle: 'know-arch', label: { label: 'Architecture Docs (4)' }, collapsibleState: TreeItemCollapsibleState.Expanded, themeIcon: { id: Codicon.book.id } },
				{ handle: 'know-rel', label: { label: 'Dependency Graph (82 Nodes)' }, collapsibleState: TreeItemCollapsibleState.Collapsed, themeIcon: { id: Codicon.references.id } }
			];
		}
		if (element.handle === 'know-arch') {
			return [
				{ handle: 'doc-1', label: { label: 'Workbench_Contributions_Design.md' }, collapsibleState: TreeItemCollapsibleState.None, themeIcon: { id: Codicon.markdown.id } }
			];
		}
		return [];
	}

	public refresh(): void {
		this._onDidChangeTreeData.fire();
	}
}