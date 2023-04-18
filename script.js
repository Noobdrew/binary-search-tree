
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
class Queue {
    constructor() {
        this.elements = {};
        this.head = 0;
        this.tail = 0;
    }
    enqueue(element) {
        this.elements[this.tail] = element;
        this.tail++;
    }
    dequeue() {
        const item = this.elements[this.head];
        delete this.elements[this.head];
        this.head++;
        return item;
    }
    peek() {
        return this.elements[this.head];
    }
    get length() {
        return this.tail - this.head;
    }
    get isEmpty() {
        return this.length === 0;
    }
}
class Node {
    constructor(data) {
        this.data = data
        this.left = null
        this.right = null
    }
    depth() {
        let count = 0;
        let current = this;
        while (current.parent != null) {
            count += 1;
            current = current.parent;
        }
        return count;
    }
    height() {
        // Base case: the height of a null node is 0
        if (this == null) {
            return 0;
        }
        // Recursive case: the height is 1 + the maximum height of the left and right subtrees
        let leftHeight = this.left ? this.left.height() : 0;
        let rightHeight = this.right ? this.right.height() : 0;
        return 1 + Math.max(leftHeight, rightHeight);
    }
}

class Tree {
    constructor(array) {
        this.array = this.mergeSort(array)
        this.root = this.buildTree()
    }

    buildTree(arr = this.array, start = 0, end = this.array.length - 1, parent = null) {
        if (start > end) {
            return null;
        }

        let mid = parseInt((start + end) / 2);
        let node = new Node(arr[mid]);
        node.parent = parent;

        node.left = this.buildTree(arr, start, mid - 1, node);
        node.right = this.buildTree(arr, mid + 1, end, node);

        return node;
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
                // remove duplicates
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
    levelOrder(func) {
        if (this.root == null) return
        let que = []
        let result = []

        que.push(this.root)
        while (que.length >= 1) {
            let current = que[0]

            result.push(current)
            try {
                func(current)
                if (current.left != null) que.push(current.left)
                if (current.right != null) que.push(current.right)
                que.shift()
            }
            catch {
                if (current.left != null) que.push(current.left)
                if (current.right != null) que.push(current.right)
                que.shift()
            }

        }
        console.log(result)
    }
    preorder(func, base = this.root) {
        if (base == null) return [];
        let result = [];
        result.push(base);
        if (base.left) {
            result = result.concat(this.preorder(func, base.left));
        }
        if (base.right) {
            result = result.concat(this.preorder(func, base.right));
        }
        try {
            func(base)
        }
        catch {
            return result;
        }
    }
    inorder(func, base = this.root) {
        if (base == null) return [];
        let result = [];
        if (base.left) {
            result = result.concat(this.inorder(func, base.left));
        }
        result.push(base);
        if (base.right) {
            result = result.concat(this.inorder(func, base.right));
        }
        try {
            func(base)
        }
        catch {
            return result;
        }
    }


    postorder(func, base = this.root) {
        if (base == null) return [];
        let result = [];
        if (base.left) {
            result = result.concat(this.postorder(func, base.left));
        }
        if (base.right) {
            result = result.concat(this.postorder(func, base.right));
        }
        result.push(base);
        try {
            func(base)
        }
        catch {
            return result;
        }
    }

}
let test = [1, 5, 6, 7, 1, 3, 6, 8, 3, 5, 6, 7, 90, 1, 3, 7, 15, 6, 4, 346, 1, 762]

let tree1 = new Tree(test)

prettyPrint(tree1.root)

let node = tree1.find(6)

let depth = node.depth()
let height = node.height()

console.log(node)
console.log(depth)
console.log(height)