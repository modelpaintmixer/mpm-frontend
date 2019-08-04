const { createFilePath } = require("gatsby-source-filesystem")

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  // Not currently use MDX nodes
  if (node.internal.type === "Mdx") {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: "slug",
      node,
      value: value,
    })
  }
}

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  let matched = page.path.match(
    /^\/(paint|color|origin|period|standard|attribute|manufacturer)\//
  )
  if (matched) {
    page.matchPath = `/${matched[1]}/*`

    createPage(page)
  }
}
