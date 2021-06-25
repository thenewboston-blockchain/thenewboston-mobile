import { Reducer } from 'redux';
import { FriendActionTypes, FriendActions} from '../actions/friendActions';
  

export interface IFriendState {
    friend: []; 
}

const initialFriendState: IFriendState = {
  friend: null
};

export const friendReducer: Reducer<IFriendState, FriendActions> = (
    state = initialFriendState,
    action
  ) => {
    switch (action.type) {
      case FriendActionTypes.FRIEND: {
        return {
          ...state,
          friend: action.friend
        };
      } 
      default:
        return state;
    }
  };
