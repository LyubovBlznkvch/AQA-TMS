import randomstring from "randomstring";

export function generateAlphabeticString(length: number) {
    return randomstring.generate({length, charset: "alphabetic"});
};