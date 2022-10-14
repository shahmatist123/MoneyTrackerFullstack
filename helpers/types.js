exports.arrayToString = (array) => {
    if (!array || !Array.isArray(array)) {
        return array
    }
    return array.join(" ")
}