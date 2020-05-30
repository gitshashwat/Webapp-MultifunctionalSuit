// eslint-disable-next-line func-style,no-unused-vars
function extObjectValues (obj) {

    if (typeof obj.values === "undefined") {

        return Object.keys(obj).map(key => obj[key])

    }

    return obj.values()

}
