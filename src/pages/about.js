import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"

const AboutPage = () => (
  <Layout>
    <Seo title="About" keywords={["gatsby", "application", "react"]} />
    <div className={styles.textCenter}>
      <h1>About us</h1>
    </div>
  </Layout>
)

export default AboutPage
