import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { MaterialCommunityIcons, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
function ToDoRow(props) {
    return (
        <Swipeable renderRightActions={() => <View style={styles.view}><TouchableOpacity onPress={() => props.fun(props.id)}><MaterialCommunityIcons name='delete-outline' size={50} color="white" /></TouchableOpacity></View>} activeOffsetX={[-30, 30]} >
            <View style={styles.row}>
                <View style={styles.left}>{props.icon}</View>
                <View style={styles.right}>
                    <View style={styles.content}><Text style={styles.text} numberOfLines={3}>{props.content}</Text></View>
                    <View style={styles.date_time}>
                        <View style={styles.date}><Text style={styles.d_t}>{props.date}</Text></View>
                        <View style={styles.time}><Text style={styles.d_t}>{props.time}</Text></View>
                    </View>
                </View>
            </View>
        </Swipeable>
    );
}
const styles = StyleSheet.create({
    view: {
        margin: 6,
        width: "25%",
        backgroundColor: "tomato",
        borderRadius: 6,
        alignItems: "center",
        justifyContent: "center",
    },
    row: {
        flex: 1,
        height: 100,
        backgroundColor: '#4C3575',
        margin: 6,
        flexDirection: "row",
        borderRadius: 6,
    },
    left: {
        alignContent: "center",
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    right: {
        flex: 5,
    },
    content: {
        margin: 1,
        flex: 2,
    },
    date_time: {
        flex: 1,
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
    },
    text: {
        marginTop: 7,
        fontFamily: "Kailasa",
        fontSize: 17,
        color: "white"
    },
    date: {
        padding: 3,
        backgroundColor: "#5B4B8A",
        alignItems: "flex-start",
        alignContent: "center",
        justifyContent: "center",
        borderRadius: 3,
    },
    time: {
        borderRadius: 3,
        marginLeft: 5,
        padding: 3,
        backgroundColor: "#5B4B8A",
        alignItems: "flex-start",
        alignContent: "center",
        justifyContent: "center",
    },
    d_t: {
        fontFamily: "Kailasa",
        fontSize: 16,
        color: "white"
    }
})
export default ToDoRow;