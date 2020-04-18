import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import CameraPage from './screens/CameraScreen';
import HomeActivity from './screens/HomeScreen';
import TestActivity from './screens/TestScreen';
import ResultActivity from './screens/ResultScreen';
import FavouritesActivity from './screens/FavouritesScreen';
import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

const Tabs = 
createMaterialTopTabNavigator({
  HomeActivity: { screen: HomeActivity },
  //TestScreen: { screen: TestActivity}  // Currently testing card
  Favourites : { screen: FavouritesActivity}
},
  {
    tabBarOptions: {
    activeTintColor: '#ffffff',
    inactiveTintColor: '#ffffff',
    inactiveBackgroundColor: '#353539',
    activeBackgroundColor: '#353539',
    showIcon: false,
    scrollEnabled:true,
    indicatorStyle: {
      borderBottomColor: '#ffffff',
      borderBottomWidth: 2,
    },
    labelStyle:{
      fontSize: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    style:{
      backgroundColor: '#353539',
    },
    tabStyle: {
      width:90,
    }
  },
}


);


const TabPages = createAppContainer(createStackNavigator({
  Tab:{ screen:Tabs,
      navigationOptions:()=>({
          headerShown : false
      }),},
  CameraPage: { screen: CameraPage },
  ResultPage: { screen: ResultActivity },
  TestPage: { screen: TestActivity }
},
));

export default TabPages;

const styles = StyleSheet.create({
  FlatListItemStyle: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  viewStyle: {
      justifyContent: 'center',
      flex: 1,
      marginTop: 40,
      padding: 16,
  },
  textStyle: {
      padding: 10,
  },
  textInputStyle: {
      height: 40,
      borderWidth: 1,
      paddingLeft: 10,
      borderColor: '#009688',
      backgroundColor: '#FFFFFF',
  },
}); 