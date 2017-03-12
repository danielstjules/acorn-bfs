/**
 * Cache for getChildren, holding the keys to traverse for a given Node type.
 */
var childKeys = {};

/**
 * Returns a given node's children as an array of nodes. Designed for use
 * with acorn's ASTs.
 *
 * @param   {Node}   The node for which to retrieve its children
 * @returns {Node[]} An array of child nodes
 */
function getChildren(node) {
  var res = [];

  if (!childKeys[node.type]) {
    childKeys[node.type] = Object.keys(node).filter(function(key) {
      return typeof node[key] === 'object';
    });
  }

  childKeys[node.type].forEach(function(key) {
    var val = node[key];
    if (val instanceof Array) {
      res = res.concat(val);
    } else if (val && val.type) {
      res.push(val);
    }
  });

  return res;
}

/**
 * Returns an array of nodes in the passed AST, traversed using BFS. Accepts an
 * optional maximum number, n, of nodes to return. The returned array always
 * begins with the root node.
 *
 * @param {Node} node The root node of the AST to traverse
 * @param {int}  [n]  Optional max number of nodes to return
 */
module.exports = function(node, n) {
  var queue, res, i, children;

  queue = [node];
  res = [node];

  while (queue.length > 0) {
    node = queue.shift();

    if (n && res.length >= n) {
      return res.slice(0, n);
    }

    children = getChildren(node) || [];
    for (i = 0; i < children.length; i++) {
      queue.push(children[i]);
      res.push(children[i]);
    }
  }

  return res.slice(0, n);
};
