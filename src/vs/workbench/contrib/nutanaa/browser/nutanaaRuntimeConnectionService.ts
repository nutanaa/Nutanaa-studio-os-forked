/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Nutanaa Studio OS. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Disposable } from '../../../../base/common/lifecycle.js';
import { Emitter, Event } from '../../../../base/common/event.js';
import { ILogService } from '../../../../platform/log/common/log.js';
import {
	INutanaaAgentSummary,
	INutanaaRuntimeConnectionService,
	NutanaaRuntimeConnectionState,
} from '../common/nutanaa.js';

/**
 * Default {@link INutanaaRuntimeConnectionService}.
 *
 * There is currently no transport implemented (Nutanaa Studio OS Phase 3 —
 * FastAPI/WebSocket backend — has not been built yet). This implementation
 * deliberately does not simulate a connection or synthesize agent data; it
 * reports {@link NutanaaRuntimeConnectionState.Error} on every connect
 * attempt so the UI's "not connected" state is accurate. Once the backend
 * bridge exists, only this class needs to change — no view code does,
 * because everything depends on the {@link INutanaaRuntimeConnectionService}
 * contract rather than a concrete transport.
 */
export class NutanaaRuntimeConnectionService extends Disposable implements INutanaaRuntimeConnectionService {

	declare readonly _serviceBrand: undefined;

	private readonly _onDidChangeState = this._register(new Emitter<NutanaaRuntimeConnectionState>());
	readonly onDidChangeState: Event<NutanaaRuntimeConnectionState> = this._onDidChangeState.event;

	private readonly _onDidChangeAgents = this._register(new Emitter<void>());
	readonly onDidChangeAgents: Event<void> = this._onDidChangeAgents.event;

	private _state: NutanaaRuntimeConnectionState = NutanaaRuntimeConnectionState.Disconnected;
	get state(): NutanaaRuntimeConnectionState {
		return this._state;
	}

	constructor(
		@ILogService private readonly logService: ILogService,
	) {
		super();
	}

	async connect(): Promise<void> {
		this.setState(NutanaaRuntimeConnectionState.Connecting);

		// No transport exists yet. Fail honestly instead of pretending to
		// succeed; replace this method's body with a real REST/WebSocket
		// handshake once the Nutanaa Runtime backend (Phase 3) is available.
		this.logService.warn('[Nutanaa] connect() called, but no runtime backend transport is implemented yet.');
		this.setState(NutanaaRuntimeConnectionState.Error);
	}

	async getAgents(): Promise<readonly INutanaaAgentSummary[]> {
		if (this._state !== NutanaaRuntimeConnectionState.Connected) {
			return [];
		}
		// Unreachable until connect() has a real implementation, but kept
		// consistent with the contract for when it does.
		return [];
	}

	private setState(state: NutanaaRuntimeConnectionState): void {
		if (this._state === state) {
			return;
		}
		this._state = state;
		this._onDidChangeState.fire(state);
	}
}
