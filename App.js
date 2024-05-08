import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

// Importação do Axios que permite uma integração do seu projeto React para qualquer serviço de API disponível.
import axios from 'axios';

// Cria a const do App onde estará nosso código
const App = () => {

  // Cria nossa const cep e address definindo e estado delas, podendo alterar o mesmo conforme o usuário pedir.
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState(null);

  // Cria nossa função fetchAddress onde try procura com a ajuda do axios na API utilizada, e catch para retornar o erro que der conforme o try
  const fetchAddress = async () => {
    try {
      // Puxa o CEP colocado pelo usuário e altera o valor do setAddress
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      setAddress(response.data);
      // Retorna o erro caso aconteça
    } catch (error) {
      console.error('Error fetching address:', error);
      setAddress(null);
    }
  };

  return (
    // Cria nossa view estilizada em linha onde está nossos elementos que apareceram na tela
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* TextInput que contém o valor CEP e verifica o valor que o usúario colocar */}
      <TextInput
        placeholder="Digite o CEP"
        value={cep}
        // onChangeText que análisa todos os valores que o usuário colocar na caixa de texto e altera o valor do estado da const cep utilizando o setCep
        onChangeText={setCep}
        keyboardType="numeric"
      />

      {/* Botão que busca na função fetchAddress e chama o que tem dentro dela no caso o try com a API e o catch caso der um erro */}
      <Button title="Buscar Endereço" onPress={fetchAddress} />

      {/* Função de address que renderiza com a condição da const address, no caso, se for válido o CEP colocado e buscar na API, irá renderizar o conteúdo dentro da VIew, se nãp for válido não vai retornar nenhum resultado.  */}
      {address && (
        <View>
          <Text>CEP: {address.cep}</Text>
          <Text>Rua: {address.logradouro}</Text>
          <Text>Bairro: {address.bairro}</Text>
          <Text>Cidade: {address.localidade}</Text>
          <Text>Estado: {address.uf}</Text>
        </View>
      )}
    </View>
  );
};

export default App;