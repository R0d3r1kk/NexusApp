import React from 'react';
import {View, StyleSheet} from 'react-native';
import {getUser} from '../helpers/TokenHelper';
import Userlist from '../components/Userlist';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userdata: {},
    };
  }

  componentDidMount() {
    getUser(this.props.navigation).then(data => {
      this.setState({
        userdata: data,
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Userlist />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});

export default HomeScreen;
