import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  flex: 1;
  margin-top: 30px;
`;

export const ServicesList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: true,
})`
  margin-top: 70px;
  padding: 0 20px;
`;

export const Service = styled(RectButton)`
  background: #fff;
  border-radius: 4px;
  padding: 10px;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 10px;
`;

export const InfoContainer = styled.View`
  flex: 1;
  min-height: 50px;
  max-height: 100px;
`;

export const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const Name = styled.Text`
  margin-top: 15px;
  font-size: 14px;
  font-weight: bold;
  color: #333;
  text-align: right;
`;
export const Value = styled.Text`
  font-size: 14px;
  color: #333;
  text-align: right;
`;

export const Time = styled.Text`
  font-size: 14px;
  color: #333;
  text-align: right;
`;
