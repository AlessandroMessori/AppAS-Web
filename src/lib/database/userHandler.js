"use strict";
import Firebase from "firebase";

class UserHandler {

    static createUser(mail, name, surname, pass, sect, cls, id, callback, errCallback) {

        let oldPass = "";
        let result = true;
        sect = (sect == "Scientifico") ? "S" : "C";


        Firebase.auth().createUserWithEmailAndPassword(mail, pass).catch(error => {
            result = false;
            errCallback(error);
        });

        Firebase.auth().onAuthStateChanged(user => {

            window.setTimeout(() => {
                if (user != null && pass != oldPass && result) {
                    oldPass = pass;
                    UserHandler.memorizeUserData(mail, name, surname, pass, sect, cls, id, callback, errCallback);
                }
            }, 2000);

        });
    }

    static memorizeUserData(mail, name, surname, pass, sect, cls, number, callback, errCallback) {
        const updates = {};
        const newPostKey = Firebase.database().ref().child("Utenti").push().key;
        sect = (sect == "S") ? "Scientifico" : "Classico";


        updates[newPostKey] = {
            mail,
            defaultMail: mail,
            name,
            surname,
            pass,
            sect,
            cls,
            number
        };

        Firebase.database().ref("Utenti").update(updates)
            .then(() => {
                callback();
            })
            .catch((e) => {
                errCallback(e);
            });

    }

    static getUsers(callback) {
        const UsersRef = Firebase.database().ref("Utenti");
        UsersRef.on("value", snapshot => {

            const keys = Object.keys(snapshot.val());
            let users = [];

            keys.map(user => users.push(snapshot.val()[user]));

            callback(users);

        });
    }

}

export default UserHandler;
