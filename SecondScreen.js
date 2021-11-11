import React, { Component } from 'react';

import { ActivityIndicator, Alert, FlatList, Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';

export default class App extends Component {

    constructor(props) {

        super(props);

        this.state = {
            isLoading: true,
            text: '',
            data: []
        }

        this.arrayholder = [];
    }

    componentDidMount() {

        return fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.setState({
                    isLoading: false,
                    data: responseJson,
                }, () => {
                    // In this block you can do something with new state.
                    this.arrayholder = responseJson;
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    GetFlatListItem() {
        Alert.alert("Checked");
    }

    searchData(text) {
        const newData = this.arrayholder.filter(item => {
            const itemData = item.name;
            const textData = text;
            return itemData.indexOf(textData) > -1
        });

        this.setState({
            data: newData,
            text: text
        })
    }

    itemSeparator = () => {
        return (
            <View
                style={{
                    height: .5,
                    width: "100%",
                    backgroundColor: "#000",
                }}
            />
        );
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            );
        }

        return (

            <View style={styles.MainContainer}>

                <TextInput
                    style={styles.textInput}
                    onChangeText={(text) => this.searchData(text)}
                    value={this.state.text}
                    underlineColorAndroid='transparent'
                    placeholder="Search Here" />

                <FlatList
                    data={this.state.data}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={this.itemSeparator}
                    renderItem={({ item }) => <Text style={styles.row}
                        onPress={this.GetFlatListItem.bind(this, item.name)} >{item.name}</Text>}
                    style={{ marginTop: 10 }} />

                <View style={styles.BottomTab}>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('ThirdScreen') }}>
                        <Text style={styles.logo}>Navigate to Third Screen</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        margin: 5,

    },

    row: {
        fontSize: 18,
        padding: 12
    },

    textInput: {

        textAlign: 'center',
        height: 42,
        borderWidth: 1,
        borderColor: '#009688',
        borderRadius: 8,
        backgroundColor: "#FFFF"

    },
    BottomTab: {
        backgroundColor: '#a5a4aa',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50
    },
    logo: {
        fontWeight: "bold",
        fontSize: 25,
        color: "#fb5b5a",

    }
});
