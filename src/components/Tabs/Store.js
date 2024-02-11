import { View, Text, StyleSheet } from "react-native"
import MyCart from "./MyCart"
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler"
import { useContext, useEffect } from "react"
import { UserContext } from "../useContext/userContext"

const Store = () => {

  const { setQuantity, cart, sumPrice, setSumPrice, user } = useContext(UserContext);

  useEffect(() => {
    setQuantity(cart.length);
    const totalPrice = cart?.reduce((a, b) => {
      return +a + +b.price;
    }, 0);
    setSumPrice(totalPrice)
  }, [cart])

  return (
    <View>
      <GestureHandlerRootView>
        <View style={styles.userContainer}>
          <Text style={styles.userText}>{user}</Text>
        </View>
        <ScrollView>
          {cart?.map((inbox, index) => (
            <MyCart key={index}
              name={inbox.name}
              price={inbox.price}
              image={inbox.image}
              id={index}
              id2={inbox}
            />
          )
          )}
          <View style={styles.sumBox}>
            <Text style={styles.sumPrice}>{sumPrice} &#8382;</Text>
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </View>
  )
}

export default Store

const styles = StyleSheet.create({
  sumBox: {
    width: '100%',
    height: 50,
    backgroundColor: '#7CB339',
    marginTop: 5,
  },
  sumPrice: {
    display: 'flex',
    color: 'white',
    textAlign: 'right',
    padding: 10,
    fontSize: 20,
    fontWeight: '800',
  },
  userContainer: {
    width: '100%',
    height: 'auto',
    backgroundColor: '#7CB339',
    margin: 0,
    alignItems: 'flex-end'
  },
  userText: {
    fontWeight: '700',
    color: '#F6F5EC',
    margin: 5,
  }
})