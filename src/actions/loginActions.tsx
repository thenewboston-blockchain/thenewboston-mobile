import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ILoginState } from '../reducers/loginReducer';

export enum LoginActionTypes {
    PROTOCOL = 'PROTOCOL',
    IP_ADDRESS = 'IP_ADDRESS',
    PORT = 'PORT',
    NICK_NAME = 'NICK_NAME',
    PASSWORD = 'PASSWORD',
} 

export interface IProtocolAction {
    type: LoginActionTypes.PROTOCOL;
    protocol: string;
}

export interface IIpAddressAction {
    type: LoginActionTypes.IP_ADDRESS;
    ipAddress: string;
}

export interface IPortAction {
    type: LoginActionTypes.PORT;
    port: string;
}

export interface INickNameAction {
    type: LoginActionTypes.NICK_NAME;
    nickName: string;
}

export interface IPasswordAction {
    type: LoginActionTypes.PASSWORD;
    password: string;
}

export type LoginActions = IProtocolAction | IIpAddressAction | IPortAction | INickNameAction | IPasswordAction;

/*<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
 
export const ProtocolAction: ActionCreator<ThunkAction<any, ILoginState, null, IProtocolAction>> = (protocol: string) => 
    (dispatch: Dispatch) => dispatch({type: LoginActionTypes.PROTOCOL, protocol: protocol})

export const IpAddressAction: ActionCreator<ThunkAction<any, ILoginState, null, IIpAddressAction>> = (ipAddress: string) => 
    (dispatch: Dispatch) => dispatch({type: LoginActionTypes.IP_ADDRESS, ipAddress: ipAddress})

export const PortAction: ActionCreator<ThunkAction<any, ILoginState, null, IPortAction>> = (port: string) => 
    (dispatch: Dispatch) => dispatch({type: LoginActionTypes.PORT, port: port})

export const NickNameAction: ActionCreator<ThunkAction<any, ILoginState, null, INickNameAction>> = (nickName: string) => 
    (dispatch: Dispatch) => dispatch({type: LoginActionTypes.NICK_NAME, nickName: nickName})

export const PasswordAction: ActionCreator<ThunkAction<any, ILoginState, null, IPasswordAction>> = (password: string) => 
    (dispatch: Dispatch) => dispatch({type: LoginActionTypes.PASSWORD, password: password})    
