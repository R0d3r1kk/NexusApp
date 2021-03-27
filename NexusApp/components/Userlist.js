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
            return <Text style={styles.item}>{item.name}</Text>;
          }}
          renderSectionHeader={({section}) => {
            return <Text style={styles.sectionHeader}>{section.title}</Text>;
          }}
          keyExtractor={(item, index) => item.user_id}
          enableEmptySections={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.loading}
              onRefresh={this.refreshList}
            />
          }
          indicatorStyle={'black'}
          nestedScrollEnabled={true}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: 'transparent',
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 5,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  item: {
    flex: 1,
    padding: 10,
    paddingLeft: 10,
    fontSize: 18,
    height: 44,
    width: Dimensions.get('window').width,
  },
});

export default Userlist;
