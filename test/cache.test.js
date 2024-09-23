import {Cache} from "../src/cache";

test('it fails', () => {
    expect(false).toBe(false);
});

test('default count check', () => {
        let caches = new Cache();
        caches.add("a", "b")
        caches.add("b", "c")
        let b = caches.get("a")
        expect(b).toBe("b");

        let secondB = caches.get("a")
        expect(secondB).toBe(null)

        expect(caches.get("b")).toBe("c")
        expect(caches.get("b")).toBe(null)
    }
)

test('without key', () => {
        let caches = new Cache();
        expect(caches.get("a")).toBe(null)
    }
)

test("many times", () => {

    let caches = new Cache();
    caches.add("a", "b", 3)
    caches.add("b", "c", 1)

    expect(caches.get("a")).toBe("b")
    expect(caches.get("a")).toBe("b")
    expect(caches.get("b")).toBe("c")
    expect(caches.get("b")).toBe(null)
    expect(caches.get("a")).toBe("b")
    expect(caches.get("a")).toBe(null)

})

test("zero times or less", ()=>{
    let caches = new Cache();
    caches.add("a", "b", 0)
    caches.add("b", "c", -1)

    expect(caches.get("b")).toBe(null)
    expect(caches.get("a")).toBe(null)

})

test("logs tests", () =>{
    let caches = new Cache();


    caches.add("a", "b", 0)
    caches.add("b", "b", 3)
    caches.get("b")
    caches.get("c")

    let logs =caches.getLogs()
    let testLogs =[{method : "add", key: "a", value: "b", timesLeft: 0},
        {method : "add", key: "b", value: "b", timesLeft: 3},
        {method : "get", key: "b", value: "b", timesLeft: 3},
        {method : "get", key: "c", value: null, timesLeft: -1},
    ]
    expect(logs).toEqual(testLogs)
})
