import React from 'react';
import {
  AppRegistry,
  asset,
  StyleSheet,
  Pano,
  Text,
  View,
  Animated
} from 'react-vr';

class Box extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bounceValue: new Animated.Value(0)
		}
	}
	render() {
		return(
			<Animated.Image
				source={{uri: 'http://charlesgilchrist.com/SGEO/Square/StaticSquare-B.jpg'}}
				style={{
					flex: 1,
					width: 1,
					height: 1,
					transform: [{scale: this.state.bounceValue}]
				}}
				/>
			)
	}
	
	componentDidMount() {
		this.state.bounceValue.setValue(1.5);
		Animated.spring(
			this.state.bounceValue,
			{
				toValue:0.8,
				friction:1,
			}
		).start();
	}
}

module.exports = Box;