import React, { Component } from "react";
import { Platform, StyleSheet, TouchableOpacity, Text, View, Button,FlatList,
  TextInput, ActivityIndicator, Alert, SafeAreaView, Image, ImageBackground } from "react-native";
import leavesBG from '../assets/images/bg.jpg';
import file from '../convertcsv.json';
//import react in our code.

export default class ResultActivity extends Component {

  constructor(props) {
     
    super(props);

    this.state = {
        isLoading: true,
        dataSource: [],
        
    };
  }

  componentDidMount() {
    this.setState({
        isLoading: false,
        dataSource: file[this.props.navigation.getParam('text', 'nothing sent')],
    });

}

  
  render() {
    const searched =  this.props.navigation.getParam('text', 'nothing sent')
    return (

      
      <SafeAreaView style={{ flex: 1 }}>
          <ImageBackground
            source={leavesBG}
            style={styles.background}>

                <View style={styles.row_zero}>
                    {/* <Text>  {this.state.dataSource}.Carbon_Emissions  is here !!</Text> */}

                    { 
                      this.state.dataSource.map( (value) => 
                      <Text> Carbon Emissions :{ value["Carbon Emissions"]} 
                        Environmental Policy :{ value["Environmental Policy"]} 
                        </Text>
                      )
                     }


                </View>

                
            </ImageBackground>
      </SafeAreaView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: "rgba(255,255,255, .5)"
  },
  top: {
    //flex: 1,
    height: '30%',
    //alignItems: 'center',
    justifyContent: 'center'
  },
  row_one: {
    flexDirection: "row",
    justifyContent: 'center',
    zIndex : 1,
  },
  row_zero: {
    flexDirection: "row",
    justifyContent: 'center',
    zIndex : 0,
  },
  row: {
    flexDirection: "row",
    justifyContent: 'center',
  },
  ImageIconStyle1: {
    height: 70,
    width: 60,
    borderWidth: 2,
    marginLeft: 15
  },
  ImageIconStyle2: {
    height: 70,
    width: 60,
    borderWidth: 2,
    paddingTop: 5,
    paddingBottom: 5

  },
  background: {
    width: '100%',
    height: '100%'
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold"
  },
  search: {
    height: 40,
    borderWidth: 2,
    width: '55%',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  text: {
    width: '60%'
  },
  FlatListItemStyle: {
    padding: 10,
    fontSize: 18,
    height: 44,
    backgroundColor: '#EEEEEE',
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
      flex : 1,
      borderWidth: 1,
      paddingLeft: 10,
      borderColor: '#009688',
      backgroundColor: '#FFFFFF',
  },
});