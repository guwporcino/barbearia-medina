/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~services/api';

import Background from '~/components/Background';
import DateInput from '~/components/DateInput';

import { Container, HourList, Hour, Title } from './styles';

export default function SelectDateTime({ navigation }) {
  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState([]);
  const [noAvailableHours, setNoAvailableHours] = useState(false);

  const provider = navigation.getParam('provider');
  const servico = navigation.getParam('servico');

  useEffect(() => {
    async function loadAvailable() {
      try {
        const response = await api.post('/horarios', {
          funcionario: provider.id,
          data: date.toISOString().split('T')[0],
          hora: date.toISOString().slice(11, 19),
        });

        setHours(response.data);
        setNoAvailableHours(false);
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setHours([]);
          setNoAvailableHours(true);
        }
      }
    }

    loadAvailable();
  }, [date, provider.id]);

  function handleSelectHour(time) {
    navigation.navigate('Confirm', {
      provider,
      servico,
      time,
    });
  }

  return (
    <Background>
      <Container>
        <DateInput date={date} onChange={setDate} />
        {/* ... */}
        {noAvailableHours && (
          <Title>         Não há horários disponíveis para o dia selecionado.</Title>
        )}
        {/* ... */}
        {!noAvailableHours && hours && (
          <HourList
            data={hours}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Hour
                onPress={() =>
                  handleSelectHour(
                    `${date.toISOString().split('T')[0]}T${item.hora}`
                  )
                }
                enabled={item.disponivel}
              >
                <Title>{item.hora}</Title>
              </Hour>
            )}
          />
        )}
      </Container>
    </Background>
  );
}

SelectDateTime.navigationOptions = ({ navigation }) => ({
  title: 'Selecione o horário',
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
