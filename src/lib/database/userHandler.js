"use strict";
import Firebase from "firebase";

class UserHandler {

    static createUser(mail, name, surname, pass, sect, cls, id, callback) {

        sect = (sect == "Scientifico") ? "S" : "C";

        Firebase.auth().createUserWithEmailAndPassword(mail, pass).catch(error => alert(error));

        Firebase.auth().onAuthStateChanged(user => {
            if (user != null) {
                user.updateProfile({displayName: name + " " + surname});
                UserHandler.getUsers();
                UserHandler.memorizeUserData(mail, name, surname, pass, sect, cls, id, user.uid, callback);
            }
        });

    }

    static memorizeUserData(mail, name, surname, pass, sect, cls, number, userId, callback) {
        const updates = {};

        sect = (sect == "S'") ? "Scientifico" : "Classico";

        updates["/" + userId] = {
            mail,
            name,
            surname,
            pass,
            sect,
            cls,
            number
        };

        Firebase.database().ref("Utenti").update(updates)
            .then(()=> {
                Firebase.auth().signOut();
                callback();
            })
            .catch((e)=> {
                Firebase.auth().signOut();
                alert(e);
            });

    }

    static getUsers(callback) {
        const UsersRef = Firebase.database().ref("Utenti");
        UsersRef.on("value", snapshot => {

            const keys = Object.keys(snapshot.val());
            let users = [];

            keys.map(user=> users.push(snapshot.val()[user]));

            callback(users);

        });
    }

}

export default UserHandler;
