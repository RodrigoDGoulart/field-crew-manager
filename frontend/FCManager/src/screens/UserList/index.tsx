import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

import Header from '../../components/Header/Index';
import InputText from '../../components/InputText';
import Btn from '../../components/Button';
import Navbar from '../../components/Navbar';
import UserItem from '../../components/UserItem';
import LoadingUserList from '../../components/LoadingUserList';

import colors from '../../styles/variables';

import {UsuarioItem} from '../../types';

import Usuario from '../../services/Usuario';
import useContexto from '../../hooks/useContexto';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');

function UserList({navigation}: any) {
  const {queue, conected} = useContexto();

  const [loadingList, setLoadingList] = useState(false);

  const [name, setName] = useState('');
  const [lista, setLista] = useState<UsuarioItem[]>([]);

  const [cantOpenModal, setCantOpenModal] = useState(false);

  const openUserForm = () => {
    navigation.navigate('UserForm');
  };

  const openItem = (serie: string) => {
    if (conected) {
      navigation.navigate('UserProfile', {id: serie});
    } else {
      setCantOpenModal(true);
    }
  };

  const cancelFilter = () => {
    setName('');
    getUsuarios();
  };

  const filtrarNome = (titulo: string) => {
    const regex = new RegExp(name, 'i');
    return regex.test(titulo);
  };

  const downloadUsuarios = async () => {
    try {
      const users = await Usuario.getAll();
      await AsyncStorage.setItem('users', JSON.stringify(users.values));
    } catch (e) {
      console.log(e);
    }
  };

  const getUsuarios = async () => {
    setLoadingList(true);
    if (conected) {
      await Usuario.getAll().then(res => {
        const users = res.values.filter(user =>
          filtrarNome(`${user.nome} ${user.sobrenome}`),
        );
        setLista(users);
      });
    } else {
      try {
        const usersJSON = await AsyncStorage.getItem('users');
        const users: UsuarioItem[] = usersJSON ? JSON.parse(usersJSON) : [];

        setLista(
          users.filter(user => filtrarNome(`${user.nome} ${user.sobrenome}`)),
        );
      } catch (e) {
        console.log(e);
      }
    }
    setLoadingList(false);
  };

  useEffect(() => {
    const onFocus = navigation.addListener('focus', () => {
      cancelFilter();
      getUsuarios();
    });

    if (conected) {
      downloadUsuarios();
    }
    getUsuarios();

    return onFocus;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, navigation, conected]);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header text="Usuários" />
        <View style={styles.content}>
          <View style={styles.searchView}>
            <InputText
              placeholder="Pesquisar por nome"
              style={styles.searchInput}
              color="white"
              onChange={e => setName(e.nativeEvent.text)}
              value={name}
            />
          </View>
          <Btn
            onPress={() => openUserForm()}
            styleType="filled"
            title="Adicionar novo usuário"
          />
          {loadingList ? (
            <LoadingUserList />
          ) : (
            <FlatList
              style={styles.equipsList}
              data={lista}
              renderItem={({item}) => (
                <View style={styles.item}>
                  <UserItem
                    user={{
                      foto: item.foto,
                      inscricao: item.matricula,
                      nome: item.nome,
                      sobrenome: item.sobrenome,
                    }}
                    onPress={() => openItem(item.id)}
                  />
                </View>
              )}
              keyExtractor={item => item.id}
            />
          )}
        </View>
        <Navbar selected="Usuários" navigation={navigation} />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white_3,
    width,
    height,
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    paddingTop: 12,
    paddingHorizontal: 13,
    gap: 12,
  },
  searchView: {
    flexDirection: 'row',
    gap: 12,
  },
  searchInput: {
    flex: 1,
  },
  item: {
    marginBottom: 12,
  },
  equipsList: {
    flex: 1,
  },
});

export default UserList;
