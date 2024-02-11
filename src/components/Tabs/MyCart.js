import { useContext } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { UserContext } from "../useContext/userContext";
import { MMKV } from "./Storage";

const MyCart = (props) => {

    const { cart, setCart } = useContext(UserContext)

    const handleRemove = (e) => {
        const updateCart = cart?.filter((_, index) => index != e)
        setCart(updateCart)
        MMKV.setArray('store', updateCart)
    }

    return (
        <View style={styles.container} >
            <Text style={{ fontSize: 20, }}>{props.id}</Text>
            <Image style={styles.image} source={{ uri: `${props.image}` }} />
            <Text style={styles.name}>{props.name}</Text>
            <Text style={styles.price}>{props.price} &#8382;</Text>
            <View style={styles.deleteButton}>
                <TouchableOpacity style={styles.button}
                    onPress={() => handleRemove(props.id)}>
                    <Text style={styles.delete}>Remove</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: 130,
        marginTop: 4,
        marginLeft: 2,
        marginRight: 2,
        padding: 15,
        backgroundColor: '#B4D0A2',
    },
    image: {
        width: 80,
        height: 100,
        borderRadius: 20,
        alignSelf: 'flex-start'
    },
    name: {
        margin: 20,
        marginRight: 0,
        fontSize: 10,
        width: '30%',
        height: 65,
        textAlign: 'left',
        color: 'black',
        fontWeight: '500',
        fontSize: 15,
        display: 'flex',
    },
    price: {
        fontWeight: '500',
        fontSize: 20,
        color: 'black',
        alignSelf: 'flex-end',

        fontStyle: 'italic',
    },
    deleteButton: {
        alignSelf: 'flex-start',
        right: '30%'
    },
    button: {
        alignSelf: 'center',
        borderRadius: 10,
        borderStyle: 'solid',
        backgroundColor: '#E21836',
        width: 70,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    delete: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    }
})

export default MyCart;