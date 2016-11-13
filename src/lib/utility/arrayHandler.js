"use strict";
class ArrayHandler {

    static splitItems(a, length) {
        var arrays = [];

        while (a.length > 0)
            arrays.push(a.splice(0, length));

        return arrays;
    }

}

export default ArrayHandler;
