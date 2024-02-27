// import React from "react"
// import MediumRssFeed from "../../components/medium-rss-feed"

// interface MediumBlog {
//   title: string;
//   pubDate: string;
//   link: string;
//   guid: string;
//   author: string;
//   thumbnail: string;
//   description: string;
//   content: string;
//   enclosure: object;
//   categories: string[];
// }

// interface BlogHomeProps {
//   pageContext: {
//     mediumBlogs: MediumBlog[],
//   };
// }

// const BlogHome: React.FC<BlogHomeProps> = ({
//   pageContext: { mediumBlogs },
// }) => {
//   console.log(mediumBlogs)

//   return (
//     <div>
//       <header>
//         <h1>Your Blog Titles</h1>
//       </header>
//       <main>
//         <MediumRssFeed />
//       </main>
//       <footer>
//         <p>© 2024 Your Blog</p>
//       </footer>
//     </div>
//   )
// }

// export default BlogHome

import React from "react"
import MediumAxios from "../../components/medium-axios"

const BlogHome = ({ pageContext: { mediumBlogs } }) => {
  console.log(mediumBlogs)

  return (
    <div>
      <header></header>
      <main>
        <MediumAxios />
      </main>
      <footer></footer>
    </div>
  )
}

export default BlogHome
