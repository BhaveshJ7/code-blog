import React, { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "gatsby"
import { slugify } from "../util/utilityFunctions"
import he from "he" // Import the he library

const MediumAxios = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios
      .get(
        "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/opsnetic"
      )
      .then(response => setPosts(response.data.items))
      .catch(error => {
        console.error("Error fetching data:", error)
      })
  }, [])

  return (
    <div>
      <h1>Option 3</h1>
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const decodedTitle = he.decode(post.title) // Decode HTML entities in the title
          const slug = slugify(decodedTitle, { lower: true })

          return (
            <li key={post.guid}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <a key={post.guid} href={post.link}></a>
                  <Link to={`/blog/${slug}`} target="_blank">
                    {" "}
                    {/* Changed target to "_blank" to open in a new tab */}
                    <h2>{decodedTitle}</h2> {/* Render the decoded title */}
                  </Link>
                  <small>{post.pubDate}</small>
                </header>
              </article>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default MediumAxios
