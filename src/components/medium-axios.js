import React, { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "gatsby"
import { slugify } from "../util/utilityFunctions"

const MediumAxios = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    axios
      .get(
        "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/opsnetic&api_key=qdubterdf7redrqz6m7d7gjnfunxx8fvgmbuxo1t&count=20"
      )
      .then(response => setPosts(response.data.items))
  }, [])

  return (
    <div>
      <h1>Option 3</h1>
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.title
          const slug = slugify(title, { lower: true })

          return (
            <li key={post.guid}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <a key={post.guid} href={post.link}></a>
                  <Link to={`/blog/${slug}`} target="0">
                    <h2>{post.title}</h2>
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
