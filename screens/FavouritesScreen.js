import React, { Component } from "react";
import { Platform, StyleSheet, TouchableOpacity, Text, View, Button,FlatList,
  TextInput, ActivityIndicator, Alert, SafeAreaView, Image, ImageBackground, AsyncStorage } from "react-native";
import leavesBG from '../assets/images/bg.jpg';

export default class FavouritesActivity extends Component {

    constructor(props) {
        super(props);
        this.getData(); // Getting values from the Async Storage
        //setting default state
        this.state = {
             isLoading: true,
              text: '' ,
              listOfFavs : []
        };
        
    } 

    // Function to load the data from AsyncStorage intitally
    getData = async () => {
      try {
        const favs = await AsyncStorage.getItem('favourites')
        if(value !== null) {
          this.setState({  listOfFavs : JSON.parse(favs)});
        }
      } catch(e) {
        // error reading value
      }
    }

    // Function to refresh the Favourites list to get latest values
    refresh = async () => {
      try {
        const favs = await AsyncStorage.getItem('favourites')
        if(favs !== null) {
          this.setState({  listOfFavs : JSON.parse(favs)});
        }
      } catch(e) {
        // error reading value
      }
    }
        
    async componentDidMount() {
        // this._updateList();
        AsyncStorage.getItem('favourites')
        .then(
             (value) =>{
              this.setState({  listOfFavs : JSON.parse(value) , isLoading: false});
              console.log(value)
             } 
         )
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
                        <FlatList
                            data={this.state.listOfFavs}
                            ItemSeparatorComponent={this.ListViewItemSeparator}
                            renderItem={({ item }) => (
                                // <Text style={styles.textStyle}>{item.title}</Text>
                                <Text style={styles.FlatListItemStyle} >
                                    {item} 
                                    </Text>
                            )}
                            enableEmptySections={true}
                            style={{ marginTop: 10 }}
                            keyExtractor={(item, index) => index}
                        />

                </View>

                <TouchableOpacity style = { styles.search }
                   onPress={() => this.refresh() }  >

                    <Text> Refresh</Text>

                 </TouchableOpacity>
                
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
    backgroundColor: '#00AA11',
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