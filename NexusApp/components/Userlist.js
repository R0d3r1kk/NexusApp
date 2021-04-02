import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Dimensions,
  RefreshControl,
  TouchableOpacity,
  TouchableHighlight,
  View,
} from 'react-native';
import {Users} from '../helpers/Gestion';
import {SwipeListView} from 'react-native-swipe-list-view';
import {primaryColor, secondaryColor, indicatorColor} from '../Settings';

class Userlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      users: [],
      admins: [],
      superadmins: [],
      selectedItems: [],
    };
  }

  componentDidMount() {
    this.setLoading(true);
    Users().then(_users => {
      this.getSections(JSON.parse(_users));
      this.setLoading(false);
    });
  }

  setLoading = cond => this.setState({loading: cond});
  setUsers = users => this.setState({users: users});
  setAdmins = admins => this.setState({admins: admins});
  setSuperAdmins = sa => this.setState({superadmins: sa});

  getSections = users => {
    if (users === []) {
      return users;
    }
    let sa = [],
      ads = [],
      us = [];
    users.forEach((item, i) => {
      switch (item.session_id) {
        case 0:
          sa.push({
            key: item.session_id + '.' + item.user_id,
            user: item,
          });
          break;
        case 1:
          ads.push({
            key: item.session_id + '.' + item.user_id,
            user: item,
          });
          break;
        case 2:
          us.push({
            key: item.session_id + '.' + item.user_id,
            user: item,
          });
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
        <SwipeSectionList
          state={this.state}
          refreshList={this.refreshList}
          setUsers={this.setUsers}
          setAdmins={this.setAdmins}
          setSA={this.setSuperAdmins}
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
      <Text style={styles.item}>{data.item.user.name}</Text>
    </View>
  </TouchableHighlight>
);

const renderHiddenItem = (data, rowMap, state, setUsers) => (
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
      onPress={() => deleteRow(rowMap, data.item.key, state, setUsers)}>
      <Text style={styles.backTextWhite}>Eliminar</Text>
    </TouchableOpacity>
  </View>
);

const renderSectionHeader = ({section}) => (
  <Text style={styles.sectionHeader}>{section.title}</Text>
);

const SwipeSectionList = ({state, refreshList, setUsers, setAdmins, setSA}) => {
  return (
    <View style={styles.container}>
      <SwipeListView
        useSectionList={true}
        sections={[
          {title: 'Super Admins', data: state?.superadmins},
          {title: 'Admins', data: state?.admins},
          {title: 'Usuarios', data: state?.users},
        ]}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        renderHiddenItem={(rowMap, rowKey) =>
          renderHiddenItem(rowMap, rowKey, state, setUsers, setAdmins, setSA)
        }
        leftOpenValue={75}
        rightOpenValue={-150}
        previewRowKey={'0'}
        previewOpenValue={-50}
        previewOpenDelay={3000}
        onRowDidOpen={onRowDidOpen}
        keyExtractor={(item, index) => item.user.user_id}
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

const deleteRow = (rowMap, rowKey, state, setUsers, setAdmins, setSA) => {
  closeRow(rowMap, rowKey);
  var section = rowKey.split('.');
  let prevIndex = -1;
  let newData = [];
  switch (section[0]) {
    case '0':
      newData = [...state?.superadmins];
      prevIndex = state?.superadmins.findIndex(item => item.key === rowKey);
      newData.splice(prevIndex, 1);
      setSA(newData);
      break;
    case '1':
      newData = [...state?.admins];
      prevIndex = state?.admins.findIndex(item => item.key === rowKey);
      newData.splice(prevIndex, 1);
      setAdmins(newData);
      break;
    case '2':
      newData = [...state?.users];
      prevIndex = state?.users.findIndex(item => item.key === rowKey);
      newData.splice(prevIndex, 1);
      setUsers(newData);
      break;
  }
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
    paddingLeft: 20,
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

export default Userlist;
