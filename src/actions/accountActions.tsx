import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IAccountState } from '../reducers/accountReduer';
 
export enum AccountActionTypes {
    ACCOUNT = 'ACCOUNT', 
    IS_CAPSULE = 'IS_CAPSULE',
} 

export interface IAccountAction {
    type: AccountActionTypes.ACCOUNT;  
    account: [];
}

export interface IISCAPSULEAction {
    type: AccountActionTypes.IS_CAPSULE;  
    is_capsule: boolean;
}
 
export type AccountActions = IAccountAction | IISCAPSULEAction;

/*<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
 
export const AccountAction: ActionCreator<ThunkAction<any, IAccountState, null, IAccountAction>> = (account: []) => 
    (dispatch: Dispatch) => dispatch({type: AccountActionTypes.ACCOUNT, account: account}) 


export const ISCAPSULEAction: ActionCreator<ThunkAction<any, IAccountState, null, IISCAPSULEAction>> = (is_capsule: boolean) => 
    (dispatch: Dispatch) => dispatch({type: AccountActionTypes.IS_CAPSULE, is_capsule: is_capsule}) 