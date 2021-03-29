import React from 'react';
import {
  SectionList,
  StyleSheet,
  Text,
  SafeAreaView,
  Dimensions,
  RefreshControl,
  Alert,
} from 'react-native';
import {Accounts} from '../helpers/Gestion';

class AccountList extends React.Component {
  state = {
    loading: false,
    error: null,
    accounts: [],
    selectedItems: [],
  };

  componentDidMount() {
    this.setLoading(true);
    Accounts().then(_acc => {
      this.handleResult(JSON.parse(_acc));
    });
  }

  handleResult = _acc => {
    if (_acc.error) {
      this.setLoading(false);
      Alert.alert('Upss', _acc.error);
    } else {
      this.setAccounts(_acc);
      this.setLoading(false);
    }

    return _acc;
  };

  setLoading = cond => this.setState({loading: cond});
  setAccounts = _accs => this.setState({accounts: _accs});

  refreshList = async () => {
    this.setLoading(true);
    let _accs = await Accounts();
    this.handleResult(JSON.parse(_accs));
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <SectionList
          contentContainerStyle={styles.list}
          sections={[{title: 'Cuentas', data: this.state.accounts}]}
          renderItem={({item}) => {
            return <Text style={styles.item}>{item.account_name}</Text>;
          }}
          renderSectionHeader={({section}) => {
            return <Text style={styles.sectionHeader}>{section.title}</Text>;
          }}
          keyExtractor={(item, index) => item.account_id}
          enableEmptySections={true}
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

export default AccountList;
