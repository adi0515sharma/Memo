import { Text, View, StyleSheet, TextInput, Pressable, ScrollView, KeyboardAvoidingView, Platform } from "react-native"
import { getNote, insertNote, updateNote } from "../../local/Database"
import React, { useEffect, useReducer, useState } from "react"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from "react-native-safe-area-context";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { useFocusEffect } from '@react-navigation/native';
import { RichText, Toolbar, useBridgeState, useEditorBridge } from "@10play/tentap-editor";





const Create = ({ navigation, route }) => {


    const [state, setState] = useState({ title: null });

    const editor = useEditorBridge({
        autofocus: true,
        avoidIosKeyboard: true,
    });

    const editorState = useBridgeState(editor)

    const insertIntoNote = async () => {



        if (!editorState.isReady) {
            return
        }
        const currentState = { ...state, content: await editor.getHTML() }
        if (currentState._id) {
            updateNote(currentState)

        }
        else {
            insertNote(currentState)
        }

        navigation.goBack()
    }

    const updateTitle = (data) => {
        setState({...state, title : data})
    }




    useFocusEffect(
        React.useCallback(() => {

            
            return () => {
                setState(null)
                editor.setContent(null)
            };
        }, [])
    );

    useEffect(() => {

        if (route?.params?.id && editorState.isReady) {

            const note = getNote(route?.params?.id)
            setState(JSON.parse(JSON.stringify(note)))
            editor.setContent(note?.content)
        }



    }, [editorState.isReady])

    return (

        <SafeAreaView style={style.parentContainer}>

            <View style={style.headerStyle}>

                <MaterialCommunityIcons name="arrow-left" size={26} onPress={() => { navigation.goBack() }} />

                <MaterialCommunityIcons name="check" size={26} onPress={() => { insertIntoNote() }} />


            </View>

            <TextInput style={style.title} value={state?.title} onChangeText={(txt) => { updateTitle(txt) }} placeholder="Title" />



            <RichText editor={editor} style={style.description} />


            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{
                    position: 'absolute',
                    width: '100%',
                    bottom: 0,
                }}
            >
                <Toolbar editor={editor} />
            </KeyboardAvoidingView>


        </SafeAreaView>

    )
}


const style = StyleSheet.create({
    parentContainer: {
        flex: 1
    },
    title: { fontSize: 30, padding: 5, textAlignVertical: "top", marginTop: 20, marginHorizontal: 13 },
    description: { fontSize: 18, flex: 1, textAlignVertical: "top", marginTop: 4, marginHorizontal: 20, backgroundColor: "transparent" },
    editor: { flex: 1, backgroundColor: "transparent" },
    headerStyle: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "white",
        alignItems: "center",
        padding: 10,
        height: 50,

    }
})

export default Create