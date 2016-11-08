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

    static memorizeUserData(mail, name, surname, pass, sect, cls, id, userId, callback) {
        const updates = {};

        sect = (sect == "S'") ? "Scientifico" : "Classico";

        updates["/" + userId] = {
            mail,
            name,
            surname,
            pass,
            sect,
            cls,
            id,
            admin: false
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

    static getUsers() {
        const UsersRef = Firebase.database().ref("Utenti");
        UsersRef.on("value", snapshot => {
            const users = snapshot.val();
            console.log(Object.keys(users));
        });
    }

}

export default UserHandler;
