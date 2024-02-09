import { useContext, useEffect, useState } from "react"
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native"
import { UserContext } from "../../userContext"
import { MMKV } from "../../Storage"

const Catalog = (props) => {

    const { cart, setCart } = useContext(UserContext)
    const handleAdd = () => {
        setCart(prevItem => [...prevItem, {
            name: props.name,
            price: props.price,
            image: props.image,
            id: props.index
        }])
        MMKV.setArray('store', cart)
    }
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: `${props.image}` }} />
            <Text style={styles.price}>{props.price} &#8382;</Text>
            <Text style={styles.name}>{props.name}</Text>
            <View style={styles.addButton}>
                <TouchableOpacity style={styles.button}
                    onPress={handleAdd}>
                    <Text style={styles.add}>ADD</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '48%',
        height: 'auto',
        marginTop: 4,
        marginLeft: 2,
        marginRight: 2,
        padding: 15,
        backgroundColor: '#B4D0A2',
    },
    image: {
        width: 120,
        height: 140,
        borderRadius: 20,
        alignSelf: 'center'
    },
    name: {
        paddingTop: 5,
        fontSize: 10,
        width: '100%',
        height: 80,
        textAlign: 'justify',
        color: 'black',
        fontWeight: '500',
        fontSize: 15,
    },
    price: {
        paddingTop: 5,
        fontWeight: '500',
        fontSize: 15,
        color: 'black',
        alignSelf: 'flex-end'
    },
    addButton: {
        alignItems: 'center',
    },
    button: {
        justifyContent: 'flex-end',
        borderRadius: 10,
        borderStyle: 'solid',
        backgroundColor: '#7CB339',
        width: 60,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    add: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    }

})
export default Catalog

