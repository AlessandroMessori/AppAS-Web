"use strict";
import includes from "lodash/includes";

class FilterHandler {

    static filterItemsByString(items, field) {
        return items.filter(el => {
            let result = false;

            Object.keys(el).map(key => {

                if (includes(el[key], field)) {
                    result = true;
                }
            });

            return result;
        });
    }

    static filterItemsByClass(items, cls) {

        if (cls == "") {
            return items;
        }

        return items.filter(el => {
            return (el.cls == cls);
        });
    }

    static filterItemsBySect(items, sect) {

        if (sect == "") {
            return items;
        }

        return items.filter(el => {
            return (el.sect == sect);
        });
    }

    static filterItems(items, field, cls, sect) {

        const filtered1 = FilterHandler.filterItemsByString(items, field);
        const filtered2 = FilterHandler.filterItemsByClass(filtered1, cls);
        const filtered3 = FilterHandler.filterItemsBySect(filtered2, sect);

        return filtered3;

    }

}

export default FilterHandler;

