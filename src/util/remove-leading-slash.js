const visit = require("remark-visit")

function removeLeadingSlash(node) {
  if (typeof node.url === "string" && node.url.startsWith("/")) {
    node.url = node.url.slice(1) // Remove leading slash
  }
}

module.exports = function remarkRemoveLeadingSlash() {
  return function transform(ast) {
    visit(ast, "image", removeLeadingSlash)
    return ast
  }
}
