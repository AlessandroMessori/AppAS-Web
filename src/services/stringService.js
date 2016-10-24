"use strict";

export default class stringHandler {

    static  getRandomString(length) {
        let text = "";
        const possible = "abcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    }

}