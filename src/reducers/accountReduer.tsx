import { Reducer } from 'redux';
import { AccountActionTypes, AccountActions} from '../actions/accountActions';
  

export interface IAccountState {
    account: []; 
}

const initialAccountState: IAccountState = {
  account: null
};

export const accountReducer: Reducer<IAccountState, AccountActions> = (
    state = initialAccountState,
    action
  ) => {
    switch (action.type) {
      case AccountActionTypes.ACCOUNT: {
        return {
          ...state,
          account: action.account
        };
      } 
      default:
        return state;
    }
  };
