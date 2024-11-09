import Realm from 'realm';
import Note from './Tables/Notes';


let realm = null 

function GetConnection(){
    if(realm == null){
       realm = new Realm({schema: [Note]});
    }

    return realm
}


function getNextId(schemaName) {
    const realm = GetConnection()
    const objects = realm.objects(schemaName);
    if (objects.length === 0) {
      return 1; // Start at 1 if there are no objects
    }
    return Math.max(...objects.map(obj => obj._id)) + 1;
}


export function insertNote(obj){

    const realm = GetConnection()

    realm.write(() => {
        const newId = getNextId('Note');
        realm.create('Note', {
          _id: newId,
          createdAt: new Date(),
          lastUpdatedAt: new Date(),
          ...obj
        });
      });
}


export function updateNote(obj){

  const realm = GetConnection()
  realm.write(() => {
    // Find the object to update
    const note = realm.objects('Note').filtered(`_id == ${obj._id}`)[0];

    if (note) {
      // Modify the properties
      note.title = obj.title;
      note.content = obj.content;
      note.lastUpdatedAt =  new Date()
    }
  });
}

export function getNote(id){

  const realm = getNoteTableInstance()
  return realm.filtered(`_id == ${id}`)[0];
}


export function deleteNote(id){
    const realm = GetConnection()

    realm.write(() => {
        let noteToDelete = realm.objectForPrimaryKey('Note', id);
        realm.delete(noteToDelete);
      });
      
}

export function getNoteTableInstance(){
    const realm = GetConnection()

    return realm.objects('Note');
}


export function getNoteListBySearch(txt){
  const realm = getNoteTableInstance()

  return realm.filtered(`title CONTAINS[c] "${txt}" OR content CONTAINS[c] "${txt}"`);
}


export default GetConnection