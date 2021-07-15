import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IAccountState } from '../reducers/accountReduer';
 
export enum AccountActionTypes {
    ACCOUNT = 'ACCOUNT', 
} 

export interface IAccountAction {
    type: AccountActionTypes.ACCOUNT;  
    account: [];
}
 
export type AccountActions = IAccountAction;

/*<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
 
export const AccountAction: ActionCreator<ThunkAction<any, IAccountState, null, IAccountAction>> = (account: []) => 
    (dispatch: Dispatch) => dispatch({type: AccountActionTypes.ACCOUNT, account: account}) 
