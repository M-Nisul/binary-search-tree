import Node from './node.mjs'

class Tree{
    constructor(arr){
        this.root = this.buildTree(this.clean(arr));
    }

    buildTree(arr, start = 0, end = arr.length - 1){
        if(start > end) return null;

        const mid = Math.floor((start + end) / 2);
        const root = new Node(arr[mid]);

        root.left = this.buildTree(arr, start, mid - 1);
        root.right = this.buildTree(arr, mid + 1, end);

        return root;
    }

    clean(arr){
        const output = arr.sort((a, b) => a - b);

        for(let i = output.length - 1; i > 0;i--){
            if(output[i] == output[i - 1]){
                output.splice(i, 1);
            }
        }

        return output;
    }

    insert(data, root = this.root){
        if(root == null){
            root = new Node(data);
            return root;
        }else if(data > root.data){
            root.right = this.insert(data, root.right);
        }else if(data < root.data){
            root.left = this.insert(data,root.left);
        }

        return root;
    }

    deleteItem(data, root = this.root){
        if(root == null){
            return root;
        }else if(data < root.data){
            root.left = this.deleteItem(data,root.left);
        }else if(data > root.data){
            root.right = this.deleteItem(data, root.right)
        }else if(data == root.data){
            if(root.left == null){
                return root.left;
            }else if(root.right == null){
                return root.right
            }

            //finds the smallest value in the right subtree
            root.data = this.minValue(root.right);

            root.right = this.deleteItem(root.data, root.right);

        }

        return root;
    }

    minValue(root){
        let minv = root.data;
        while(root.left !== null){
            minv = root.left.data;
            root = root.left;
        }
        return minv;
    }

    find(data, root = this.root){
        if(root == null){
            return root;
        }else if(root.data !== data){
            if(root.data > data){
                return this.find(data, root.left);
            }else{
                return this.find(data, root.right);
            }
        }

        return root;
    }

    levelOrder(callback){
        if(!this.root) return [];
        const queue = [this.root];
        const arr = [];
        while(queue.length){
            let level = [];
            let size = queue.length;
            for(let i = 0; i < size;i++){
                const node = queue.shift();
                level.push(node);
                if(node.left) queue.push(node.left);
                if(node.right) queue.push(node.right);
                if(callback) callback(node);
            }

            arr.push(level);
        }

        if(!callback) return arr;
    }

    levelOrderRec(callback, queue = [this.root]){
        const arr = [];
        if(!this.root) return [];
        while(queue.length){
            let node = queue.shift();
            arr.push(node.data)
            if(node.left) {
                queue.push(node.left);
            };
            if(node.right) queue.push(node.right);
            if(callback) callback(node.data);    
        }  
        if(!callback) return arr;
    }

    inOrder(root = this.root, callback, arr = []){
        if(!this.root) return [];
        if(!root) return;
        this.inOrder(root.left, callback, arr);
        callback ? callback(root) : arr.push(root.data);
        this.inOrder(root.right, callback, arr);
        if(!callback) return arr;
    }

    preOrder(root = this.root, callback, arr = []){
        if(!this.root) return [];
        if(!root) return;
        if(callback) callback(root);
        arr.push(root.data);
        this.preOrder(root.left, callback, arr);
        this.preOrder(root.right, callback, arr);
        if(!callback) return arr;
    }

    postOrder(root = this.root, callback, arr = []){
        if(!this.root) return [];
        if(!root) return;
        this.postOrder(root.left, callback, arr);
        this.postOrder(root.right, callback, arr);
        if(callback) callback(root);
        arr.push(root.data);
        if(!callback) return arr;
    }

    depth(node, root = this.root, depth = 0){
        if(!this.root) return -1;
        if(root.data === node) return depth;
        if(node < root.data) return this.depth(node, root.left, depth + 1);
        if(node > root.data) return this.depth(node, root.right, depth + 1);
    }

    height(root = this.root, node, height = -1){
        if(!root) return -1;
        
        const left = this.height(root.left,node);
        const right = this.height(root.right, node);

        const ans = Math.max(left, right) + 1;

        if(node === root.data){
            height = ans;
            return height;
        }

        return ans;
    } 

    isBalanced(root = this.root){
        const left = this.height(root.left); 
        const right = this.height(root.right);

        if(left - right == 0 || left - right == 1 || right - left == 0 || right - left == 1){
            return true;
        }

        return false;
    }

    reBalance(){
        const arr = this.inOrder();

        this.buildTree(arr);
    }
}

export default Tree;