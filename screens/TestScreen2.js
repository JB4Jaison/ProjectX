import React, { Component } from 'react';
import {
  Switch,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Constants from 'expo-constants';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import { FontAwesome,AntDesign} from '@expo/vector-icons';
import bg from '../assets/images/bg.jpg';

const BACON_IPSUM =
  'Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs. Picanha beef prosciutto meatball turkey shoulder shank salami cupim doner jowl pork belly cow. Chicken shankle rump swine tail frankfurter meatloaf ground round flank ham hock tongue shank andouille boudin brisket. ';

const CONTENT = [
  {
    title: 'What is Sustainable Development?',
    content: "Sustainable development is development that meets the needs of the present without compromising the ability of future generations to meet their own needs.",
  },
  {
    title: 'Why is Sustaibility Important?',
    content: BACON_IPSUM,
  },
  {
    title: 'What makes a brand sustainable?',
    content: " A brand is only perceived as being sustainable if it can credibly convey sustainability benefits which are noticeable by and relevant to the consumer.[2] A sustainability brand must have an integrated culture for success. The key to a sustainable brand is trust between the consumer and the brand, only when this is achieved can a sustainable brand truly generate a USP and reap the benefits of it.",
  },
  {
    title: 'What influences the sustainability of a product?',
    content: "The materials used in products come from a resource base, and the way those resources are managed, conserved or protected is a major contributor to the overall sustainability profile of a product.",
  },
];

const SELECTORS = [
  {
    title: 'First',
    value: 0,
  },
  {
    title: 'Second',
    value: 1,
  },
  {
    title: 'Third',
    value: 2,
  },

  {
    title: 'Fourth',
    value: 3,
  },
  {
    title: 'None',
  },
];

export default class Testactivity2 extends Component {
  state = {
    activeSections: [],
    collapsed: true,
    multipleSelect: true,
  };

  toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  setSections = sections => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  };

  renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive ]}
        transition="backgroundColor"
      >
        <View style={{flex : 1, flexDirection: "row"}}>
            <Text style={styles.headerText}>{section.title}</Text>
         </View>

        <View> 
            <FontAwesome name={isActive ? "angle-down": "angle-right"} size={20} style={{ justifyContent : "flex-end"}} />
        </View>

      </Animatable.View>
    );
  };

  renderContent(section, _, isActive) {
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        {/* <Animatable.Text animation={isActive ? 'bounceIn' : undefined}>
          {section.content}
        </Animatable.Text> */}
        <Text>
            {section.content}
        </Text>
      </Animatable.View>
    );
  }

  render() {
    const { multipleSelect, activeSections } = this.state;

    return (
      <ImageBackground source={bg} style={styles.background}>
          {/* <View style={styles.container}> */}
            
            <ScrollView contentContainerStyle={{ paddingTop: 30 }}>
            <Text style={styles.title}>Sustainability</Text>

            {/* <View style={styles.multipleToggle}>
                <Text style={styles.multipleToggle__title}>Multiple Select?</Text>
                <Switch
                value={multipleSelect}
                onValueChange={a => this.setState({ multipleSelect: a })}
                />
            </View> */}

            <View style={styles.selectors}>
                <Text style={styles.selectTitle}> Quick Select:</Text>

                {SELECTORS.map(selector => (
                <TouchableOpacity
                    key={selector.title}
                    onPress={() => this.setSections([selector.value])}
                >
                    <View style={styles.selector}>
                    <Text
                        style={
                        activeSections.includes(selector.value) &&
                        styles.activeSelector
                        }
                    >
                        {selector.title}
                    </Text>
                    </View>
                </TouchableOpacity>
                ))}
            </View>

            {/* <TouchableOpacity onPress={this.toggleExpanded}>
                <View style={styles.header}>
                <Text style={styles.headerText}>Single Collapsible</Text>
                </View>
            </TouchableOpacity>
            <Collapsible collapsed={this.state.collapsed} align="center">
                <View style={styles.content}>
                <Text>
                    Bacon ipsum dolor amet chuck turducken landjaeger tongue spare
                    ribs
                </Text>
                </View>
            </Collapsible> */}

            <Accordion
                activeSections={activeSections}
                sections={CONTENT}
                touchableComponent={TouchableOpacity}
                expandMultiple={multipleSelect}
                renderHeader={this.renderHeader}
                renderContent={this.renderContent}
                duration={400}
                onChange={this.setSections}
            />
            </ScrollView>

        
        {/* <View styles= {{ padding: 0}}>
            <Text> Footer </Text>
        </View> */}
      
        {/* </View> */}
        
      </ImageBackground>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FFF0',
    // paddingTop: Constants.statusBarHeight,
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#F0FFF0',
    padding: 10,
    flexDirection : "row"
  },
  headerText: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(220,255,220,0.1)',
  },
  inactive: {
    backgroundColor: 'rgba(200,255,200,0.1)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: 'rgba(220,255,220,0.1)',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
  },
  multipleToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },
  footer: {
    bottom: 0
  },
  background: {
    width: '100%',
    height: '100%',
    position :'absolute'
  }
});

