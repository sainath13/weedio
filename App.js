/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
import YouTube from 'react-native-youtube'


type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      fetching: true,
      url : ''
    }
    this.changeState = this.changeState.bind(this);
    this.fetchRandomURL = this.fetchRandomURL.bind(this);
  }  
  componentWillMount() {
    this.fetchRandomURL();
    this.setState({fetching: true});
    
  }

  fetchRandomURL = () => {
    fetch('http://192.168.1.27:8080/api/videos/random')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({url: responseJson.videoLink})
    });
  }

  changeState = (state) => {
    this.setState({status : state})
    if(state === "ended"){
     this.fetchRandomURL(); 
    }
  }

  render() {
    return (
      <View style={styles.container}>
<YouTube
  videoId={this.state.url}
  play={true}             
  fullscreen={false}       
  loop={false}             
  onReady={e => this.setState({ isReady: true })}
  onChangeState={e => this.changeState(e.state)}
  onChangeQuality={e => this.setState({ quality: e.quality })}
  onError={e => this.setState({ error: e.error })}
  style={{ alignSelf: 'stretch', height: 300 }}
/>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {this.state.status}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
