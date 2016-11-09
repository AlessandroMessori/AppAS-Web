"use strict";
import Firebase from "firebase";
import includes from "lodash/includes";

class LoginHandler {

    static login(mail, password, cb1 = ()=> {
    }, cb2 = ()=> {
    }) {
        Firebase.auth().signInWithEmailAndPassword(mail, password).catch(error => cb2("Credenziali Errate"));

        Firebase.auth().onAuthStateChanged(user => {
            Firebase.database().ref("Amministratori").on("value", snapshot=> {
                if (includes(snapshot.val(), user.email)) {
                    cb1(user);
                }
                else {
                    cb2("Non hai i permessi per entrare");
                }
            });
        });
    }

    static logOut(cb = ()=> {
    }) {
        Firebase.auth().signOut().then(()=>cb());
    }

}

export default LoginHandler;
