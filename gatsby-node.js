/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */
// exports.createPages = async ({ actions }) => {
//   const { createPage } = actions
//   createPage({
//     path: "/using-dsg",
//     component: require.resolve("./src/templates/using-dsg.js"),
//     context: {},
//     defer: true,
//   })
// }

const path = require("path")
const { slugify } = require("./src/util/utilityFunctions")
const he = require("he") // Import the he library for decoding HTML entities
const fetch = require("node-fetch")

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === "MarkdownRemark") {
    // Decode HTML entities in the title before generating the slug
    const decodedTitle = he.decode(node.frontmatter.title)
    const slugFromTitle = slugify(decodedTitle)
    createNodeField({
      node,
      name: "slug",
      value: slugFromTitle,
    })
  }
}

// exports.createPages = ({ actions, graphql }) => {
//   const { createPage } = actions

//   // Page templates
//   const SinglePostTemplate = path.resolve("src/templates/single-post.js")

//   return graphql(`
//     {
//       allMarkdownRemark {
//         edges {
//           node {
//             frontmatter {
//               author
//               tags
//             }
//             fields {
//               slug
//             }
//           }
//         }
//       }
//     }
//   `).then(res => {
//     if (res.errors) return Promise.reject(res.errors)

//     // Extracting all posts from res
//     const posts = res.data.allMarkdownRemark.edges

//     // Create single post pages
//     posts.forEach(({ node }) => {
//       createPage({
//         path: node.fields.slug,
//         component: SinglePostTemplate,
//         context: {
//           // Passing slug for template to use to fetch the post
//           slug: node.fields.slug,
//         },
//       })
//     })
//   })
// }

// module.exports.createPages = async ({ actions: { createPage } }) => {
//   const username = "opsnetic"
//   const mediumRss = `https://medium.com/feed/${username}`
//   const ENDPOINT = `https://api.rss2json.com/v1/api.json?rss_url=${mediumRss}`

//   const response = await fetch(ENDPOINT)
//   const json = await response.json()

//   // on successful fetch
//   if (json.status === "ok") {
//     // Create page to list blogs
//     createPage({
//       path: `/blog`,
//       component: require.resolve("./src/templates/BlogHome/BlogHome.js"),
//       context: { mediumBlogs: json.items },
//     })
//     console.log(`Page created at /blog`)

//     // Create blog pages for individual posts
//     json.items.forEach(item => {
//       const slug = item.title.toLowerCase().split(" ").join("-")
//       createPage({
//         path: `/blog/${slug}`,
//         component: require.resolve("./src/templates/Blog/blog.js"),
//         context: { item, url: `http://localhost:8000/blog/${slug}` },
//       })
//       console.log("Page created at " + `/blog/${slug}`)
//     })
//   }
// }

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  // Page templates
  const SinglePostTemplate = path.resolve("src/templates/single-post.js")
  const BlogHomeTemplate = require.resolve(
    "./src/templates/BlogHome/BlogHome.js"
  )
  const BlogTemplate = require.resolve("./src/templates/Blog/blog.js")

  // Query to create pages from markdown files
  const markdownQuery = await graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              author
              tags
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  // Handling errors from the markdown query
  if (markdownQuery.errors) {
    return Promise.reject(markdownQuery.errors)
  }

  // Extracting all posts from the markdown query result
  const markdownPosts = markdownQuery.data.allMarkdownRemark.edges

  // Create single post pages from markdown
  markdownPosts.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: SinglePostTemplate,
      context: {
        // Passing slug for template to use to fetch the post
        slug: node.fields.slug,
      },
    })
  })

  // Fetch data from Medium RSS feed
  const username = "BhaveshJagtap"
  const mediumRss = `https://medium.com/feed/@${username}`
  const ENDPOINT = `https://api.rss2json.com/v1/api.json?rss_url=${mediumRss}`

  const response = await fetch(ENDPOINT)
  const json = await response.json()

  // on successful fetch
  if (json.status === "ok") {
    // Create page to list blogs
    createPage({
      path: `/blog`,
      component: BlogHomeTemplate,
      context: { mediumBlogs: json.items },
    })
    console.log(`Page created at /blog`)

    // Create blog pages for individual posts from Medium
    json.items.forEach(item => {
      // Decode HTML entities in the title before generating the slug
      const decodedTitle = he.decode(item.title)
      const slug = slugify(decodedTitle)
      createPage({
        path: `/blog/${slug}`,
        component: BlogTemplate,
        context: { item, url: `http://localhost:8000/blog/${slug}` },
      })
      console.log("Page created at " + `/blog/${slug}`)
    })
  }
}
