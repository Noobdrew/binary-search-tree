
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
        this.array = this.mergeSort(array)
        this.root = this.buildTree()
    }
    setStart() {
        this.array
    }
    setEnd() {
        let endValue = this.array.length - 1
        return endValue
    }
    buildTree(arr = this.array, start = 0, end = this.array.length - 1) {
        if (start > end) {
            return null
        }

        let mid = parseInt((start + end) / 2);
        let node = new Node(arr[mid])

        node.left = this.buildTree(arr, start, mid - 1)
        node.right = this.buildTree(arr, mid + 1, end)

        return node
    }
    mergeSort(arr = this.array) {
        // Base case
        if (arr.length <= 1) return arr
        let mid = Math.floor(arr.length / 2)
        // Recursive calls
        let left = this.mergeSort(arr.slice(0, mid))
        let right = this.mergeSort(arr.slice(mid))

        function merge(left, right) {
            let sortedArr = [] // the sorted items will go here
            while (left.length && right.length) {
                // Insert the smallest item into sortedArr
                if (left[0] == right[0]) {
                    right.shift()
                }
                else if (left[0] < right[0]) {
                    sortedArr.push(left.shift())
                } else {
                    sortedArr.push(right.shift())
                }
            }
            // Use spread operators to create a new array, combining the three arrays
            return [...sortedArr, ...left, ...right]
        }
        return merge(left, right)
    }

}

let test = [1, 3, 3, 3, 4, 5, 2]

let tree1 = new Tree(test)
console.log(tree1.root)
prettyPrint(tree1.root)

