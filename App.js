import * as React from 'react';
import { StyleSheet, FlatList,  TextInput,  ActivityIndicator,  Alert, Text, View, SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import CameraPage from './screens/CameraScreen';
import something from './categoriesIn.json';
import HomeActivity from './screens/HomeScreen';
import TestActivity from './screens/TestScreen';
import ResultActivity from './screens/ResultScreen';
import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

const Tabs = 
createMaterialTopTabNavigator({
  HomeActivity: { screen: HomeActivity },
  // TestScreen: { screen: TestActivity}
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
          header:null
      }),},
  CameraPage: { screen: CameraPage },
  ResultPage: { screen: ResultActivity }
},
));

export default TabPages;

// function HomeScreen() {
//   return (
//     <SafeAreaView style= { { flex : 1 } }>
//     <View style={{ justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Home!</Text>
//       {something.map((postDetail, index) => {
//         return <Text> {postDetail.Categories} </Text>
//       })}

//     </View>
//     </SafeAreaView >
//   );
// }

function SettingsScreen() {
  return (
    <SafeAreaView style= { { flex : 1 } }>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>This will be changed to camera soon!!</Text>
    </View>
    </SafeAreaView >
  );
}

// // const Tab = createBottomTabNavigator();

// const Tab = createMaterialTopTabNavigator();

// export default function App() {
//   return (
//     <SafeAreaView style= { { flex : 1 } }>
//     <NavigationContainer>

//       <Tab.Navigator
//         tabBarPosition = 'bottom'
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ focused, color}) => {
//             let iconName;

//             if (route.name === 'Home') {
//               iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
//             } else if (route.name === 'Settings') {
//               iconName = focused ? 'ios-folder' : 'ios-folder';
//             }
//             else if (route.name === 'Camera') {
//               iconName = focused ? 'ios-camera' : 'ios-camera';
//             }

//             // You can return any component that you like here!
//             return <Ionicons name={iconName} size = { 24 } color={color} />;
//           },
//         })}
//         tabBarOptions={{
//           activeTintColor: 'tomato',
//           inactiveTintColor: 'gray',
//           showIcon : true
//         }}
      
//       >
//         <Tab.Screen name="Home" component={HomeActivity} />
//         <Tab.Screen name="Settings" component={Search} />
//         <Tab.Screen name="Camera" component={CameraPage} />
//       </Tab.Navigator>
 
//     </NavigationContainer>
//     </SafeAreaView>
   
//   );
// }

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