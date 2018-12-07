import {Change, database, EventContext} from 'firebase-functions';
import * as admin from 'firebase-admin';
import {DataSnapshot} from "firebase-functions/lib/providers/database";

admin.initializeApp();


export const addTofireStore = database
    .ref('/products/{pushId}')
    .onUpdate((snapshot: Change<DataSnapshot>, context: EventContext) => {
        const original = snapshot.before.val();
        const updated = snapshot.after.val();

        console.log('Param is ', context.params.pushId);

        return admin.firestore()
            .collection('Test').add(updated)
            .then(res => console.log('Write Successful', res));
    });
