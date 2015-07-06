# acorn-bfs

Breadth-first search traversal of an acorn-generated AST.

``` javascript
/**
 * Returns an array of nodes in the passed AST, traversed using BFS. Accepts an
 * optional maximum number, n, of nodes to return. The returned array always
 * begins with the root node.
 *
 * @param {Node} node The root node of the AST to traverse
 * @param {int}  [n]  Optional max number of nodes to return
 */
```

#### Example

``` javascript
var acorn = require('acorn');
var bfs   = require('acorn-bfs');

var ast = acorn.parse('function test() {\n' +
'  return true;\n'+
}\n');

bfs(ast).map(function(node) {
  return node.type;
});

// =>
// ['Program', 'FunctionDeclaration', 'BlockStatement',
//  'ReturnStatement', 'Literal']
```