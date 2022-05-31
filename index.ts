import {MyTree} from "./MyTree.js";
import * as readlineSync from "readline-sync"

const tree = new MyTree<number>()
console.log("Tree created!")

while (true) {
    let num = readlineSync.question("\nEnter (1 - 'add', 2 - 'search', 3 - 'display', 4 - 'delete', 5 - exit): ")
    let command = Number(num)

    if (command === 1) {
        let key = readlineSync.question("Enter key to 'add': ")
        tree.add(Number(key))
    }
    else if (command === 2) {
        let key = readlineSync.question("Enter key to 'search': ")
        let node = tree.search(Number(key))
        if (!node) { console.log("Key not found!") }
        else { console.log("Key exist!") }
    }
    else if (command === 3) {
        console.log("Your tree:")
        tree.display(tree.root)
        console.log()
    }
    else if (command === 4) {
        let key = readlineSync.question("Enter key to 'delete': ")
        tree.delete(Number(key))
    }
    else if (command === 5) {
        console.log("Bye, have a nice day!)")
        break
    }
    else { console.log("Non-existent command — try again!") }
}