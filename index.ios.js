'use strict';

var React = require('react-native'),
    Scroll = require('./components/Scroll.js'),
    NavBar = require('./components/NavBar.js'),
    styles = require('./Style.js');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Component,
  ScrollView,
  TouchableOpacity,
  AlertIOS,
  Navigator,
  StatusBarIOS
} = React;

var SCREEN_WIDTH = require('Dimensions').get('window').width;
var BaseConfig = Navigator.SceneConfigs.FloatFromRight;
var CustomLeftToRightGesture = Object.assign({}, BaseConfig.gestures.pop, {
  snapVelocity: 8,
  edgeHitWidth: false,
  isDetachable: true,
  gestureDetectMovement: 1,
  notMoving: 0,
  directionRatio: 2,
  stillCompletionRatio: 1,
  fullDistance: 320,
  direction: 'left-to-right'
});

var CustomSceneConfig = Object.assign({}, BaseConfig, {
  springTension: 100,
  springFriction: 1,
  defaultTransitionVelocity: 1,
  gestures: {
    pop: CustomLeftToRightGesture,
  }
});
class HomePage extends Component{
  constructor(props) {
    super(props);
  }
   _handlePress(){
     this.props.navigator.push({name: 'Scroll',component: Scroll});
   }
   render(){
      return (
        <View style={styles.container} >
         <TouchableOpacity style={styles.buttonTest} onPress={this._handlePress.bind(this)}>
           <Text style={styles.buttonText}>Scroll</Text>
         </TouchableOpacity>
        </View> 
      )
   }
}

class PageTwo extends Component{
  constructor(props) {
    super(props);
  }
   _handlePress(){
     this.props.navigator.pop();
   }
  render(){
    return (
       <View style={styles.container} >
           <TouchableOpacity style={styles.buttonTest} onPress={this._handlePress.bind(this)}>
             <Text style={styles.buttonText}>Home</Text>
           </TouchableOpacity>
        </View> 
    )
  }
}
var firstRoute = {
  name: 'Home',
  component: HomePage
}
class Home extends Component{
  constructor(props) {
     super(props);
     this.state = {
       route: {}
     };
  }
  onDidFocus(route) {
    this.setState({ route: route });
  }
  _renderScene(route, navigator) {
    var Content = route.component;
    return (
      <View style={styles.mainContainer}>
         <Content navigator={navigator}/> 
      </View> 
    )
  }
  _configureScene(route) {
    return CustomSceneConfig;
  }
  render() {
    StatusBarIOS.setStyle(0);
    var navigationBar = <NavBar currentRoute={this.state.route} />
    return (
      <Navigator
        initialRoute={firstRoute}
        renderScene={this._renderScene}
        navigationBar={navigationBar}
        configureScene={this._configureScene} 
        onDidFocus={this.onDidFocus.bind(this)} />
    );
  }
}
AppRegistry.registerComponent('first_app', () => Home);