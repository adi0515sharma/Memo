import React, { createRef, useEffect, useMemo, useState } from "react";
import { Dimensions, View, Rich, StyleSheet, Text, ScrollView } from "react-native";
import { convert } from 'html-to-text';


const SearchNoteItem = React.memo(({ item, searchText }) => {


    const GetFilterContent = useMemo(() => {

        if (!searchText) {
            return ""
        }
        let txt = null

        if (item?.content) {
            txt = convert(item?.content)
            const lines = txt?.split('\n');
            const searchResult = lines?.find(line => line.toLowerCase().includes(searchText.toLowerCase()))
            if (!searchResult) {
                return txt
            }

            txt = searchResult
        }

        const insideMatch = new RegExp(`\\S*${searchText}\\S*`, 'i');
        const insideMatchResult = txt?.match(insideMatch);
        if (insideMatchResult) {
            txt = `... ${insideMatchResult[0]} ...`;
            return txt
        }

        return txt || ""

    }, [searchText])

    const formatedDate =useMemo(() => {

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
    },[item])





    return <View style={style.itemCardParent}>
        <View style={{ width: "100%", flexDirection: "row" }}>
            <Text style={[style.title, { color: !item.title && "grey" }]} numberOfLines={1} >{item.title || "Untitled"}</Text>
            <Text style={style.date}>{formatedDate}</Text>
        </View>

        <Text style={[style.description, { color: !item.content && "grey" }]} numberOfLines={1} ellipsizeMode="tail">{item.content ? GetFilterContent : "Description not available"}</Text>


    </View>
})

export default SearchNoteItem;

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
        paddingHorizontal: 10,
        backgroundColor: "transparent",
        flex: 1,
        fontWeight: "400",
        marginTop: 10,
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