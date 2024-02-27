import React from "react"
import { useStaticQuery, graphql } from "gatsby"

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

  if (!pageContext) return null
  const { item } = pageContext
  console.log(item)

  return (
    <div>
      <header>
        <h1>{post.title}</h1>
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
