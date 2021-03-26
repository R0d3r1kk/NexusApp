import React from 'react';
import {View, Text} from 'react-native';
import {getUser} from '../helpers/TokenHelper';
import Userlist from '../components/Userlist';

const screenStyle = {flex: 1, alignItems: 'center', justifyContent: 'center'};
class HomeScreen extends React.Component {
  state = {userdata: ''};

  componentDidMount() {
    getUser().then(data => {
      this.setState({
        userdata: data,
      });
    });
  }

  render() {
    return (
      <View style={screenStyle}>
        <Userlist />
      </View>
    );
  }
}

export default HomeScreen;
