'use strict';
import React, { Component } from 'react';
const defaultStyles = require('./Helpers/styles');
const df = require('./Helpers/dateFormat');
const Confirmation = require('./Confirmation');
const Dte = require('./Dte');

import {
  Image,
  DatePickerIOS,
  View,
  Text,
  StyleSheet,
  TextInput,
  ListView,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicatorIOS,
} from 'react-native';

class Host extends Component {

  constructor (props) {
    super(props);
    let n = new Date();
    let twoHours = n.setHours(n.getHours()+2);
    this.state = {
      date: new Date(),
      endTime: new Date(twoHours),
      flag: false,
      titleText: this.props.titleText || '',
      descText: this.props.descText || '',
      locName: this.props.locName || '',
      price: this.props.price || '',
      capacity: this.props.capacity || ''
    };
  }

nav (path, title) {
    this.props.navigator.push({
      name: path,
      title: title,
      passProps: {
        userEmail: this.props.userEmail,
        titleText: this.state.titleText,
        descText: this.state.descText,
        capacity: this.props.capacity || this.state.capacity,
        price:this.props.price || this.state.price,
        isHost: this.props.isHost,
        date: this.props.date || this.state.dateString,
        time: this.props.time || this.state.time,
        endDate: this.props.endDate,
        endTime: this.props.endTime,
        locName: this.state.locName,
        address: this.props.address,
        latitude: this.props.lat,
        longitude: this.props.lng

      }
    });
}

handleSubmit () {
  let ds = this.props.date || df.formatDate(this, 'date');
  let tm = this.props.time || df.formatTime(this, 'date');
  let dt = Date.parse(ds + ' ' + tm);
  let eD = this.props.endDate;
  let eTm = this.props.endTime;
  let eDt = Date.parse(eD + ' ' + eTm)

  console.log('time: ', eDt);
  //create the object
  let options = {
      userEmail: this.props.userEmail,
      title: this.state.titleText,
      capacity: this.state.capacity,
      description: this.state.descText,
      locName: this.state.locName,
      address: this.props.address,
      latitude: this.props.lat,
      longitude: this.props.lng,
      date: dt,
      time: eDt, //see fetch in Time.js
      price: this.state.price,
      isHost: true,
      roamMode: 'pool'
   }
  //make an ajax call to the database
   fetch('http://localhost:3000/roam', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(options)
  })
   .then( res => console.log('posted object'))
   .catch(err => console.log('error posting object'));
  //navigate to confirmation
  this.nav('Confirmation')
}

onFocus () {
  this.setState({
    flag: true
  })
}

onBlur () {
  this.setState({
    flag: false
  })
}

  render () {
// const homePlace = {description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
// const workPlace = {description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};
    return (
      <Image style={defaultStyles.backgroundImage} source={require('../../imgs/uni.jpg')}>
        <View style={defaultStyles.container}>
          <View style={defaultStyles.hostContainer}>
            <Text style={defaultStyles.header}>Host a roam</Text>
            <TextInput
                style={defaultStyles.submit}
                autoCapitalize="none"
                placeholder={this.props.titleText ? this.props.titleText : "Enter Event Title"}
                placeholderTextColor="white"
                onChangeText={(text) => this.setState({titleText: text})}
                value={this.state.titleText}
            />
            <TouchableHighlight onPress={() => this.nav('Dte', 'Schedule')}>
              <View style={defaultStyles.dateViewBox}>
                <View>
                  <Text style={defaultStyles.dateViewLabel}>Roam Start:</Text>
                </View>
                <View>
                  <Text style={defaultStyles.dateViewTime}>{this.props.date
                    ? this.props.date
                    : df.formatDate(this, 'date')} {this.props.time
                      ? this.props.time
                      : df.formatTime(this, 'date')}
                      </Text>
                </View>
              </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={() => this.nav('Dte', 'Schedule')}>
              <View style={defaultStyles.dateViewBox}>
                <View>
                  <Text style={defaultStyles.dateViewLabel}>Roam End:</Text>
                </View>
                <View>
                  <Text style={[defaultStyles.dateViewTime, styles.dateRight]}>{this.props.date
                    ? this.props.endDate
                    : df.formatDate(this, 'endTime')} {this.props.time
                    ? this.props.endTime
                    : df.formatTime(this, 'endTime')}
                    </Text>
                </View>
              </View>
            </TouchableHighlight>

           <TouchableHighlight onPress={() => this.nav('Location')}>
            <View style={defaultStyles.locViewBox}>
                <View>
                  <Text style={defaultStyles.locViewLabel}>Location:</Text>
                </View>
                <View>
                  <Text style={[defaultStyles.locViewLabel, styles.location]}>{this.props.locName} </Text>
                </View>
              </View>
          </TouchableHighlight>
          <View>
          <View style={defaultStyles.smallSubContainer}>
             <TextInput
                style={defaultStyles.smallSubmit}
                autoCapitalize="none"
                placeholder={this.props.price ? this.props.price : '$ Cost'}
                placeholderTextColor='white'
                autoCorrect={false}
                onChangeText={(text) => this.setState({price: text})}
              />
             <TextInput
                style={[defaultStyles.smallSubmit, styles.capacity]}
                autoCapitalize="none"
                placeholder={this.props.capacity ? this.props.capacity : 'Capacity'}
                placeholderTextColor='white'
                autoCorrect={false}
                onChangeText={(text) => this.setState({capacity: text})}
              />
            </View>
          </View>

           <View>
            <TextInput
              style={this.state.flag ? defaultStyles.bigInput : defaultStyles.desc}
              autoCapitalize="none"
              placeholder={this.props.descText ? this.props.descText : "Enter roam description"}
              autoCorrect={false}
              placeholderTextColor="white"
              onFocus = {() => this.onFocus()}
              onBlur = {() => this.onBlur()}
              multiline = {true}
              onChangeText={(text) => this.setState({descText: text})}
              value={this.state.descText}
            />
          </View>
          <View style={defaultStyles.startRoam}>
            <TouchableHighlight
                style={[defaultStyles.button, styles.button]}
                onPress={() => this.handleSubmit()}
                underlayColor="white" >
                  <Text style={defaultStyles.buttonText}> Start roam </Text>
            </TouchableHighlight>

          </View>
        </View>
      </View>
    </Image>
    );
  }
}

const styles = StyleSheet.create({
  location: {
    marginLeft: 18,
    fontSize: 18
  },
  capacity: {
    marginLeft: 40
  },
 dateRight: {
  marginLeft: 45
 },
 button: {
  marginTop: 0,
  marginBottom: 3
  }
})

module.exports = Host;