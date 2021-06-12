import App from './App';
import {AppRegistry} from 'react-native';
import data from './app.json';
import { typography } from './src/utils/typography'

typography()

AppRegistry.registerComponent(data.name, () => App); 
