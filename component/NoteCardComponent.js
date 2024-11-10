import { PlaceholderBridge, RichText, useBridgeState, useEditorBridge, useEditorContent } from "@10play/tentap-editor";
import React, { createRef, useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, View, Rich, StyleSheet, Text, ScrollView } from "react-native";
const RenderNoteItem = React.memo(({ item }) => {
    const editor = useEditorBridge({ editable: false, dynamicHeight: true });
    const editorState = useBridgeState(editor)
    const [richTextHeight, setRichTextHeight] = useState("auto")

    useEffect(() => {

        editor.setContent(item?.content)
    }, [editorState.isReady, item])


    const formatedDate = () => {

        const lastUpdatedAt = new Date(item.lastUpdatedAt);


        const date = lastUpdatedAt;
        const currentYear = new Date().getFullYear();

        // Determine format options based on the year
        const options = {
            day: 'numeric',
            month: 'long',
            ...(date.getFullYear() !== currentYear && { year: 'numeric' }),
        };

        // Format the date based on the options
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
        const result = formattedDate.toString()
        return result
    }


    const handleLayout = (event) => {
        const { height } = event.nativeEvent.layout;
        const newHeight = height < 100 ? "auto" : 100
        setRichTextHeight(newHeight)
    };



    return <View style={style.itemCardParent}>
        <View style={{ width: "100%", flexDirection: "row" }}>
            <Text style={[style.title, { color: !item.title && "grey" }]} numberOfLines={1} >{item.title || "Untitled"}</Text>
            <Text style={style.date}>{formatedDate()}</Text>
        </View>

        <View style={{ height: richTextHeight, overflow: 'hidden' }}>

            {item?.content ?
                <RichText editor={editor} style={style.description} onLayout={handleLayout} /> :
                <Text style={{ margin: 10, color: "grey" }}>Description not available</Text>
            }


        </View>


    </View>
})

export default RenderNoteItem;

const style = StyleSheet.create({
    parentContainer: {
        flex: 1
    },
    itemListStyle: {
        flex: 1
    },
    title: {
        paddingHorizontal: 10,
        fontSize: 20,
        flex: 1,
        fontWeight: "bold",

    },
    description: {
        marginHorizontal: 15,
        backgroundColor: "transparent",
        flex: 1
    },
    date: {
        paddingHorizontal: 10,
        fontSize: 12,
    },
    itemCardParent: {
        padding: 5,
        margin: 10,
        borderWidth: 1,
        borderRadius: 10,
    }

})