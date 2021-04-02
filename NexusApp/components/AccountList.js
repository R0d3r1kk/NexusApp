import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Dimensions,
  RefreshControl,
  Alert,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from 'react-native';
import {Accounts} from '../helpers/Gestion';
import {SwipeListView} from 'react-native-swipe-list-view';
import {primaryColor, secondaryColor, indicatorColor} from '../Settings';

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
      let acc = [];
      JSON.parse(_acc).forEach((item, i) => {
        acc.push({
          key: item.account_id,
          acc: item,
        });
      });
      this.handleResult(acc);
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
    let acc = [];
    JSON.parse(_accs).forEach((item, i) => {
      acc.push({
        key: item.account_id,
        acc: item,
      });
    });
    this.handleResult(acc);
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <SwipeSectionList
          state={this.state}
          refreshList={this.refreshList}
          setAccounts={this.setAccounts}
        />
      </SafeAreaView>
    );
  }
}

const renderItem = data => (
  <TouchableHighlight
    onPress={() => console.log('You touched me')}
    style={styles.rowFront}
    underlayColor={'#AAA'}>
    <View>
      <Text style={styles.item}>{data.item.acc.account_name}</Text>
    </View>
  </TouchableHighlight>
);

const renderHiddenItem = (data, rowMap, state, setACC) => (
  <View style={styles.rowBack}>
    <TouchableOpacity
      style={[styles.backLeftBtnLeft, styles.backRightBtn]}
      onPress={() => console.log('edit')}>
      <Text style={styles.backTextWhite}>Editar</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.backRightBtn, styles.backRightBtnLeft]}
      onPress={() => closeRow(rowMap, data.item.key)}>
      <Text style={styles.backTextWhite}>Cerrar</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.backRightBtn, styles.backRightBtnRight]}
      onPress={() => deleteRow(rowMap, data.item.key, state, setACC)}>
      <Text style={styles.backTextWhite}>Eliminar</Text>
    </TouchableOpacity>
  </View>
);

const renderSectionHeader = ({section}) => (
  <Text style={styles.sectionHeader}>{section.title}</Text>
);

const SwipeSectionList = ({state, refreshList, setAccounts}) => {
  return (
    <View style={styles.container}>
      <SwipeListView
        useSectionList={true}
        sections={[{title: 'Cuentas', data: state?.accounts}]}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        renderHiddenItem={(rowMap, rowKey) =>
          renderHiddenItem(rowMap, rowKey, state, setAccounts)
        }
        leftOpenValue={75}
        rightOpenValue={-150}
        previewRowKey={'0'}
        previewOpenValue={-50}
        previewOpenDelay={3000}
        onRowDidOpen={onRowDidOpen}
        keyExtractor={(item, index) => item.acc.account_id}
        enableEmptySections={false}
        refreshControl={
          <RefreshControl refreshing={state.loading} onRefresh={refreshList} />
        }
        indicatorStyle={'black'}
      />
    </View>
  );
};

const closeRow = (rowMap, rowKey) => {
  if (rowMap[rowKey]) {
    rowMap[rowKey].closeRow();
  }
};

const deleteRow = (rowMap, rowKey, state, setAccounts) => {
  closeRow(rowMap, rowKey);
  let newData = [...state?.accounts];
  let prevIndex = state?.accounts.findIndex(item => item.key === rowKey);
  newData.splice(prevIndex, 1);
  setAccounts(newData);
};

const onRowDidOpen = rowKey => {
  console.log('This row opened', rowKey);
};

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
    paddingLeft: 30,
    fontSize: 18,
    height: 44,
    width: Dimensions.get('window').width,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: secondaryColor,
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: indicatorColor,
    right: 0,
  },
  backLeftBtnLeft: {
    backgroundColor: 'green',
    left: 0,
  },
});

export default AccountList;
