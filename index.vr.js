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
    this.state = {
      positionAdd: 0,
      levelMultiplier: 1,
      rotate: 0,
      enemies: [],
      crazy: false,
      timer: 0,
    };
    this.lastUpdate = Date.now();
    this.enterUpdate = null;
    this.rotateUpdate = Date.now();
    this.move = this.move.bind(this);
    this.rotate = this.rotate.bind(this);
    this.createEnemies = this.createEnemies.bind(this);
    this.deleteEnemies = this.deleteEnemies.bind(this);
    this.kill = this.kill.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.increaseLevel = this.increaseLevel.bind(this);
    this.decreaseLevel = this.decreaseLevel.bind(this);
  }

   createEnemies() {
    let numOfEnemies = 10* (this.state.levelMultiplier / 2)
    console.log(numOfEnemies)
    let enemiesArr = []
    for (var i = 0; i < numOfEnemies; i++) {
      let x = (Math.random() < 0.5) ? (Math.floor(Math.random()*10)) : Math.floor(Math.random()*-10);
      let y = (Math.random() < 0.5) ? (Math.floor(Math.random()*5)) : Math.floor(Math.random()*-5);
      let z = Math.floor(Math.random()* -200) - 100
      // let z = Math.floor(Math.random()*1) - 10 //THIS LINE FOR TESTING DESTRUCTION OF ELEMENTS, USE ABOVE LET Z FOR GAME TESTING
      enemiesArr.push([x,y,z])
    }
    this.setState({enemies: enemiesArr})
    this.move()
  }

  deleteEnemies() {
    this.setState({enemies: []})
  }

  move() {
    const now = Date.now();
    const change = now - this.lastUpdate;
    // this.lastUpdate = now;

    this.setState({positionAdd: this.state.positionAdd + change/200});
    this.frameHandleMove = requestAnimationFrame(this.move);
  }

  rotate() {
    if (this.state.rotate === 180) this.setState({rotate: 0})
    this.setState({rotate: this.state.rotate + 20});
    this.frameHandleRotate = requestAnimationFrame(this.rotate)
  }

  crayRotate() {
    const now = Date.now();
    const change = now - this.rotateUpdate
    this.rotateUpdate = now;
    // change divisor is speed constant
    this.setState({rotate: this.state.rotate + change});
    this.frameHandleRotate = requestAnimationFrame(this.crayRotate)
  }

  kill(id) {
    console.log('IN KILL FUNC')
    const entered = Date.now()
    if (!this.enterUpdate) this.enterUpdate = Date.now();
    const change = entered - this.enterUpdate;
    // console.log(document.getElementById(id))
    this.frameHandleKill = requestAnimationFrame(this.kill(id))
    // if (change > 200) React.unmountComponentAtNode(document.getElementById(id))
  }

  resetTimer() {
    console.log('IN RESET TIMER')
    this.setState({timer: 0})
  }

  increaseLevel() {
    this.setState({levelMultiplier: this.state.levelMultiplier+1})
  }
  
  decreaseLevel() {
    if (this.state.levelMultiplier === 1) return;
    else this.setState({levelMultiplier: this.state.levelMultiplier-1})
  }


  componentDidMount() {
 
  }

  componentWillUnmount() {
    if (this.frameHandleMove) {
      cancelAnimationFrame(this.frameHandleMove);
      this.frameHandleMove = null;
    }
    if (this.frameHandleRotate) {
      cancelAnimationFrame(this.frameHandleRotate);
      this.frameHandleRotate = null;
    }
    if (this.frameHandleKill) {
      cancelAnimationFrame(this.frameHandleKill);
      this.frameHandleKill = null;
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
        {
          this.state.enemies.map((coords) =>  
            { 
              // console.log(coords)
              let id = this.state.enemies.indexOf(coords)
              let craziness;
              // for nuts rotation around x-axis, need to make button to toggle the crayRotate func
              if (this.state.crazy) 
                craziness = this.state.rotate;
              else craziness = 0;
              return (
                <Mesh  key={id} id={id} style={{
                  transform: [
                    {translate: [...coords]},
                    {scale: 1},
                    {rotateY: 180},
                    {rotateX: craziness},
                    {translateZ: -this.state.positionAdd/20}
                    ]
                  }}
                  source={{mesh:asset('Crate/Crate1.obj'), texture:asset('Crate/crate_1.jpg')}}
                  // onMouseEnter={() => { this.kill(id) }}
                  onGazeExit={() => { console.log('EXITTED GAZE') }}
                />
              
            )})
        }
        
   

        <PointLight style={{color:'white', transform:[{translate:[0,40,700]}]}} />
        <View>
          <VrButton>
            <Text style={{
              fontSize: 1,
              // paddingTop: 0.025,
              // paddingBottom: 0.025,
              // paddingLeft: 0.05,
              // paddingRight: 0.15,
              textAlign:'center',
              textAlignVertical:'center',
              transform: [
                {translate: [-1.5,-3,0.2]},
                {rotateX: -75}
              ]
            }}
            onEnter={()=> {this.createEnemies()}}
            >
            START
            </Text>
          </VrButton>

          <VrButton>
            <Text style={{
              fontSize: 1,
              // paddingTop: 0.025,
              // paddingBottom: 0.025,
              // paddingLeft: 0.05,
              // paddingRight: 0.15,
              textAlign:'center',
              textAlignVertical:'center',
              transform: [
                {translate: [1.5,-2,0]},
                {rotateX: -75}
              ]
            }}
            onEnter={()=> {this.deleteEnemies()}}
            >
            STOP
            </Text>
          </VrButton>
        </View>
        
        <Text style={{
          fontSize: 0.8,
          paddingTop: 0.025,
          paddingBottom: 0.025,
          paddingLeft: 0.05,
          paddingRight: 0.05,
          textAlign:'center',
          textAlignVertical:'center',
          transform: [
            {translate: [0,-3,-.1]},
            {rotateX: -75}
          ]
        }}>
        LEVEL: {this.state.levelMultiplier}      
        </Text>
        
        <VrButton>
          <Text style={{
            fontSize: 1,
            // paddingTop: 0.025,
            // paddingBottom: 0.025,
            // paddingLeft: 0.05,
            // paddingRight: 0.15,
            textAlign:'center',
            textAlignVertical:'center',
            transform: [
              {translate: [-1,-3,0.2]},
              {rotateX: -75}
            ]
          }}
          onEnter={()=> {this.increaseLevel()}}
          >
          +
          </Text>
        </VrButton>
        
        <VrButton>
          <Text style={{
            fontSize: 1,
            // paddingTop: 0.025,
            // paddingBottom: 0.025,
            // paddingLeft: 0.05,
            // paddingRight: 0.15,
            textAlign:'center',
            textAlignVertical:'center',
            transform: [
              {translate: [1,-2.15,0]},
              {rotateX: -75}
            ]
          }}
          onEnter={()=> {this.decreaseLevel()}}
          >
          -
          </Text>
        </VrButton>

      </View>
    );
  }
};

AppRegistry.registerComponent('vrGame', () => vrGame);
