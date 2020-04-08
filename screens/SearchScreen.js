import React, { Component } from 'react';
//import react in our code.

import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
//import all the components we are going to use.

export default class Search extends Component {
  constructor(props) {
    super(props);
    //setting default state
    this.state = { isLoading: true, text: '', show : true };
    this.arrayholder = [];
    
  }

  GetFlatListItem (fruit_name) {
   
    this.setState({text : fruit_name, show: false})
  
    }

  async componentDidMount() {
    try {
          const response = await fetch('https://gist.githubusercontent.com/JB4Jaison/93e57a15230394fa30c9ca04de5fe2cb/raw/91f4e76c8056c864057e3b567d61f4705e0e0c6a/categoriesIn.json');
          const responseJson = await response.json();
          this.setState({
              isLoading: false,
              dataSource: []
          }, function () {
              this.arrayholder = responseJson;
          });
      }
      catch (error) {
          console.error(error);
      }
  }
  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    this.setState({show: true})
    const newData = this.arrayholder.filter(function(item) {
      //applying filter for the inserted text in search bar
    //   const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
      const itemData = item.Categories ? item.Categories.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      const regex = new RegExp("^"+textData, 'i');
      // return itemData.indexOf(textData) > -1; //if found anywhere in the string return true
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
    if (this.state.isLoading) {
      //Loading View while data is loading
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      //ListView to show with textinput used as search bar
      <View style={styles.viewStyle}>
        <TextInput
          style={styles.textInputStyle}
          onChangeText={text => this.SearchFilterFunction(text)}
          value={this.state.text}
          underlineColorAndroid="transparent"
          placeholder="Search Here"
        />
        {this.state.show ? (
        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          renderItem={({ item }) => (
            // <Text style={styles.textStyle}>{item.title}</Text>
            <Text style={styles.FlatListItemStyle} onPress={this.GetFlatListItem.bind(this, item.Categories)} >
                 {item.Categories} 
                </Text>
          )}
          enableEmptySections={true}
          style={{ marginTop: 10 }}
          keyExtractor={(item, index) => index}
        />
        ) : null}
      </View>
    );
  }
}
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