import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, SafeAreaView, FlatList, TouchableNativeFeedback } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import ToDoRow from './Components/ToDoRow';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Swipeable } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
export default function App() {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date(Date.now()));
  const [content, setContent] = useState('');
  const [arrTodo, setArrToDo] = useState('');
  const [data, setData] = useState('[]');
  useEffect(() => {
    const getAll = async () => {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      setArrToDo(result);
      var dat = []
      result.map((item) => {
        if (item[0] !== "id_arr") {
          var id_ = parseInt(item[0]);
          var todoarr_ = JSON.parse((item[1].replace('/', '')))
          var content_ = todoarr_.content;
          var date_ = todoarr_.date;
          var time_ = todoarr_.time;
          var hour = parseInt(time_.substr(0, time_.indexOf(':')));
          console.log(hour);
          if ((time_[time_.length - 2] == "P" && (11 >= hour && hour > 5)) || (time_[time_.length - 2] == "A" && ((12 == hour) || hour <= 5))) {
            dat.push([id_, content_, date_, time_, "night"]);
          } else {
            dat.push([id_, content_, date_, time_, "day"]);
          }
        }

      })
      setData(dat);
      console.log(dat);
    }
    getAll();
  }, []);


  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
  };
  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime;
    setTime(currentTime);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
  };
  const saveDetails = async () => {
    let id_arr;
    var id;
    try {
      id_arr = await AsyncStorage.getItem('id_arr');
      if (id_arr !== null) {
        var arr = JSON.parse(id_arr);
        var next_id = parseInt(arr[arr.length - 1]) + 1; //number
        //console.log(arr);
        id = next_id;
        arr.push(next_id.toString());
        const jsonValue = JSON.stringify(arr)
        await AsyncStorage.setItem('id_arr', jsonValue);
        //console.log(typeof (parseInt(arr[-1])));
      } else {
        id_arr = ["1"];
        id = 1;
        console.log(typeof (id_arr))
        const jsonValue = JSON.stringify(id_arr)
        await AsyncStorage.setItem('id_arr', jsonValue);
      }
    } catch (e) {
      console.log(e);

    }

    const todoContent = content;
    let todoDate = date.toDateString().split(' ');
    let todoTime = time.toLocaleTimeString('en-US');
    const data = { 'content': todoContent, 'date': todoDate[2] + " " + todoDate[1] + " " + todoDate[3], 'time': todoTime.split(' ')[0].split(':')[0] + ":" + todoTime.split(' ')[0].split(':')[1] + todoTime.split(' ')[1] };
    try {

      await AsyncStorage.setItem(id.toString(), JSON.stringify(data));
    } catch (e) {
      // saving error
    }
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);
    setArrToDo(result);
    var dat = []
    result.map((item) => {
      if (item[0] !== "id_arr") {
        var id_ = parseInt(item[0]);
        var todoarr_ = JSON.parse((item[1].replace('/', '')))
        var content_ = todoarr_.content;
        var date_ = todoarr_.date;
        var time_ = todoarr_.time;
        var hour = parseInt(time_.substr(0, time_.indexOf(':')));
        console.log(hour);
        if ((time_[time_.length - 2] == "P" && (11 >= hour && hour > 5)) || (time_[time_.length - 2] == "A" && ((12 == hour) || hour <= 5))) {
          dat.push([id_, content_, date_, time_, "night"]);
        } else {
          dat.push([id_, content_, date_, time_, "day"]);
        }
      }

    })
    setData(dat);
    /*try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      console.log(result);
      console.log(result[0])
      console.log((JSON.parse((result[0][1].replace('/', '')))).content);
      //AsyncStorage.getAllKeys().then((keys) => AsyncStorage.multiGet(keys).then((data) => console.log(data)))
    } catch (error) {
      console.error(error)
    }*/
    Haptics.selectionAsync();
  };
  const clearAll = async () => {
    try {
      await AsyncStorage.clear()

    } catch (e) {
      // clear error
    }
    setData([]);

    console.log('Done.')
  };
  const saveToState = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);
    setArrToDo(result);
    setArrToDo(result);
    console.log(arrTodo);


  }


  /*result.map((item) => {
    if (item[0] !== "id_arr") {
      var id_ = item[0];
      var todoarr_ = JSON.parse((item[1].replace('/', '')))
      var content_ = todoarr_.content;
      var date_ = todoarr_.date;
      var time_ = todoarr_.time;
      console.log(date_);

    }

  });*/
  //console.log((JSON.parse((result[0][1].replace('/', '')))));
  //console.log(keys.shift());
  //const value = await AsyncStorage.getItem('id_arr')
  //console.log(typeof (JSON.parse(keys)));

  const d = [{ id: 1, name: 't' }, { id: 2, name: 's' }, { id: 3, name: 'yh' }, { id: 4, name: 'yh' }, { id: 5, name: 'yh' }, { id: 6, name: 'yh' }, { id: 7, name: 'yh' }, { id: 8, name: 'yh' }]
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topbar}>
        <Text style={styles.title_text}>To Do<MaterialIcons name="pending-actions" size={53} color="white" /></Text>
      </View>
      <View style={styles.todo_input}>
        <View style={styles.content_input}>
          <TextInput placeholder='Description' style={styles.textfield} onChangeText={text => { setContent(text); Haptics.selectionAsync() }} value={content} />
        </View>
        <View style={styles.datetime_input}>
          <View style={styles.date_input}>
            <View style={styles.one}>
              <MaterialCommunityIcons name='calendar-month-outline' size={40} color="white" />
            </View>
            <View style={styles.two}>
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={"date"}
                is24Hour={true}
                onChange={onChangeDate}
                style={styles.datepicker}
                textColor="red"
              />
            </View>
          </View>
          <View style={styles.time_input}>
            <View style={styles.one}>
              <MaterialCommunityIcons name='clock-time-eight-outline' size={40} color="white" />
            </View>
            <View style={styles.two}>
              <DateTimePicker
                testID="dateTimePicker"
                value={time}
                mode={"time"}
                is24Hour={true}
                onChange={onChangeTime}
                style={styles.timepicker}
                textColor="red"
              />
            </View>
            <View style={styles.three}>
              <TouchableOpacity onPress={saveDetails}>
                <MaterialCommunityIcons name='check-circle-outline' size={40} color="dodgerblue" />
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </View>
      <View style={styles.upcomming}><TouchableOpacity onPress={clearAll}><Text style={styles.upcommingTitle}>Upcomming</Text></TouchableOpacity><TouchableNativeFeedback onPress={() => console.log(data[0][3].indexOf(':'))}><Text style={styles.upcommingTitle}>NEW</Text></TouchableNativeFeedback></View>
      <View style={styles.todo_list}>
        <Swipeable>
          <FlatList
            data={data}
            keyExtractor={item => item[0]}
            renderItem={({ item }) => (
              <ToDoRow key={item[0]} icon={item[4] == "night" ? <FontAwesome name="moon-o" size={50} color="white" /> : <Ionicons name="md-sunny-outline" size={50} color="white" />} content={item[1]} time={item[3]} date={item[2]} />

            )}


          />
        </Swipeable>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title_text: {
    color: "white",
    fontSize: 59
  },
  row: {
    width: '100%',
    height: '95%',
    backgroundColor: 'transparent',
    backgroundColor: "red",
    padding: 1,

  },
  container: {
    flex: 1,
    backgroundColor: "#371B58",
  },
  topbar: {
    justifyContent: "center",
    alignContent: 'center',
    alignItems: "flex-start",

    flex: 1,
  },
  todo_input: {
    flex: 2,
    borderRadius: 6,
    margin: 5,
    backgroundColor: "#4C3575"
  },
  content_input: {
    flex: 1,

  },
  textfield: {
    backgroundColor: "#5B4B8A",
    height: 15,
    borderColor: "gray",
    color: "white",
    flex: 1,
    margin: 5,
    borderRadius: 6,
    paddingLeft: 8
  },
  datetime_input: {
    flex: 1,
    flexDirection: "row",
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },

  datepicker: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "24%",
  },
  timepicker: {
    marginRight: "13%",
    marginTop: "21%",
  },
  one: {
    flex: 0.25,
    alignItems: "flex-end",
    alignContent: "center",
    justifyContent: "center",
  },
  two: {
    alignItems: "flex-start",
    flex: 0.5,
  },
  date_input: {
    flex: 0.5,
    flexDirection: "row",
    alignContent: "center",
  },
  time_input: {
    flex: 0.6,
    flexDirection: "row",
    alignContent: "center",
  },
  three: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    flex: 0.3,
  },
  upcommingTitle: {
    marginLeft: 6,
    marginBottom: 1,
    fontSize: 32,
    color: "white",
    fontStyle: "normal",
    fontWeight: "500",
  },
  todo_list: {
    backgroundColor: "#371B58",
    flex: 5,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column-reverse',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  captureButton: {
    backgroundColor: 'red',
  }
});
