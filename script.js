
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
    find(key, base = this.root) {
        if (base == null || base.data == key) return base

        if (base.data < key) {
            return this.find(key, base.right)
        } else {
            return this.find(key, base.left)
        }
    }
    insert(key, base = this.root) {
        if (base.data == key) return base

        if (base.data < key) {
            if (base.right == null) {
                let newNode = new Node(key)
                base.right = newNode
            }
            return this.insert(key, base.right)
        } else {
            if (base.left == null) {
                let newNode = new Node(key)
                base.left = newNode
            }
            return this.insert(key, base.left)
        }
    }
    delete(key, base = this.root) {
        /* Base Case: If the tree is empty */
        if (base == null)
            return base;
        /* Otherwise, recur down the tree */
        if (key < base.data)
            base.left = this.delete(key, base.left);
        else if (key > base.data)
            base.right = this.delete(key, base.right);
        // if key is same as root's
        // key, then This is the
        // node to be deleted
        else {
            // node with only one child or no child
            if (base.left == null)
                return base.right;
            else if (base.right == null)
                return base.left;
            // node with two children: Get the inorder
            // successor (smallest in the right subtree)
            base.data = minValue(base.right);
            // Delete the inorder successor
            base.right = this.delete(base.data, base.right);
        }
        return base;
        function minValue(root) {
            let minv = root.data;
            while (root.left != null) {
                minv = root.left.data;
                root = root.left;
            }
            return minv;
        }
    }
}

let test = [1, 5, 6, 7, 1, 3, 6, 8, 3, 5, 6, 7, 90, 1, 3, 7, 15, 6, 4, 346, 1, 762]

let tree1 = new Tree(test)

prettyPrint(tree1.root)
tree1.insert(8)
tree1.insert(4.4)
tree1.delete(90)


