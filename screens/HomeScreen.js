import React, { Component } from "react";
import {StyleSheet, TouchableOpacity,Text,  View, FlatList,
  ActivityIndicator, SafeAreaView, ImageBackground, AsyncStorage, TouchableHighlight } from "react-native";
import {Content,Thumbnail,ListItem, List,Item, Input, Button,} from 'native-base';
import {AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import bg from '../assets/images/bg.jpg';
import file from '../convertcsv.json';
import Toast from 'react-native-simple-toast';


export default class HomeActivity extends Component {

    constructor(props) {
        super(props);
        this.getHistory();
        this.getData(); // Getting values from the Async Storage
        //setting default state
        this.state = { isLoading: true, text: '', show : true, listOfFavs : [], history:[], imageURL : ''};
        this.arrayholder = [];
        
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
        Toast.show('Refreshed Favourites');
      } catch(e) {
        // error reading value
      }
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
            AsyncStorage.getItem('favourites')
        .then(
             (value) =>{
              this.setState({  
                
                listOfFavs : JSON.parse(value)
              
              });
              
              console.log(value)
             } 
         )
        }
        catch (error) {
            console.error(error);
        }
    }

    SearchFilterFunction(text) {
      this.setState({show: true})
      //passing the inserted text in textinput
      let newData = this.arrayholder.filter(function(item) {
        //applying filter for the inserted text in search bar
        
        const itemData = item ? item.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        const regex = new RegExp("^"+textData, 'i');
        // return itemData.indexOf(textData) > -1; // if found anywhere in the string return true
        if(textData == "")
          return false
        else
          return (itemData.search(regex) > -1);
      });
      console.log( "length:" + newData.length);
      newData= (newData.length >=5 ? newData.slice(0,5) : newData); // Limiting filtered resutls to 5
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

    getHistory = async () => {
      try {
        const hist = await AsyncStorage.getItem('history')
        if (hist !== null) {
          this.setState({ history: JSON.parse(hist) });
          console.log("history recorded:" + this.state.history)
    
        }
      } catch (e) {
        // error reading value
        this.setState({ history: [] });
        console.log("no history recorded: ")
      }
    }

     // Adding to list of history and making it persistent
   setHistory = (value) => {
    let old_list = this.state.history
    let new_list = [...old_list, value]  // Appending old list values and the new value
    console.log("new list" + new_list)
    if (value != '') {
      AsyncStorage.setItem('history', JSON.stringify(new_list));
      this.setState({history:new_list})
      console.log("Set history: " + JSON.stringify(new_list));
    }
    // Toast.show('Added to history');

  }

  // To be used if needed
  clearHistory = async () => {
    try {
      await AsyncStorage.removeItem('history');
      this.setState({ history: [] });
      console.log("cleared history: ")
    } catch (e) {
      // error reading value
      console.log("could not clear history: ")
    }

  }

  // To be used if needed
clearFavourites= async () => { 
  try {
    await AsyncStorage.removeItem('favourites');
    this.setState( {favourites : [] } );
    console.log("cleared favourites: ")
  } catch(e) {
    // error reading value
    console.log("could not clear favourites: ")
  }

}

functioncombined(){
  this.setHistory(this.state.text);
  const { navigate } = this.props.navigation;
  navigate('ResultCard', { search : this.state.text });
  
  console.log("history working")

}

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
            source={bg}
            style={styles.background}>
              <Content >
                <View style={{paddingVertical:30,justifyContent:'space-between'}}>
                  <View>
                    <View style={styles.row_zero}>

                    <View style={{width:"70%"}}>
                      <Item rounded style={{backgroundColor:"#BBEEBB",marginLeft:10}}>
                        <Input
                        
                        onChangeText={text => this.SearchFilterFunction(text)}
                        value={this.state.text}
                        underlineColorAndroid="transparent"
                        placeholder="Search Here"
                        />
                      </Item>
                    </View>

                    <View style={{ width: "10%" }}>
                        <TouchableOpacity
                        onPress={() => navigate('CameraPage')}
                        style={styles.ImageIconStyle1}>
                        <AntDesign name="camera" size={40} color="black" />
                        </TouchableOpacity>
                      </View>

                    <View style={{ width: "10%" }}>
                        <TouchableOpacity style={styles.ImageIconStyle2} >
                        <SimpleLineIcons name="microphone" size={30} color="black" />
                        </TouchableOpacity>
                      </View>

                    </View>

                    <View style={{marginLeft:46 ,marginTop:51,  zIndex : 1, position: 'absolute'}}>
                      {this.state.show ? (
                          <FlatList
                              data={this.state.dataSource}
                              // ItemSeparatorComponent={this.ListViewItemSeparator}
                              renderItem={({ item }) => (
                                  
                                  <Item regular style={{backgroundColor: 'rgba(200, 255, 200, 0.95)',}}>
                                    
                                  <Text placeholder='Rounded Textbox' style={styles.FlatListItemStyle} onPress={this.GetFlatListItem.bind(this, item)} >
                                      {item} 
                                      </Text>
                                    </Item>
                                    
                              )}
                              enableEmptySections={true}
                              style={{width:230}}
                              keyExtractor={(item, index) => index}
                          />
                      ) : null}
                    </View>
                    
                  </View> 
                  

                  <View style={{flex: 1, flexDirection: "row", justifyContent: 'center', zIndex : 0, paddingBottom:'22%', }}>
                    <Button block dark style={{width:"50%",}} 
                    onPress={() => this.functioncombined() }>
                    <Text style={{color:"white",fontSize:15}}>Search</Text>
                    </Button>
                  </View>

                  <View style={{paddingLeft:10, paddingRight:10, zIndex : 0}}>
                    <View style={{paddingLeft:10, paddingRight:20, flexDirection:'row',backgroundColor:'#000'}}>
                        
                      <View style={{width:"70%",}}>
                        <Text style={{ fontSize: 22, color: 'white', fontWeight:'bold', paddingHorizontal:20, paddingVertical:10, paddingTop:20, paddingBottom:20,  height:70,backgroundColor:'#000'}}>
                          My   Favourites
                        </Text>
                      </View>
                        <View style={{width:"30%",}} >
                          <TouchableOpacity
                              onPress={() => this.refresh() }
                              style={{paddingLeft:"70%", alignContent:'center', paddingTop:"15%", paddingBottom:"3%"}}
                              >
                              <AntDesign name="sync" size={20} color="white" style={{alignContent:'center', paddingTop:"40%"}} />
                          </TouchableOpacity>
                        </View>
                                      
                    
                    </View>
                  </View>

                  <View style={styles.row_zero}>
                    <List style={{paddingTop:20,paddingBottom:30, width:"80%"}}>
                          <FlatList
                              data={this.state.listOfFavs}
                              ItemSeparatorComponent={this.ListViewItemSeparator}
                              renderItem={({ item }) => (
                                <ListItem>
                                  
                                  <TouchableHighlight onPress={() => navigate('ResultCard', { search : item })} >
                                  <Thumbnail square size={20} source={{uri : file[item][0].Images}} />
                                  </TouchableHighlight>
                                  <View style={{width:"80%"}}>
                                  <TouchableHighlight onPress={() => navigate('ResultCard', { search : item })} >
                                    <Text style={styles.FlatListItemStyle} >
                                        {item} 
                                    </Text>
                                  </TouchableHighlight>
                                  </View>
                                </ListItem>
                                  
                              )}
                              enableEmptySections={true}
                              style={{ marginTop: 10 }}
                              keyExtractor={(item, index) => index}
                          />
                    </List>
                  </View>
                 
                </View>
                 
                </Content >
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
    flex: 1,
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
    paddingTop: 5,
    marginLeft: 10
  },
  ImageIconStyle2: {
    height: 70,
    width: 60,
    paddingTop: 10,
    marginLeft: 10

  },
  background: {
    width: '100%',
    height: '100%',
    position :'absolute'
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold"
  },
  search: {
    height: 30,
    borderWidth: 2,
    width: '20%',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#000',
  },
  text: {
    width: '60%'
  },
  FlatListItemStyle: {
    padding: 10,
    fontSize: 21,
    height: 55,
    paddingLeft: 10,
    fontWeight:'bold'
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