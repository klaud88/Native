/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import Home from './src/components/Tabs/Home';
import Store from './src/components/Tabs/Store';
import Login from './src/components/Auth/Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import Cart from './src/assets/cart.svg'
import { MMKV } from './src/Storage';
import { UserContext } from './src/userContext';
import Catalog from './src/components/Tabs/Catalog';
import { Use } from 'react-native-svg';

function App() {

  const [myStore, setMyStore] = useState([]);
  const [quantity, setQuantity] = useState(0)
  const [cart, setCart] = useState([])
  const [sumPrice, setSumPrice] = useState(0)

  const Stack = createNativeStackNavigator()

  const navigation = useNavigationContainerRef()
  const handleLogout = () => {
    MMKV.clearStore()
    navigation.navigate('Login')
  }

  useEffect(() => {
    MMKV.getString('tokenStore') && navigation.navigate('Home')
  }, [])

  return (
    <UserContext.Provider value={{
      quantity,
      setQuantity,
      myStore,
      setMyStore,
      cart,
      setCart,
      sumPrice,
      setSumPrice
    }}>
      < NavigationContainer ref={navigation}>

        <Stack.Navigator screenOptions={{ headerTitleAlign: 'center', headerStyle: { backgroundColor: '#7CB339' } }} initialRouteName='Login'>
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Home' component={Home} options={{
            headerLeft: () => (
              <TouchableOpacity style={styles.logoutButton}
                onPress={handleLogout}>
                <Text style={styles.logout}>Logout</Text></TouchableOpacity>),
            headerRight: () => (
              <TouchableOpacity style={styles.cartButton}
                onPress={() => navigation.navigate('Store')}>
                <Cart style={styles.cart} />
                <View style={styles.quantityBackground}>
                  <Text style={styles.quantity}>{quantity}</Text>
                </View>
              </TouchableOpacity>)
          }} />
          <Stack.Screen name='Store' component={Store}
            options={{
              headerRight: () => (
                <TouchableOpacity style={styles.cartButton}
                  onPress={() => navigation.navigate('Store')}>
                  <Cart style={styles.cart} />
                  <View style={styles.quantityBackground}>
                    <Text style={styles.quantity}>{quantity}</Text>
                  </View>
                </TouchableOpacity>)
            }} />
          <Stack.Screen name='Catalog' component={Catalog} />
        </Stack.Navigator>
      </NavigationContainer >
    </UserContext.Provider>
  )
}

export default App;
const styles = StyleSheet.create({
  logout: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',


  },
  logoutButton: {
    padding: 10,
    backgroundColor: '#407502',
    borderRadius: 5,
  },
  cartButton: {
    width: 50,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',

  },
  cart: {
    top: 10,
    padding: 20,
    alignSelf: 'flex-end',
    zIndex: 10
  },
  quantity: {
    fontSize: 15,
    zIndex: 999,
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  quantityBackground: {
    width: 30,
    backgroundColor: '#DC0079',
    borderRadius: 50,
    right: 10,
    top: -15,
    zIndex: 999,
  }



})