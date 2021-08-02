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
 
export const FriendAction: ActionCreator<ThunkAction<any, IFriendState, null, IFriendAction>> = (friend: []) => 
    (dispatch: Dispatch) => dispatch({type: FriendActionTypes.FRIEND, friend: friend}) 
