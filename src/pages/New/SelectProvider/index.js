/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';
import medina from './medina.png';
import matheus from './matheus.png';
import bianchi from './bianchi.png';
import vinicius from './vinicius.png';

import { Container, ProvidersList, Provider, Avatar, Name } from './styles';

export default function SelectProvider({ navigation }) {
  const [providers, setProviders] = useState([]);
  const servico = navigation.getParam('servico');

  useEffect(() => {
    async function loadProviders() {
      const cachedData = await AsyncStorage.getItem('@MyApp:providers');
      if (cachedData) {
        setProviders(JSON.parse(cachedData));
      }

      if (!cachedData) {
        const response = await api.get('/barbeiros');
        setProviders(response.data);
        AsyncStorage.setItem('@MyApp:providers', JSON.stringify(response.data));
      }
    }

    loadProviders();
  }, []);

  function chooseAvatarImage(providerName) {
    if (providerName === 'Gabriel Medina') {
      return medina;
    }
    if (providerName === 'Mateus') {
      return matheus;
    }
    if (providerName === 'Matheus Bianchi') {
      return bianchi;
    }
    if (providerName === 'Vinicius Sena') {
      return vinicius;
    }
    return null;
  }

  return (
    <Background>
      <Container>
        <ProvidersList
          data={providers}
          keyExtractor={provider => String(provider.id)}
          renderItem={({ item: provider }) => (
            <Provider
              onPress={() =>
                navigation.navigate('SelectDateTime', { provider, servico })
              }
            >
              <Avatar
                source={chooseAvatarImage(provider.nome)}
                resizeMode="contain"
              />
              <Name>{provider.nome}</Name>
            </Provider>
          )}
        />
      </Container>
    </Background>
  );
}

SelectProvider.navigationOptions = ({ navigation }) => ({
  title: 'Barbeiros',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('SelectService');
      }}
    >
      <Icon name="chevron-left" size={20} color="#FFF" />
    </TouchableOpacity>
  ),
});
