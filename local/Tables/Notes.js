import Realm from 'realm';

class Note extends Realm.Object {}
Note.schema = {
  name: 'Note',
  properties: {
    _id: 'int',
    title: { type: 'string', optional: true },
    content: { type: 'string', optional: true },
    createdAt: 'date',
    lastUpdatedAt: 'date'
  },
  primaryKey: '_id',
};



export default Note
