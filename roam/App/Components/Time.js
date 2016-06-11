import React, { Component } from 'react';
import { SegmentedControls } from 'react-native-radio-buttons';
const Confirmation = require('./Confirmation');
const Separator = require('./Helpers/Separator');
const styles = require('./Helpers/styles');
const Host = require('./Host');
const Geolocation = require('./Geolocation');

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
    this.props.navigator.pop();
    console.log(this.props.navigator.getCurrentRoutes())
    this.props.navigator.pop();
    console.log(this.props.navigator.getCurrentRoutes())
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
    //reformat time

    let numHrs = this.state.selectedOption !== 'Anytime'
    ? this.state.selectedOption.split(' ')[0] : 6;
    let n = new Date();
    let availTime = n.setHours(n.getHours() + numHrs);
    console.log(availTime);


    this.nav('Confirmation', this.props.userEmail);

    fetch('http://107.170.251.113:3000/roam', {
    // fetch('http://localhost:3000/roam', {
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
        date: Date.now(),
        time: availTime
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
<<<<<<< 05d8d5531908c763c667a4cc30874c114bed50a0
        <Geolocation onChangeCoords = {this.changeCoords.bind(this)} />
        <Text style={styles.header}> pick a time: </Text>
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
=======
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
>>>>>>> DEBUG - Fix POST Requests Made to Server
      </Image>
    );
  }
}






module.exports = Time;
