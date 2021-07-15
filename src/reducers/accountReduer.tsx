import { Reducer } from 'redux';
import { AccountActionTypes, AccountActions} from '../actions/accountActions';
  

export interface IAccountState {
    account: []; 
    is_capsule: boolean;
}

const initialAccountState: IAccountState = {
  account: null,
  is_capsule: false,
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
      case AccountActionTypes.IS_CAPSULE: {
        return {
          ...state,
          is_capsule: action.is_capsule
        };
      } 
      default:
        return state;
    }
  };
