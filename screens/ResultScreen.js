import React, { useState, useEffect } from 'react';
import { Component } from 'react';
import { FontAwesome,AntDesign} from '@expo/vector-icons';
import { Text, View, StyleSheet, Button, SafeAreaView, TouchableOpacity, AsyncStorage } from 'react-native';
import { Container, Content, Header, Card, CardItem, Title, Toolbar, Icon } from 'native-base'
import Toast from 'react-native-simple-toast';
import file from '../convertcsv.json';

export default class ResultActivity extends Component{

 constructor(props) {
     
    super(props);
    this.getData();
    this.state = {
        isLoading: true,
        dataSource: [],
        favourites : []
    };
  }

  // Function to load the data from AsyncStorage intitally
  getData = async () => {
    try {
      const favs = await AsyncStorage.getItem('favourites')
      if(favs!== null) {
        this.setState( {favourites : JSON.parse(favs)} );
        console.log("got favourites: "+ this.state.favourites)
      }
    } catch(e) {
      // error reading value
      this.setState( {favourites : [] } );
      console.log("got no favourites: ")
    }
  }

  componentDidMount() {
    this.setState({
        isLoading: false,
        dataSource: file[this.props.navigation.getParam('search', 'nothing sent')],  // Obtaining the object of the item seached
        item : this.props.navigation.getParam('search', 'nothing sent') // Obtaining the name of the item seached
    });

  }

  // Adding to list of favourites and making it persistent
  setFavourite= (value) => { 
    old_list = this.state.favourites
    new_list = [...old_list , value]  // Appending old list values and the new value
    if( value != ''){
      AsyncStorage.setItem('favourites', JSON.stringify(new_list));
      console.log("Set favourites: "+ JSON.stringify(new_list));
    }
    Toast.show('Saved to favourites');

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

  render() {

    const searched = this.props.navigation.getParam('search', 'nothing sent')
    console.log(searched);
    return (
      <SafeAreaView style={{ flex: 1 }}>

        <Container>
         
          <Header style={{ backgroundColor: "#82b74b", height: 40 }} >
            <View style={styles.row}>
              <View style={ {width: "33%" ,textAlign: 'left', paddingVertical: 10, }}>
              {this.state.dataSource.map((value) =>

                <Text style={{paddingRight:20,fontSize:20,color:"white"}}>{value["Categories"]} </Text>

              )
              }
              </View>
              <View style={{ width: "33%", alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => this.setFavourite(this.state.item)}
                  style={{height:40,paddingVertical: 5, }}>
                    <FontAwesome name="star" size={30} color = "gold"/>
                </TouchableOpacity>
              </View>

              <View style={{ width: "30%", alignItems: 'center', paddingVertical: 5,paddingLeft:60
            }}>
                <TouchableOpacity
                  // onPress={() => navigate('CameraPage')}
                  style={{height:40}}>
                    <AntDesign name="infocirlce" size={30} color = "black"/>
                </TouchableOpacity>
              </View>

            </View>
          </Header>
         
          <Content padder>
          < View style={{alignItems: 'center'}}>
            <Text style={styles.title}>
              {searched}
            </Text>
          </View>
            <Card style={{ alignItems: 'center', height: 500 }}>
              <CardItem header bordered>
                <Text style={styles.CardContent}>Sustainability Score</Text>

              </CardItem>
              <CardItem bordered>
                {this.state.dataSource.map((value) =>
                  <View>
                    <Text style={styles.CardContent}>{"\n"}Carbon Emissions                               {value["Carbon_Emissions"]}


                    </Text>
                  </View>
                )
                }
              </CardItem>
              <CardItem bordered>
                {this.state.dataSource.map((value) =>
                  <View>
                    <Text style={styles.CardContent}>{"\n"}Environment Policy                             {value["Environmental_Policy"]}


                    </Text>
                  </View>
                )
                }

              </CardItem>
              <CardItem bordered>
                {this.state.dataSource.map((value) =>
                  <View>
                    <Text style={styles.CardContent}>{"\n"}Labour Conditions                             {value["Labour_Conditions"]}

                      {"\n"}{"\n"}
                    </Text>
                  </View>
                )
                }

              </CardItem>
              <CardItem bordered>
                {this.state.dataSource.map((value) =>
                  <View>
                    <Text style={styles.CardContent}>{"\n"}Final Sum                                  {value["Final_sum"]}


                    </Text>
                  </View>
                )
                }

              </CardItem>





            </Card>
           
            <Card style={{ alignItems: 'center', height: 150 }}>
              <CardItem header bordered>
                <Text>Grade Atained</Text>

              </CardItem>
              <CardItem bordered>
                {this.state.dataSource.map((value) =>
                  <Text style={styles.Card_value}> {value["Grade"]}

                  </Text>
                )
                }


              </CardItem>


            </Card>

          </Content>
        </Container>

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
  title: {
    //flex: 1,
    textAlign: "center",
    fontSize: 50,
    fontWeight: "bold",
    color: "#82b74b",
    paddingVertical: 30

  },
  CardContent: {

    fontSize: 20,
    color: "#000",

  },
  Card_value: {
    textAlign: "center",
    fontSize: 50,
    fontWeight: "bold",
    color: "#82b74b",

  },
  grandparent: {
    flex: 1,
    flexDirection: "row",
  },
  parent: {
    flex: 1, // in react-native just flex:1
  },
  child: {



    width: '50%',
    textAlign: 'center',
    fontSize: 30,
  },
  child2: {


    width: '50%',
    textAlign: 'center',
    fontSize: 30,
  },

  row_zero: {
    flexDirection: "row",


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
    flex: 1,
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
});