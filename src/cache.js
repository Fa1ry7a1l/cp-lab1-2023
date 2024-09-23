class Cache {
    #vals = new Map()
    #statistic = []

    add = (key, val, timesLeft = 1) => {
        this.#addStatistic("add", key, val, timesLeft)
        if (timesLeft <= 0)
            return
        this.#vals.set(key, new Element(val, timesLeft))
    }


    get = (key) => {
        let element = this.#vals.get(key)
        if (element == null || element.timesLeft <= 0) {
            this.#addStatistic("get", key, null, -1)
            return null
        }
        if (element.timesLeft - 1 <= 0) {
            this.#vals.delete(key)
        } else {
            this.#vals.set(key, new Element(element.value, element.timesLeft - 1))
        }
        this.#addStatistic("get", key, element.value, element.timesLeft)

        return element.value
    }

    getLogs = () => {
        return this.#statistic
    }

    #addStatistic = (method, key, value, timesLeft) => {
        this.#statistic.push({method, key, value, timesLeft})
    }


}

class Element {
    constructor(val, times) {
        this.value = val
        this.timesLeft = times
    }
}

export {Cache}