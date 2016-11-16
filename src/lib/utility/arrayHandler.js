"use strict";
class ArrayHandler {

    static splitItems(a, length) {
        let arrays = [];
        let lnt = a.length;
        const pagLength = parseInt(lnt / length) + 1;

        for (let i = 1; i <= pagLength; i++) {
            let pageArray = [];

            a.map((item, j)=> {
                const k = j + 1;
                if (k <= length * i && k > length * (i - 1))
                    pageArray.push(item);
            });

            arrays.push(pageArray);
        }

        return arrays;
    }

    static dynamicSort(property) {
        let sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return (a, b) => {
            let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        };
    }

}

export default ArrayHandler;
