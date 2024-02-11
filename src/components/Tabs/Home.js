import axios from "axios"
import { View, StyleSheet, Text } from "react-native"
import { useContext, useEffect, useState } from "react";
import Catalog from "./Catalog";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { UserContext } from "../useContext/userContext";

const Home = () => {

  const { user } = useContext(UserContext);

  const { setQuantity, cart } = useContext(UserContext)
  const [catalog, setCatalog] = useState([])

  useEffect(() => {
    setQuantity(cart.length)
  }, [cart])

  useEffect(() => {
    axios.get('https://api.vendoo.ge/api/beta/catalog?url=sasmelebi2kvb%2Falkoholi&sort=popular&sortDir=desc&page=1&limit=20')
      .then((response) => {
        setCatalog(response.data?.products)
      })
  }, [])
  return (
    <GestureHandlerRootView>
      <View style={styles.userContainer}>
        <Text style={styles.userText}>{user}</Text>
      </View>
      <ScrollView>
        <View style={styles.cont}>
          {catalog?.map((data, index) => (

            <Catalog key={index}
              name={data.name}
              price={data.final_price}
              image={data.thumb_img.files.file}
            />
          )
          )}
        </View>
      </ScrollView>

    </GestureHandlerRootView>
  )
}
export default Home

const styles = StyleSheet.create({
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
  },
  cont: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  addButton: {
    alignItems: 'flex-end',
    marginRight: 20,
  },
  button: {
    justifyContent: 'flex-end',
    borderRadius: 10,
    borderStyle: 'solid',
    backgroundColor: '#7CB339',
    padding: 5,
    width: 80,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 5,
  },
  add: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  }

})