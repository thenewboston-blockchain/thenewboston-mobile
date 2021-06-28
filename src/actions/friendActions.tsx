import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { IFriendState } from '../reducers/friendReducer';
 
export enum FriendActionTypes {
    FRIEND = 'FRIEND', 
} 

export interface IFriendAction {
    type: FriendActionTypes.FRIEND;  
    friend: [];
}
 
export type FriendActions = IFriendAction;

/*<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
 
export const FriendAction: ActionCreator<ThunkAction<any, IFriendState, null, IFriendAction>> = (friend: []) => 
    (dispatch: Dispatch) => dispatch({type: FriendActionTypes.FRIEND, friend: friend}) 
