/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useMemo } from 'react';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import api from '~/services/api';
import medina from './medina.png';
import matheus from './matheus.png';
import bianchi from './bianchi.png';
import vinicius from './vinicius.png';
import Background from '~/components/Background';

import { Container, Avatar, Name, Time, SubmitButton } from './styles';

export default function Confirm({ navigation }) {
  const provider = navigation.getParam('provider');
  const time = navigation.getParam('time');
  const servico = navigation.getParam('servico');
  const profile = useSelector(state => state.user.profile);

  const dateFormatted = useMemo(
    () => formatRelative(parseISO(time), new Date(), { locale: pt }),
    [time]
  );

  async function handleAddAppointment() {
    await api.post('/agendamento', {
      cliente: profile.id,
      funcionario: provider.id,
      servico: servico.id,
      data: time.split('T')[0],
      hora: time.slice(11, 19),
    });

    navigation.navigate('Dashboard');
  }

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
        <Avatar
          source={chooseAvatarImage(provider.nome)}
          resizeMode="contain"
        />
        <Name>{provider.nome}</Name>
        <Name>{servico.nome}</Name>
        <Time>{dateFormatted}</Time>

        <SubmitButton onPress={() => handleAddAppointment()}>
          Confirmar agendamento
        </SubmitButton>
      </Container>
    </Background>
  );
}

Confirm.navigationOptions = ({ navigation }) => ({
  title: 'Confirmar agendamento',
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name="chevron-left" size={20} color="#FFF" />
    </TouchableOpacity>
  ),
});
