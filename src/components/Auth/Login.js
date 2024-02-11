import React, { useContext, useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    useColorScheme,
} from 'react-native';
import Logo from '../../assets/veli.svg';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { MMKV } from '../Tabs/Storage';
import { UserContext } from '../useContext/userContext';

const Login = () => {

    const navigation = useNavigation();
    const { setUser } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');


    function getUser() {
        axios.get(
            'https://veli.store/api/user/user_info/',
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .then((response) => {
                setUser(response.data?.username)
                MMKV.setString('username', response.data?.username)
            })
            .then(() => {
                MMKV.getString('tokenStore') && navigation.navigate('Home')
            })
    }
    const LogIn = () => {
        axios.post(
            'https://veli.store/api/user/user_auth/login/',
            {
                email: email,
                password: password,
            }
        )
            .then((response) => {
                setToken(response.data?.access)
                MMKV.setString('tokenStore', JSON.stringify(response.data?.access))
            })
    }

    useEffect(() => {
        token && getUser()
    }, [token])
    return (
        <View style={styles.backgroundColor}>
            <View style={styles.headerContainer}>
                <Logo style={styles.logo} />
            </View>
            <View style={styles.loginContainer}>
                <TextInput autoComplete='email' defaultValue={email}
                    onChangeText={newText => setEmail(newText)}
                    placeholder='Email'
                    style={styles.inputs} keyboardType='email-address' />
                <TextInput defaultValue={password}
                    onChangeText={newText => setPassword(newText)}
                    placeholder='Password'
                    style={styles.inputs} secureTextEntry={true} />
                <TouchableOpacity style={styles.loginButton}
                    onPress={LogIn}>
                    <Text style={styles.loginText}>LOGIN</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    backgroundColor: {
        width: '100%',
        height: '100%',
        zIndex: 1,

    },
    headerContainer: {
        flex: 1,
        zIndex: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 100,
        height: 100,
    },
    loginContainer: {
        flex: 2,
        zIndex: 100,
    },
    inputs: {
        borderWidth: 1,
        padding: 10,
        margin: 20,
        borderRadius: 10,
        color: 'black',
    },

    loginText: {
        textAlign: 'center',
        fontSize: 20,
        color: 'white',
        fontWeight: '600'
    },
    loginButton: {
        display: 'flex',
        width: '30%',
        height: 'auto',
        alignSelf: 'center',
        margin: 20,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#7CB339',
        borderStyle: 'solid',
        opacity: '1',
    },
});

export default Login