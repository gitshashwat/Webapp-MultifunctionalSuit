import Vue from "vue"

const capitalize = Vue.filter("capitalize", function (val) {

        let str = val ? val.toString() : ""
        return str.charAt(0).toUpperCase() + str.slice(1)

    }),
    lowercase = Vue.filter("lowercase", function (val) {

        let str = val ? val.toString() : ""
        return str.toLowerCase()

    }),
    uppercase = Vue.filter("uppercase", function (val) {

        let str = val ? val.toString() : ""
        return str.toUpperCase()

    }),
    projectName = Vue.filter("projectName", function (val) {

        let str = val.toString(),
            strs = str.split(" ")
        strs.forEach((ele, i) => {

            strs[i] = ele.charAt(0).toLowerCase() + ele.slice(1)

        })
        return strs.join("_")

    }),
    className = Vue.filter("className", function (val) {

        let str = val.replace(/ /gu, "").replace(/\./gu, "").
            replace(/\(/gu, "").
            replace(/\)/gu, "").
            replace(/[&/\\#,+()$~%.'":*?<>{}]/gu, "")
        return str.toLowerCase()

    }),
    prettyURLs = Vue.filter("prettyURLs", function (val) {

        let str = val.toString()
        return str.replace(/\\\//gu, "/")

    }),
    toByte = Vue.filter("toByte", function (val) {

        return val * 1000000

    }),
    toMB = Vue.filter("toMB", function (val) {

        return val / 1000000

    })

export {capitalize, lowercase, uppercase, projectName, className, prettyURLs, toByte, toMB}
