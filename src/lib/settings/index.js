"use strict";
import Firebase from "firebase";
import * as Configs from "./config.json";

class Settings {

    static get Configs() {
        return Configs;
    }

    static init(credentials) {
        Firebase.initializeApp(credentials);
    }

}

export default Settings;