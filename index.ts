import App from './App';
import {AppRegistry} from 'react-native';
<<<<<<< HEAD
import {name as appName} from './app.json';
import { typography } from './src/utils/typography'


typography()


AppRegistry.registerComponent(appName, () => App); 
=======
import data from './app.json';
import { typography } from './src/utils/typography'

typography()


AppRegistry.registerComponent(data.name, () => App); 
>>>>>>> master
