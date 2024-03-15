import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import he from "he"

const Blog = ({ pageContext }) => {
  const data = useStaticQuery(graphql`
    {
      allFeedMediumBlog {
        edges {
          node {
            title
            link
            content {
              encoded
            }
          }
        }
      }

      feedMediumBlog {
        title
        link
        content {
          encoded
        }
      }
    }
  `)

  const post = data.allFeedMediumBlog.edges.find(
    edge => edge.node.link === pageContext.item.link
  )?.node

  if (!pageContext || !post) return null // Check if pageContext or post is null
  const { item } = pageContext

  // Decode HTML entities in the title
  const decodedTitle = he.decode(post.title)

  return (
    <div>
      <header>
        <h1>{decodedTitle}</h1> {/* Render the decoded title */}
      </header>
      <body>
        <p dangerouslySetInnerHTML={{ __html: post.content.encoded }} />
      </body>
      <footer>
        <p>© 2024 Your Blog</p>
      </footer>
    </div>
  )
}

export default Blog
