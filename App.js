import react from 'react';
import { View } from 'react-native';
import StartScreen from './components/StartScreen';
import MainScreen from './components/MainScreen';

export default class App extends react.Component {
  switch = () => {
    this.setState({
      currentScreen: 1
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      screens: [
        <StartScreen onSwitch={this.switch}/>,
        <MainScreen />
      ],
      currentScreen: 0,
    }
  }

  render() {
    return (
      <>{this.state.screens[this.state.currentScreen]}</>
    );
  }
}
