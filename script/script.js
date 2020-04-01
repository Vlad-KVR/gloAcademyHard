//1
'use strict';

const stringFormatting = (str) => {

    if(typeof(str) !== "string") {
        console.warn("Передана не строка");
        return null;
    }
    let result = str.trim();
    result = result.length>30 ? result.substring(0,30)+"..." : result;
    return result;
};