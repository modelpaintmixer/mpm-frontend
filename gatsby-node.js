/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

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
