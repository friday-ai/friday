import StateType from '../core/state/state.interface';
import { AvailableState, StateOwner } from './constants';
import Friday from '../core/friday';
import error from './errors/coreError';

function setItemState(itemId: string, owner: string, OwnerType: StateOwner, availableState: AvailableState): void {
  try {
    const friday = new Friday();
    const state: StateType = {
      owner,
      ownerType: StateOwner.HOUSE,
      value: AvailableState.HOUSE_EMPTY,
    };
    friday.state.set(state);
  } catch (e) {
    throw error({
      name: e.name,
      message: e.message,
      cause: e,
      metadata: {
        itemId, owner, OwnerType, availableState,
      },
    });
  }
}

export {
  setItemState,
}
