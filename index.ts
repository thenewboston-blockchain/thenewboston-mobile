import App from './App';
import {AppRegistry} from 'react-native';
import data from './app.json';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { typography } from './src/utils/typography'

typography()


AppRegistry.registerComponent(data.name, () => gestureHandlerRootHOC(App)); 
