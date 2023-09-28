import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import Item from './src/Item';

const App = () => {
  const [lista, setLista] = useState([]);
  const [input, setInput] = useState('');
  const url = 'https://b7web.com.br/todo/92306';

  useEffect(() => {
    loadLista();
  }, []);

  const loadLista = () => {
    fetch(url)
      .then((r) => r.json())
      .then((json) => {
        setLista(json.todo);
      });
  };

  const addButton = () => {
    const texto = input;
    setInput('');

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        item: texto,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        loadLista();
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tarefas agendadas</Text>
      <View style={styles.addArea}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setInput(text)}
          value={input}
        />
        <View style={styles.button}>
          <Button title="Adicionar" color='#4b345f' onPress={addButton}  />
        </View>
      </View>
      <FlatList
        data={lista}
        renderItem={({ item }) => <Item data={item} url={url} loadFunction={loadLista} />}
        keyExtractor={(item, index) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#282a36',
  },
  title:{
    color:'#FFF',
    fontSize:24,
    alignSelf:'center',
    padding:14
  },
  addArea: {
    padding:10,
    justifyContent:'space-around',
    alignItems:'stretch',
    backgroundColor:'#1b1b1d',
    height:140
  },
  input: {
    height:40,
    backgroundColor:'#FFF',
    padding:8,
    borderRadius:5,
    margin:10,
    fontSize:16
  },
  button:{
    margin:10,
  }
  
});

export default App;