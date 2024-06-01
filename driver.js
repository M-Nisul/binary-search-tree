import Tree from "./tree.mjs";
import prettyPrint from "./prettyPrint.mjs";

const randomArr = (length) => {
    return Array.from({length: length}, () => Math.floor(Math.random() * 100));
}

console.log(randomArr(30));

const tree = new Tree(randomArr(30));

prettyPrint(tree.root);

//prints out elements in search styles
console.log(tree.inOrder());
console.log(tree.levelOrderRec());
console.log(tree.postOrder());
console.log(tree.preOrder());

//check if balanced and if not balance the tree
console.log('Balanced:' + tree.isBalanced());

if(tree.isBalanced() !== true){
    tree.reBalance();
    console.log('Balanced:' + tree.isBalanced());
}

//prints out elements in search styles(again!)
console.log(tree.inOrder());
console.log(tree.levelOrderRec());
console.log(tree.postOrder());
console.log(tree.preOrder());