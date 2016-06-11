import React, { Component } from 'react';
import { SegmentedControls } from 'react-native-radio-buttons';

var Confirmation = require('./Confirmation');
var Separator = require('./Helpers/Separator');
var styles = require('./Helpers/styles');
var Host = require('./Host');
var Geolocation = require('./Geolocation');

const coordinates = {};

import {
  Image,
  View,
  Text,
  StyleSheet,
  TextInput,
  ListView,
  TouchableHighlight,
  ActivityIndicatorIOS,
  MapView
} from 'react-native';

class Time extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: '1 hour',
      coords: {},
        region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    };
  }
  handleSelected(choice) {
    this.setState({
      selectedOption: choice
    });
  }

  handleSubmit() {
    //Leave this as a breadcrumb incase we go back to NavigatorIOS
    // this.props.navigator.push({
    //   title: 'Confirmation',
    //   email: this.props.navigator.navigationContext._currentRoute.email,
    //   component: Confirmation
    // });
    this.nav('Confirmation', this.props.userEmail);

    fetch('http://localhost:3000/roam', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userEmail: this.props.userEmail,
        latitude: this.props.lat,
        longitude: this.props.lng,
        roamMode: 'roam',
        time: this.state.selectedOption
        // coordinates: this.state.coords,
        // userEmail: this.props.navigator.navigationContext._currentRoute.email

      })
    })
    .then((res) => {
      console.log('Added to db. Waiting for ROAM request confirmation!');
    })
    .catch((error) => {
      console.log('Error handling submit:', error);
    });
  }

  //BreadCrubm incase we go back to NaviatorIOS
  // handleHost() {
  //   this.setState({
  //     isLoading: true
  //   });
  //   this.props.navigator.push({
  //     title: 'Host a roam',
  //     component: Host
  //   });
  //   this.setState({
  //     isLoading: false
  //   });
  // }

  nav (path, userEmail) {
    console.log('MMMMMMMM', userEmail);
    this.props.navigator.push({
      name: path,
      passProps: {
        userEmail: userEmail
      }
    })
  }

  changeCoords(newCoords) {
    this.setState({coords: newCoords});
  }
  handleJoin() {
    console.log('Going to Join, yay!');
    this.props.navigator.push({
      title: 'Join a meeting',
      component: Join
    });
  }

  changeCoords(newCoords) {
    this.setState({coords: newCoords});
  }

  render () {
    const options = [
      '1 hour',
      '2 hours',
      '4 hours',
      'Anytime'
    ];
    return (
      <Image style={styles.backgroundImage}
      source={require('../../imgs/uni.jpg')} >
        <View style={styles.container} >
          <Text style={styles.location}>Your Current Location:</Text>
          <Geolocation onChangeCoords = {this.changeCoords.bind(this)} />
          <Text style={styles.header}> pick time : </Text>
          <SegmentedControls
            tint={'#ff0066'}
            selectedTint={'white'}
            backTint={'white'}
            options={options}
            allowFontScaling={false}
            fontWeight={'bold'}
            onSelection={this.handleSelected.bind(this)}
            selectedOption={this.state.selectedOption}
            />
          <TouchableHighlight
            style={styles.button}
            onPress={this.handleSubmit.bind(this)} >
              <Text style={styles.buttonText}> Roam! </Text>
          </TouchableHighlight>
        </View>
      </Image>
    );
  }
}


module.exports = Time;
