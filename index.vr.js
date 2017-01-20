import React from 'react';
import {
  AppRegistry,
  asset,
  StyleSheet,
  Pano,
  Text,
  View,
  VrButton,
  NativeModules,
  Mesh,
  PointLight
} from 'react-vr';
 
class vrGame extends React.Component {
  constructor() {
    super();
    this.state = {positionAdd: 0};
    this.lastUpdate = Date.now();
    this.move = this.move.bind(this);
  }

  move() {
    const now = Date.now();
    const change = now - this.lastUpdate;
    this.lastUpdate = now;

    this.setState({positionAdd: this.state.positionAdd + change/20});
    this.frameHandle = requestAnimationFrame(this.move);
  }

  componentDidMount() {
    this.move();
  }

  componentWillUnmount() {
    if (this.frameHandle) {
      cancelAnimationFrame(this.frameHandle);
      this.frameHandle = null;
    }
  }

  render() {
    return (
      <View
        style={{
          transform: [{translate: [0,0,-3]}],
          layoutOrigin: [0.5,0,0],
          alignItems: 'center',
        }}> 
        <Pano source={asset('chess-world.jpg')}/>
        {/*<Mesh 
          style={{
            transform: [
              {translate: [0, -3, -200]},
              {scale: 1},
              {rotateY: 180},
              {translateZ: -this.state.positionAdd/4}
              ]
            }}
          source={{mesh:asset('M4A1/M4A1.obj'), texture:asset('M4A1/M4A1 render.jpeg')}}
          />*/}
          <Mesh 
          style={{
            transform: [
              {translate: [-10, -3, -20]},
              {scale: 0.5},
              {rotateY: this.state.positionAdd}
              ]
            }}
          source={{mesh:asset('M4A1/M4A1.obj'), texture:asset('M4A1/M4A1 render.jpeg')}}
          />
          <Mesh 
          style={{
            transform: [
              {translate: [10, -3, -20]},
              {scale: 0.5},
              {rotateY: this.state.positionAdd}
              ]
            }}
          source={{mesh:asset('M4A1/M4A1.obj'), texture:asset('M4A1/M4A1 render.jpeg')}}
          />

        <PointLight style={{color:'white', transform:[{translate:[0,40,700]}]}} />
        <Text style={{
          fontSize: 0.015,
          paddingTop: 0.025,
          paddingBottom: 0.025,
          paddingLeft: 0.05,
          paddingRight: 0.05,
          textAlign:'center',
          textAlignVertical:'center',
        }}>
        send nudes      
        </Text>
      </View>
    );
  }
};

AppRegistry.registerComponent('vrGame', () => vrGame);
