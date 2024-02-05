import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  useAddTodoMutation,
  useGetTodoQuery,
  useRemoveTodoMutation,
} from '../api/api';
import {AddTodo, RemoveTodo} from '../model/todoModel';

const Home = () => {
  const {data, error, isLoading} = useGetTodoQuery();
  const [addTodo, {data: addTodoData, isLoading: addTodoLoading}] =
    useAddTodoMutation();
  const [removeTodo, {data: deleteTodo, isLoading: removeTodoLoading}] =
    useRemoveTodoMutation();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  console.log(data, 'DATA');
  console.log(addTodoData, 'ADD DATA');

  if (isLoading) {
    return <ActivityIndicator />;
  }

  const onSubmit = () => {
    const userData: AddTodo = {name, age};
    addTodo(userData);
  };

  const _deleteTodo = id => {
    const userId: RemoveTodo = id;
    removeTodo(userId);
  };

  return (
    <View style={{margin: 15}}>
      <FlatList
        data={data}
        keyExtractor={item => item?._id}
        renderItem={({item}) => (
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              marginVertical: 2,
              paddingVertical: 10,
              paddingHorizontal: 5,
              backgroundColor: 'pink',
              borderRadius: 5,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{color: '#222222'}}>
              {data?.length === 0 ? 'No Data Found' : item?.name}
            </Text>
            <TouchableOpacity
              onPress={() => _deleteTodo(item?._id)}
              activeOpacity={0.7}
              style={{
                backgroundColor: 'purple',
                borderRadius: 5,
              }}>
              <Text
                style={{
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  color: '#FFFFFF',
                }}>
                Delete
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
      <TextInput
        value={name}
        onChangeText={value => setName(value)}
        placeholder="Enter name"
        style={{
          marginTop: 15,
          padding: 5,
          borderWidth: 1,
          borderColor: '#222222',
          borderRadius: 5,
        }}
      />
      <TextInput
        value={age}
        onChangeText={value => setAge(value)}
        placeholder="Enter age"
        style={{
          marginTop: 10,
          padding: 5,
          borderWidth: 1,
          borderColor: '#222222',
          borderRadius: 5,
        }}
      />
      <TouchableOpacity
        onPress={onSubmit}
        activeOpacity={0.7}
        style={{
          marginTop: 15,
          alignItems: 'center',
          borderRadius: 5,
          backgroundColor: 'purple',
        }}>
        <Text
          style={{
            padding: 12,
            color: '#FFFFFF',
          }}>
          {addTodoLoading ? <ActivityIndicator color="#FFFFFF" /> : 'Add Todo'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
