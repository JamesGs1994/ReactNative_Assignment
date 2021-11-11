import React, { Component } from "react";
import { StyleSheet, View, TextInput, Text, TouchableOpacity, Modal, Pressable } from "react-native";


class App extends Component {
    state = {
        myComment: "",
        modalVisible: false
    }
    handleTextChange = (inputText) => {
        this.setState({ myComment: inputText })
    }
    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    render() {
        const { modalVisible } = this.state;
        return (
            <View style={styles.container}>
                <Modal
                    transparent={true}
                    visible={modalVisible}>
                    <View style={styles.modalView}>
                        <Text style={styles.CreatedList}>Created List </Text>
                        <Text style={styles.modalText}>{this.state.myComment}</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => this.setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </Pressable>
                    </View>
                </Modal>
                <TextInput
                    style={styles.textInputStyle}
                    onChangeText={this.handleTextChange}
                    placeholder="Enter your comment"
                />
                <TouchableOpacity style={styles.SignupBtn} onPress={() => this.setModalVisible(true)}>
                    <Text>Create Comments</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003f5c',
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    textInputStyle: {
        alignItems: "center",
        justifyContent: "center",
        borderColor: 'red',
        borderRadius: 25,
        backgroundColor: 'white',
        flexWrap: "wrap",
        borderWidth: 5,
        height: "35%",
        width: "96%",
        margin: 10,
        padding: 50,
    },
    textOutputStyle: {
        color: "red",
        fontSize: 40,
        marginLeft: 25
    },
    SignupBtn: {
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 10,
        width: "95%"
    },
    modalView: {
        height: "50%",
        width: "96%",
        marginStart: 10,
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
        elevation: 5,
    },
    buttonClose: {
        backgroundColor: "#fb5b5a",
        width: "30%",

    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    CreatedList: {
        backgroundColor: "#FFA500",
        width: "100%",
        justifyContent: "center",
        textAlign: "center",
        height: 25,
        marginBottom: 50
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    }
})

export default App;