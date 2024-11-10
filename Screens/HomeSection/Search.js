import React, { useEffect, useState, useRef } from "react"
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native"
import Icon from "react-native-vector-icons/Fontisto"
import { getNoteListBySearch } from "../../local/Database"
import { TouchableOpacity } from "react-native"
import RenderNoteItem from "../../component/NoteCardComponent"
import { useFocusEffect } from '@react-navigation/native';
import SearchNoteItem from "../../component/SearchCardComponent"

const Search = ({navigation}) => {

  const [search, setSearch] = useState(null)
  const [searchResult, setSearchResult] = useState([])
  const searchFieldRef = useRef()
  useEffect(() => {
    if (!search) {
      setSearchResult([])
      return
    }
    const data = getNoteListBySearch(search)
    setSearchResult(data)
  }, [search])

  
  useFocusEffect(
    React.useCallback(() => {

      searchFieldRef?.current?.focus()
        return () => {
          searchFieldRef?.current?.blur();
        };
    }, [])
);

  const FooterComponent = () => (
    <View style={{ height: 10 }}></View>
  )
  return (
    <View style={style.parentContainer}>
      <View style={style.serachField}>
        <TextInput
          ref={searchFieldRef}
          value={search}
          style={style.serachTextField}
          placeholder="Search your note"
          onChangeText={setSearch}
        />
        <Icon name="search" size={20} />

      </View>

      <FlatList
        data={searchResult}
        style={style.itemListStyle}
        ListFooterComponent={FooterComponent}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) =>
          <TouchableOpacity onPress={() => { navigation.replace("EditScreen", { id: item._id }) }}>
            <SearchNoteItem item={item} searchText={search}/>

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

  serachField: {
    padding: 8,
    margin: 10,
    borderRadius: 10,
    borderWidth: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  serachTextField: {
    fontSize: 15,
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

export default Search