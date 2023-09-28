import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function Item({ data, url, loadFunction }) {
  const [done, setDone] = useState(false);
  const [marcarStyle, setMarcarStyle] = useState();

  const excluir = () => {
    fetch(url + '/' + data.id, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((json) => {
        alert("Item excluído com sucesso!");
        loadFunction();
      });
  }

  const marcar = () => {
    setDone(!done);
    const testeDone = done ? 'nao' : 'sim';
    fetch(url + '/' + data.id, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        done: testeDone,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        // Handle the response if needed
      });
    
  };

  useEffect(() => {
    if (data.done == 0 && !done) {
      setMarcarStyle(styles.undone);
    } else {
      setMarcarStyle(styles.done);
    }
  }, [done, data.done]);

  
  return (
    <View style={styles.areaItem}>
      <Pressable style={[styles.marcarArea, marcarStyle]} onPress={marcar}>
        <View></View>
      </Pressable>
      <Text style={styles.textItem}>{data.item}</Text>
      <Pressable style={styles.delArea} onPress={excluir}>
        <Text style={styles.delText}>X</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  areaItem: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#534b67',
    alignItems:'center'
  },
  textItem: {
    color: '#FFF',
    fontSize: 18,
    padding: 14,
  },
  marcarArea: {
    height: 28,
    width: 28,
    borderRadius:5
  },
  undone: {
    backgroundColor: '#534b67',
  },
  done: {
    backgroundColor: '#c86d98',
  },
  delArea:{
    flex:1,
    alignItems:'end',
    justifyContent:'end',
    padding:14
  },
  delText:{
    fontSize:18,
  }
});
