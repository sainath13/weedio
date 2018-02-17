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
      url : '',
      startTime : 0,
      endTime : 0,
    }
    this.changeState = this.changeState.bind(this);
    this.fetchRandomURL = this.fetchRandomURL.bind(this);
  }  
  componentWillMount() {
    this.fetchRandomURL();
  }
  componentDidMount(){
    console.log("didmotunt")
    // this.refs.youtubeComponent.seekTo(120);
  }

  fetchRandomURL = () => {
    this.setState({fetching : true})
    fetch('http://192.168.1.27:8080/api/videos/random')
    .then((response) => response.json())
    .then((responseJson) => {
      
      console.log(responseJson)
      let startTimeArray = responseJson.start.split(":");
      let startTime = parseInt(startTimeArray[0])*60 + parseInt(startTimeArray[1]);
      console.log(startTime)

      let endTimeArray = responseJson.end.split(":");
      let endTime = parseInt(endTimeArray[0])*60 + parseInt(endTimeArray[1]);
      console.log(endTime)

      this.setState({url: responseJson.url,
      startTime : startTime,
      endTime : endTime,
        fetching : false
      })
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
      <Text style={styles.welcome}>
          Weedio
       </Text>
      {!this.state.fetching &&
<YouTube 
  ref={(e) => this.youtubeComponent = e}
  videoId={this.state.url}
  play={true}             
  fullscreen={false}       
  loop={false}             
  onReady={e => {console.log(this);  this.youtubeComponent.seekTo(this.state.startTime) }}
  onChangeState={e => this.changeState(e.state)}
  onChangeQuality={e => this.setState({ quality: e.quality })}
  onError={e => this.setState({ error: e.error })}
  onProgress={e => {console.log(e);if(Math.floor(e.currentTime) === this.state.endTime){
   this.fetchRandomURL(); 
  }}}
  style={{ alignSelf: 'stretch', height: 300 }}
/>
      }
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
