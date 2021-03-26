import React from 'react';
import {
  SectionList,
  StyleSheet,
  Text,
  SafeAreaView,
  Dimensions,
  RefreshControl,
} from 'react-native';
import {Users} from '../helpers/Gestion';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    flex: 1,
    padding: 10,
    fontSize: 18,
    height: 44,
    width: Dimensions.get('window').width,
  },
});

class Userlist extends React.Component {
  state = {
    loading: false,
    error: null,
    users: [],
    admins: [],
    superadmins: [],
    selectedItems: [],
  };

  componentDidMount() {
    this.setLoading(true);
    Users().then(_users => {
      this.getSections(JSON.parse(_users));
      this.setLoading(false);
    });
  }

  setLoading = cond => this.setState({loading: cond});
  setUsers = users => this.setState({users: users});

  getSections = users => {
    if (users === []) {
      return users;
    }
    let sa = [],
      ads = [],
      us = [];
    users.forEach(item => {
      switch (item.session_id) {
        case 0:
          sa.push(item);
          break;
        case 1:
          ads.push(item);
          break;
        case 2:
          us.push(item);
          break;
      }
    });

    this.setState({
      superadmins: sa,
      admins: ads,
      users: us,
    });
  };

  refreshList = async () => {
    this.setLoading(true);
    const _users = await Users();
    this.getSections(JSON.parse(_users));
    this.setLoading(false);
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <SectionList
          contentContainerStyle={styles.list}
          sections={[
            {title: 'Super Admins', data: this.state.superadmins},
            {title: 'Admins', data: this.state.admins},
            {title: 'Usuarios', data: this.state.users},
          ]}
          renderItem={({item}) => {
            console.log(item);
            return <Text style={styles.item}>{item.name}</Text>;
          }}
          renderSectionHeader={({section}) => {
            return <Text style={styles.sectionHeader}>{section.title}</Text>;
          }}
          keyExtractor={(item, index) => item.user_id}
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              onRefresh={this.refreshList}
            />
          }
        />
      </SafeAreaView>
    );
  }
}

export default Userlist;
