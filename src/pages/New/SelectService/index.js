/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import corte from './corte.png';
import api from '~/services/api';

import Background from '~/components/Background';

import {
  Container,
  ServicesList,
  Service,
  InfoContainer,
  Avatar,
  Name,
  Value,
  Time,
} from './styles';

export default function SelectService({ navigation }) {
  const [servicos, setServicos] = useState([]);

  useEffect(() => {
    async function loadServices() {
      const cachedData = await AsyncStorage.getItem('@MyApp:services');
      if (cachedData) {
        setServicos(JSON.parse(cachedData));
      }

      if (!cachedData) {
        const response = await api.get('/servicos');
        setServicos(response.data);
        AsyncStorage.setItem('@MyApp:services', JSON.stringify(response.data));
      }
    }

    loadServices();
  }, []);

  return (
    <Background>
      <Container>
        <ServicesList
          data={servicos}
          keyExtractor={servico => String(servico.id)}
          renderItem={({ item: servico }) => (
            <Service
              onPress={() => navigation.navigate('SelectProvider', { servico })}
            >
              <Avatar
                source={corte}
                style={{
                  width: 65,
                  height: 65,
                  borderRadius: 50,
                }}
                resizeMode="cover"
              />
              <InfoContainer>
                <Name>{servico.nome}</Name>
                <Value>R$ {servico.valor.toString().replace('.', ',')}</Value>
                <Time>Aprox. {servico.tempo} min</Time>
              </InfoContainer>
            </Service>
          )}
        />
      </Container>
    </Background>
  );
}

SelectService.navigationOptions = ({ navigation }) => ({
  title: 'Serviço',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Dashboard');
      }}
    >
      <Icon name="chevron-left" size={20} color="#FFF" />
    </TouchableOpacity>
  ),
});
