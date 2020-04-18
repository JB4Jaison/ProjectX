import React, { Component } from "react";
import { Platform, StyleSheet, TouchableOpacity, Text, View, Button,FlatList,
  TextInput, ActivityIndicator, Alert, SafeAreaView, Image, ImageBackground } from "react-native";
import leavesBG from '../assets/images/bg.jpg';
import camera from '../assets/images/camera.png';
import siri from '../assets/images/siri.png';
import CameraPage from './CameraScreen'
import { StackNavigator } from "react-navigation";

export default class HomeActivity extends Component {

    constructor(props) {
        super(props);
        //setting default state
        this.state = { isLoading: true, text: '', show : true };
        this.arrayholder = [];
        
    }
    
    GetFlatListItem (searched) {
    
    this.setState({text : searched, show: false})
    
    }
    
    async componentDidMount() {
      try {
            const response = await fetch('https://gist.githubusercontent.com/JB4Jaison/4a5de0b7b14a905fbb3ebd02e43d2e3b/raw/8a685a8fc9056ff836312c4a1407c01e1526692d/Beautifiedjson.json');
            const responseJson = await response.json();
            this.setState({
                isLoading: false,
                dataSource: []
            }, function () {
                this.arrayholder = Object.keys(responseJson);
            });
        }
        catch (error) {
            console.error(error);
        }
    }
    SearchFilterFunction(text) {
      this.setState({show: true})
      //passing the inserted text in textinput
      const newData = this.arrayholder.filter(function(item) {
        //applying filter for the inserted text in search bar
      //   const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
        
        const itemData = item ? item.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        const regex = new RegExp("^"+textData, 'i');
        // return itemData.indexOf(textData) > -1; // if found anywhere in the string return true
        if(textData == "")
          return false
        else
          return (itemData.search(regex) > -1);
      });
      this.setState({

        //setting the filtered newData on datasource
        //After setting the data it will automatically re-render the view
        dataSource: newData,
        text: text,
      });
    }
    ListViewItemSeparator = () => {
      //Item sparator view
      return (
          <View
          style={{
            height: 1,
            width: "100%",
            backgroundColor: "#607D8B",
          }}
        />
      );
    };

  render() {
    const { navigate } = this.props.navigation;
    if (this.state.isLoading) {

      //Loading View while data is loading
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (

      
      <SafeAreaView style={{ flex: 1 }}>
          <ImageBackground
            source={leavesBG}
            style={styles.background}>

                <View style={styles.row_zero}>

                    <TextInput
                    style={styles.textInputStyle}
                    onChangeText={text => this.SearchFilterFunction(text)}
                    value={this.state.text}
                    underlineColorAndroid="transparent"
                    placeholder="Search Here"
                    />

                    <View style={{ width: "20%" }}>
                        <TouchableOpacity
                        onPress={() => navigate('CameraPage')}
                        style={styles.ImageIconStyle1}>
                        <Image source={camera}
                            style={{ height: '100%', width: '100%' }}
                        />
                        </TouchableOpacity>
                     </View>

                     
                    <View style={{ width: "20%" }}>
                        <TouchableOpacity style={styles.ImageIconStyle2} >
                            <Image source={siri}
                            style={{ height: '100%', width: '100%' }}
                            />
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={styles.row_zero}>
                    {this.state.show ? (
                        <FlatList
                            data={this.state.dataSource}
                            ItemSeparatorComponent={this.ListViewItemSeparator}
                            renderItem={({ item }) => (
                                // <Text style={styles.textStyle}>{item.title}</Text>
                                <Text style={styles.FlatListItemStyle} onPress={this.GetFlatListItem.bind(this, item)} >
                                    {item} 
                                    </Text>
                            )}
                            enableEmptySections={true}
                            style={{ marginTop: 10 }}
                            keyExtractor={(item, index) => index}
                        />
                    ) : null}
                </View>

                <View style={styles.row_one}>

                    <TouchableOpacity
                        // onPress={() => navigate('ResultPage', { text: this.state.text }) }
                        onPress={() => navigate('ResultPage', { search : this.state.text }) }
                        style={styles.search}>
                        <Text style={{ color: '#fff' }}>Search</Text>
                    </TouchableOpacity>

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