import { FlatList, Text, View, StyleSheet, Dimensions, Pressable, TextInput } from "react-native"
import { deleteNotes, getNoteTableInstance } from "../../local/Database";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";
import RenderNoteItem from "../../component/NoteCardComponent";
import { TouchableOpacity } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Home = ({ navigation }) => {

    const [notes, setNotes] = useState(null)
    const [noteLongPress, setNoteLongPress] = useState(false)
    const [selectedNotes, setSelectedNotes] = useState([])
    useState(() => {

        const notesCollection = getNoteTableInstance().sorted('lastUpdatedAt', true)
        const subscription = notesCollection.addListener(() => {
            setNotes(JSON.parse(JSON.stringify(notesCollection)))
        });

        return () => {
            subscription.remove()
        }
    }, [])



    useEffect(() => {
        setSelectedNotes([])
    }, [noteLongPress])

    const changeLongPressNote = () => {
        setNoteLongPress(!noteLongPress)
    }

    const deleteSelectedNotes = () => {
        deleteNotes(selectedNotes)
        changeLongPressNote()
    }

    const FooterComponent = () => (
        <View style={{ height: 10 }}></View>
    )

    const handleDeleteNote = (item) => {

        if (selectedNotes.includes(item._id)) {

            setSelectedNotes(selectedNotes.filter(it => it !== item._id));
        }
        else {
            setSelectedNotes([...selectedNotes, item._id])

        }

    }
    return (
        <View style={style.parentContainer}>

            {noteLongPress ?
                <View style={style.headerLongPress}>

                    <MaterialCommunityIcons name="arrow-left" size={26} onPress={() => {
                        changeLongPressNote()
                    }} />

                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text>{selectedNotes.length}/{notes.length}</Text>
                        <MaterialCommunityIcons name="delete" size={26} onPress={() => {
                            deleteSelectedNotes()

                        }} />
                    </View>


                </View> :
                <View style={style.headerStyle}>
                    <Pressable style={{ flex: 1, flexDirection: "row" }} onPress={() => { navigation.navigate("SearchScreen") }}>
                        <MaterialCommunityIcons name="magnify" size={26} color={"grey"} />
                        <View style={{ width: 10 }}></View>
                        <Text style={{ fontSize: 18, color: "grey" }}>Search notes here ...</Text>
                    </Pressable>
                </View>
            }


            <FlatList
                data={notes}
                style={style.itemListStyle}
                ListFooterComponent={FooterComponent}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) =>
                    <Pressable onPress={() => {

                        if (noteLongPress) {
                            return
                        }
                        navigation.navigate("EditScreen", { id: item._id })


                    }} onLongPress={() => changeLongPressNote()}>
                        <View>
                            <RenderNoteItem item={item} />
                            {noteLongPress && <View style={style.overlay}>
                                <Pressable onPress={() => handleDeleteNote(item)}>
                                    <View style={[style.checkbox, selectedNotes.includes(item._id) && style.checked]} />

                                </Pressable>
                            </View>}

                        </View>
                    </Pressable>

                }
                initialNumToRender={10}  // Render the first 10 items
                maxToRenderPerBatch={10} // Only render 10 items at a time when scrolling
                windowSize={10}
            />
        </View>

    )
}


const style = StyleSheet.create({
    parentContainer: {
        flex: 1
    },
    itemListStyle: {
        flex: 1
    },

    overlay: {
        ...StyleSheet.absoluteFillObject, // This makes the overlay fill the entire parent container
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        padding: 10,
    },

    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#000',
    },
    checked: {
        backgroundColor: '#4CAF50', // Green color for checked state
    },

    checkboxContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Optional: for overlay effect
        borderRadius: 50,
        padding: 8,
    },

    headerLongPress: { flexDirection: "row", justifyContent: "space-between", padding: 12, borderBottomWidth: 1 },
    headerStyle: {

        flexDirection: "row",
        borderRadius: 10,
        backgroundColor: "white",
        padding: 10,
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 7,
        borderWidth: 1
    },
    itemCardParent: {
        width: "100%",
        padding: 5,
    }
})
export default Home
