
const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

class Node {
    constructor(data) {
        this.data = data
        this.left = null
        this.right = null
    }
}

class Tree {
    constructor(array) {
        this.array = array
        this.root = this.buildTree()
    }
    setStart() {
        this.array
    }
    setEnd() {
        let endValue=this.array.length-1
       return endValue
    }
    buildTree(arr=this.array, start=0, end= this.array.length-1) {
        if (start > end) {
            return null
        }

        let mid = parseInt((start + end) / 2);
        let node = new Node(arr[mid])

        node.left = this.buildTree(arr, start, mid - 1)
        node.right = this.buildTree(arr, mid + 1, end)
        
        return node
    }

}

let test = [1, 2, 3, 4, 5]

let tree1 = new Tree(test)
console.log(tree1.root)
prettyPrint(tree1.root)




