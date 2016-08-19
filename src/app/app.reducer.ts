import { ActionReducer, Action } from '@ngrx/store';

export const INC = 'INC';
export const DEC = 'DEC';

export interface AppState {
  count: number;
}

const initialState = {count: 0};

export const appReducer: ActionReducer<AppState> = (state = initialState, action: Action) => {
  switch (action.type) {
    case INC:
      return {count: state.count + 1};
    case DEC:
      return {count: state.count - 1}
    default:
      return state;
  }
}
