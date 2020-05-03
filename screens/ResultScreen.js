import React from 'react';
import { Component } from 'react';
import { FontAwesome,AntDesign} from '@expo/vector-icons';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, AsyncStorage, Dimensions, Image } from 'react-native';
import { Container, Content, Header, Card, CardItem } from 'native-base'
import Toast from 'react-native-simple-toast';
import file from '../convertcsv.json';
import Carousel from 'react-native-snap-carousel';
import maxvalue from '../MaxResult.json'

const { width, height } = Dimensions.get('window')
const horizontalMargin = 0;
const slideWidth = width;

const sliderWidth = width-20;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight =250;

export default class ResultActivity extends Component{

 constructor(props) {
     
    super(props);
    this.getData();
    this.state = {
        isLoading: true,
        dataSource: [],
        favourites : [],
        reccomendation_list : [],
        item : '',
        imageURL : ''
    };
    this.createRecommendations();
  }

  // Function to load the data from AsyncStorage intitally
  getData = async () => {
    try {
      const favs = await AsyncStorage.getItem('favourites')
      if(favs!== null) {
        this.setState( {favourites : JSON.parse(favs)} );
      }
    } catch(e) {
      // error reading value
      this.setState( {favourites : [] } );
    }
  }

  componentDidMount() {
    this.setState({
        isLoading: false,
        dataSource: file[this.props.navigation.getParam('search', 'nothing sent')],  // Obtaining the object of the item seached
        item : this.props.navigation.getParam('search', 'nothing sent') // Obtaining the name of the item seached
    });
  }

  //Rendering the Carousel Item
  my_renderItem = ({item, index}) => {
    const { navigate } = this.props.navigation;
    return (

      <View style={styles.slide}>
        <View style={styles.slideInnerContainer} >
          
            <View style = {{ height: 10, flex :9 ,paddingHorizontal: 10, paddingVertical : 10, borderWidth : 0.5}}>

              <TouchableOpacity style = {{flex : 1} } 
                onPress={() =>{
                    this.setState({ dataSource:file[item.name] , item : item.name  });
                    // this.createRecommendations();
                }}>
              <Image source={{ uri: item.path }} style={{flex: 1}} resizeMode="contain"/>

              </TouchableOpacity>
            </View>
            <View style = {{ flex :3 }} >

              {/* Grade Value  */}
                <Text
                    style={{
                    fontWeight: 'bold',
                    color: 'black',
                    position: 'absolute', 
                    bottom: 2, 
                    right: 20,
                    fontSize: 30,
                    fontWeight: "bold",
                    color: "#82b74b"
                    }}
                >
                    {item.grade}
                </Text>

                {/* Item Name */}
                <Text
                    style={{
                    fontWeight: 'bold',
                    color: 'black',
                    position: 'absolute', 
                    bottom: 10, 
                    left: 10
                    }}
                >
                    {item.name}
                </Text>
            </View>
          
        </View>
      </View>
     
    );  
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

  // function for object comparisons
  compare(a, b) {
    const bandA = a.grade;
    const bandB = b.grade;

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }

  createRecommendations()
  {
      let searched = this.props.navigation.getParam('search', 'nothing sent');
      let searched_object= file[searched][0]
      let cat_objects2 = Object.keys(file).map( (item , index) =>{

        // Creating a new mini object with required fields from the appropriate category
        if(file[item][0].Categories== file[searched][0].Categories)
        {
            return {
              grade :file[item][0].Grade,
              name : item,
              path : file[item][0].Images
          }
        }

      });

    // Removing the undefined values in the array from the map function
    cat_objects2 = cat_objects2.filter(function( element ) {
      return (element !== undefined) && (element.name !== searched);
    });

    // Filtering out reccomendations habing lesser Grade
    cat_objects2 = cat_objects2.filter(function( element ) {
      return element.grade <= searched_object.Grade ;
    });

    // Sorting based on Grade values
    cat_objects2.sort(this.compare)

    // Setting the no of recommendations to max 5
    let siz = cat_objects2.length;
    (siz >= 5) ? this.state.reccomendation_list = cat_objects2.slice(0,6) : this.state.reccomendation_list = cat_objects2.slice(0,siz+1) 

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

    const searched = this.state.item
    let imageName = "";
    let category = "";
    console.log("-------------")
    console.log(this.state.dataSource)
    this.state.dataSource.map((value) =>

      category = value["Categories"]

    );
    this.state.dataSource.map((value) =>

      imageName = value["Images"]

    );
    const { navigate } = this.props.navigation;
    return (

      <SafeAreaView style={{ flex: 1 }}>
        <Container>
     
          <Header style={{ backgroundColor: "#82b74b", height: 50 }} >
            <Content>
              <View style={styles.row}>
                <View style={{ width: "33%", textAlign: 'left', paddingVertical: 10, }}>
                  {this.state.dataSource.map((value) =>

                    <Text style={{ paddingRight: 20, fontSize: 20, color: "white" }}>{value["Categories"]} </Text>

                  )
                  }
                </View>
                <View style={{ width: "33%", alignItems: 'center' }}>
                  <TouchableOpacity
                    onPress={() => this.setFavourite(this.state.item)}
                    style={{ height: 40, paddingVertical: 5, }}>
                    <FontAwesome name="star" size={30} color="gold" />
                  </TouchableOpacity>
                </View>

                <View style={{ width: "30%",alignItems:'flex-end', paddingVertical: 5}}>
                  <TouchableOpacity
                    onPress={() => navigate('TestPage', { info_item : this.state.item }) }
                    style={{ height: 40 }}>
                    <AntDesign name="infocirlce" size={30} color="black" />
                  </TouchableOpacity>
                </View>

              </View>
            </Content>
          </Header>

          <Content padder>
            < View style={{ alignItems: 'center' }}>
              <Text style={styles.title}>
                {searched}
              </Text>
            </View>
            <View style={{ flexDirection: 'row',justifyContent:'flex-start'}}>
             
            <Card style={{ alignItems: 'center', height:210,width:"50%" }}>
             
              <CardItem cardBody>

              <Image source={{uri:imageName}} style={{height: 210,flex: 1}} resizeMode="contain"/>
              
              </CardItem>


            </Card>
            <View style={{ width:"50%", flexDirection: 'column',justifyContent:'space-evenly'}}>
            <Card style={{  height: 100,alignItems:'center' }}>
              <CardItem header bordered>
                <Text style={{fontSize:12}}>Grade</Text>

              </CardItem>
              <CardItem bordered>
                
                {this.state.dataSource.map((value) =>
                  <Text style={styles.Card_value}> {value["Grade"]}

                  </Text>
                )
                }


              </CardItem>


            </Card>
            <Card style={{ height: 100,alignItems:'center' }}>
              <CardItem header bordered>
                <Text style={{fontSize:12}}>Final Sum</Text>

              </CardItem>
              <CardItem bordered >
                {this.state.dataSource.map((value) =>
                  <Text style={styles.Card_value}> {value["Final_sum"]}/{maxvalue[category].Final_sum}

                  </Text>
                )
                }


              </CardItem>


            </Card>
            </View>
            </View>
            <Card style={{ alignItems: 'center', height:240}}>
              <CardItem header bordered>
                <Text style={styles.CardContent}>Sustainability Score</Text>

              </CardItem>
              <CardItem bordered>
                {this.state.dataSource.map((value) =>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                      <Text style={styles.CardContent}>Carbon Emissions </Text>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.CardContent}>   {value["Carbon_Emissions"]}/{maxvalue[category].Carbon_Emissions} </Text>
                      </View>
                    </View>
                )
                }
              </CardItem>
              <CardItem bordered>
                {this.state.dataSource.map((value) =>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                      <Text style={styles.CardContent}>Environmental Policy</Text>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.CardContent}>   {value["Environmental_Policy"]}/{maxvalue[category].Environmental_Policy} </Text>
                      </View>
                    </View>
                )
                }

              </CardItem>
              <CardItem bordered>
                {this.state.dataSource.map((value) =>
                  

                   <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                     <View>

                       <Text style={styles.CardContent}>Labour Conditions </Text>
                       <View style={{flexDirection:'row'}}>
                       <Text style={styles.CardContent}>   {value["Labour_Conditions"]}/{maxvalue[category].Labour_Conditions} </Text>
                       </View>

                     </View>

                  </View>
                )
                }

              </CardItem>
              <CardItem bordered>
                {this.state.dataSource.map((value) =>

                  
                  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    
                      <Text style={styles.CardContent}>Final Sum </Text>
                      <View style={{flexDirection:'row'}}>
                      <Text style={styles.CardContent}>   {value["Final_sum"]}/{maxvalue[category].Final_sum} </Text>
                      </View>
                    </View>
                    
                )
                }

              </CardItem>





            </Card>

            <View>

              <Text style = {{fontWeight : 'bold', fontSize : 15}}>
                Check Out These Other Brands
              </Text>
            </View>

            <View>

              <Carousel
                ref={(c) => { this._carousel = c; }}
                data={this.state.reccomendation_list}
                renderItem={this.my_renderItem}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                layout={'stack'} 
              />
                
            {/* <Carousel data = {this.state.reccomendation_list}/> */}

            </View>
         

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
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "#82b74b",
    paddingVertical: 5
  },
  CardContent: {

    fontSize: 12,
    color: "#000",
  },
  Card_value: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
    color: "#82b74b",
  },
  parent: {
    flex: 1, // in react-native just flex:1
  },
  row_zero: {
    flexDirection: "row",
  },
  row: {
    flexDirection: "row",
    justifyContent: 'space-evenly',
  },
  background: {
    width: '100%',
    height: '100%'
  },
  text: {
    width: '60%'
  },
  cardView: {
    flex: 1,
    width: width - 30,
    height: height / 3,
    backgroundColor: 'black',
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0.5, height: 0.5 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  image: {
      width: width,
      height: height / 3,
      resizeMode : 'contain',
      borderRadius: 10
  },
    slide: {
      width: itemWidth,
      height: itemHeight - 50,  // size of the scrollable area
      paddingHorizontal: 10,
      paddingVertical : 10,
  },
  slideInnerContainer: {
      width: slideWidth -40 , // makes the card smaller
      flex: 1,
      height : height ,
      backgroundColor: 'white',
      // margin: 10, // Around card and the slide area
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 1.0, height: 1.0 },
      shadowOpacity: 0.5,
      shadowRadius: 3,
      elevation: 5,
  }
});