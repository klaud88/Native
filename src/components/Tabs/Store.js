import { View, Text, StyleSheet } from "react-native"
import MyCart from "../MyCart"
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler"
import { useContext, useEffect } from "react"
import { UserContext } from "../../userContext"


const Store = () => {

  const { setQuantity, cart, sumPrice, setSumPrice } = useContext(UserContext);

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
        <ScrollView>
          {cart?.map((inbox, index) => (
            <MyCart key={index}
              name={inbox.name}
              price={inbox.price}
              image={inbox.image}
              id={index}
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
  }
})