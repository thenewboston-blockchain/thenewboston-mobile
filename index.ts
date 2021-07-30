import App from './App';
import {AppRegistry} from 'react-native';
import data from './app.json';
import { typography } from './src/utils/typography'
import "./shim"; 
import Navigator from "./Navigator";
import { Provider } from 'react-redux'

typography() 

AppRegistry.registerComponent(data.name, () => App); 

 