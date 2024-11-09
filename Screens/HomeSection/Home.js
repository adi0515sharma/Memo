import { FlatList, Text, View, StyleSheet, Dimensions, Pressable } from "react-native"
import { getNoteTableInstance } from "../../local/Database";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";
import RenderNoteItem from "../../component/NoteCardComponent";
import { TouchableOpacity } from "react-native";

const Home = ({ navigation }) => {

    const [notes, setNotes] = useState(null)

    useState(() => {

        const notesCollection = getNoteTableInstance().sorted('lastUpdatedAt', true)
        const subscription = notesCollection.addListener(() => {
            setNotes(JSON.parse(JSON.stringify(notesCollection)))
        });

        return () => {
            subscription.remove()
        }
    }, [])




    const FooterComponent = () => (
        <View style={{ height: 10 }}></View>
    )

    return (
        <View style={style.parentContainer}>
            <FlatList
                data={notes}
                style={style.itemListStyle}
                ListFooterComponent={FooterComponent}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) =>
                    <TouchableOpacity onPress={() => { navigation.navigate("EditScreen", { id: item._id }) }}>
                        <RenderNoteItem item={item} />

                    </TouchableOpacity>

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
    itemCardParent: {
        width: "100%",
        padding: 5,
    }
})
export default Home
