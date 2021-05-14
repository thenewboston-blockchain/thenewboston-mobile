import App from './App';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import { typography } from './src/utils/typography'


typography()


AppRegistry.registerComponent(appName, () => App); 
