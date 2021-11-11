import React from 'react'
import {
    View,
    TouchableOpacity,
    Text,
    TextInput,
    StyleSheet
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class SignUp extends React.Component {
    state = {
        username: '',
        usernamerror: "",
        password: '',
        passworderror: '',
        email: '',
        emailerror: '',
        phone_number: '',
        phone_numbererror: ''

    }

    async Validater() {
        const { username, password, email, phone_number } = this.state;
        if (this.state.username == "") {
            this.setState({ usernamerror: "Please enter your User ID" })
        }
        else if (this.state.password == "") {
            this.setState({ passworderror: "Please enter your Password" })
        }
        else if (this.state.email == "") {
            this.setState({ emailerror: "Please enter your Email" })
        }
        else if (this.state.phone_number == "") {
            this.setState({ phone_numbererror: "Please enter your Phone Number" })
        }
        else {
            const data = {
                username,
                password,
                email,
                phone_number
            }
            const getData = await AsyncStorage.getItem('Signup');
            if (getData == null || getData == undefined) {
                let dataSet = await AsyncStorage.setItem('Signup', JSON.stringify(data));
            }
            else {
                let dataArr = [];
                const storedItem = JSON.parse(getData);
                dataArr.push(storedItem);
                dataArr.push(data);
                let dataSet = await AsyncStorage.setItem('Signup', JSON.stringify(dataArr));
            }
            this.props.navigation.navigate('LoginScreen')
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.inputView}
                    placeholder='Username'
                    placeholderTextColor="black"
                    autoCapitalize="none"
                    onChangeText={text => this.setState({ username: text })}
                />
                <Text style={{ color: "red" }}>{this.state.username == "" ? this.state.usernamerror : ""}</Text>
                <TextInput
                    style={styles.inputView}
                    placeholder='Password'
                    secureTextEntry={true}
                    autoCapitalize="none"
                    placeholderTextColor='black'
                    onChangeText={text => this.setState({ password: text })}
                />
                <Text style={{ color: "red" }}>{this.state.password == "" ? this.state.passworderror : ""}</Text>
                <TextInput
                    style={styles.inputView}
                    placeholder='Email'
                    autoCapitalize="none"
                    placeholderTextColor='black'
                    onChangeText={text => this.setState({ email: text })}
                />
                <Text style={{ color: "red" }}>{this.state.email == "" ? this.state.emailerror : ""}</Text>

                <TextInput
                    style={styles.inputView}
                    placeholder='Phone Number'
                    autoCapitalize="none"
                    placeholderTextColor='black'
                    onChangeText={text => this.setState({ phone_number: text })}
                />
                <Text style={{ color: "red" }}>{this.state.phone_number == "" ? this.state.phone_numbererror : ""}</Text>
                <TouchableOpacity style={styles.SignupBtn}
                    onPress={() => { this.Validater() }}>
                    <Text>Sign Up</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003f5c',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputView: {
        width: "80%",
        backgroundColor: "#d1d1d1",
        borderRadius: 25,
        color: "black",
        height: 50,
        marginBottom: 5,
        marginTop: 5,
        paddingStart: 20,
        justifyContent: "center",
    },
    SignupBtn: {
        width: "75%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
})