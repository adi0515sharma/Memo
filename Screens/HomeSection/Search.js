import { useEffect, useState } from "react"
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native"
import Icon from "react-native-vector-icons/Fontisto"
import { getNoteListBySearch } from "../../local/Database"
import { retry } from "@reduxjs/toolkit/query"
import { TouchableOpacity } from "react-native"
import RenderNoteItem from "../../component/NoteCardComponent"

const Search = ({navigation}) => {


  
  const [search, setSearch] = useState(null)
  const [searchResult, setSearchResult] = useState([])

  useEffect(() => {
    if (!search) {
      setSearchResult([])
      return
    }
    const data = getNoteListBySearch(search)
    setSearchResult(data)
  }, [search])

  
  const FooterComponent = () => (
    <View style={{ height: 10 }}></View>
)
  return (
    <View style={style.parentContainer}>
      <View style={style.serachField}>
        <TextInput
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
          <TouchableOpacity onPress={() => { navigation.navigate("EditScreen", { data: item }) }}>
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