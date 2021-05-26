<<<<<<< HEAD
import App from './App';
import {AppRegistry} from 'react-native';
import data from './app.json';
import { typography } from './src/utils/typography'

typography()


AppRegistry.registerComponent(data.name, () => App); 
=======
/**
 * @format
 */

import App from './App';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
>>>>>>> 1a59eb69a7e75d2dfa30ce768aa106582408fef1
