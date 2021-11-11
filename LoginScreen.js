import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class LoginScreen extends Component {
    state = {
        email: "",
        errorMsg: "",
        password: "",
    }
    async componentDidMount() {
        const getData = await AsyncStorage.getItem('Signup');
        //console.log('getData', getData);
    }
    async onPressLogin() {
        console.log('storedItem', storedItem);
    }

    async Validater() {
        const EmailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{4,})");
        const getData = await AsyncStorage.getItem('Signup');
        const storedItem = JSON.parse(getData || '{"traits": {}}');
        if (this.state.email == "") {
            this.setState({ errorMsg: "Please enter your Email" })
        }
        else if (this.state.password == "") {
            this.setState({ errorMsg: "Please enter password" })
        }

        else {
            const { email, password } = this.state
            let filterUser = storedItem.filter(item => item.username === email);
            let filterPass = storedItem.filter(item => item.password == password);
            if (filterUser.length == 0 || filterPass.length == 0) {
                this.setState({ errorMsg: "Invalid username or password" })
            }
            else {
                this.setState({ email: "", password: "", errorMsg: "" })
                this.props.navigation.navigate('SecondScreen')
            }

        }
    }
    render() {
        return (

            <View style={styles.container}>
                <Text style={styles.logo}>Assignment App</Text>
                <View style={[styles.inputView, { marginBottom: 20 }]} >
                    <TextInput
                        style={styles.inputText}
                        keyboardType="email-address"
                        value={this.state.email}
                        placeholder="User Name"
                        placeholderTextColor="black"
                        onChangeText={text => this.setState({ email: text })} />
                </View>
                <View style={[styles.inputView, { marginBottom: 10 }]} >
                    <TextInput
                        secureTextEntry
                        keyboardType="numbers-and-punctuation"
                        maxLength={15}
                        style={styles.inputText}
                        value={this.state.password}
                        placeholder="Password"
                        placeholderTextColor="black"
                        onChangeText={(text) => this.setState({ password: text })}
                    />
                </View>
                <View>
                    <Text style={{ color: "red", marginBottom: 15 }}>{this.state.errorMsg}</Text>
                </View>
                <TouchableOpacity>
                    <Text style={styles.forgot}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginBtn}
                    onPress={() => { this.Validater() }}>
                    <Text>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('SignUpScreen') }}>
                    <Text style={styles.SignupText}>Signup</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003f5c',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#fb5b5a",
        marginBottom: 40
    },
    inputView: {
        width: "80%",
        backgroundColor: "#d1d1d1",
        borderRadius: 25,
        height: 50,
        justifyContent: "center",
        padding: 20,

    },
    inputText: {
        height: 50,
        color: "black",
    },
    forgot: {
        color: "white",
        fontSize: 11
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 10
    },
    SignupText: {
        color: "white"
    }
});