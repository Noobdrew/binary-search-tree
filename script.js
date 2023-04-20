
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
    isBalanced(node = this.root) {
        if (!node) {
          return true;
        }
    
        const leftHeight = node.left ? node.left.height() : 0;
        const rightHeight = node.right ? node.right.height() : 0;
    
        if (Math.abs(leftHeight - rightHeight) > 1) {
          return false;
        }
    
        return this.isBalanced(node.left) && this.isBalanced(node.right);
      }
      rebalance() {
        // If the tree is already balanced, return early.
        if (this.isBalanced()) {
          return;
        }
        
        // Get a sorted array of the tree nodes using inorder traversal.
        let nodes = [];
        function inorder(node) {
          if (node) {
            inorder(node.left);
            nodes.push(node.data);
            inorder(node.right);
          }
        }
        inorder(this.root);
        
        // Build a new balanced tree from the sorted array.
        this.array = nodes;
        this.root = this.buildTree();
      }
    }

let test = [1, 5, 6, 7, 1, 3, 6, 8, 3, 5, 6, 7, 90, 1, 3, 7, 15, 6, 4, 346, 1, 762]

let tree1 = new Tree(test)

tree1.insert(100)
tree1.insert(101)
tree1.insert(102)
prettyPrint(tree1.root)



console.log(tree1.isBalanced())
console.log(tree1.inorder())