import * as React from "react"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"

const TeamPage = () => (
  <Layout>
    <Seo title="Team" keywords={["gatsby", "application", "react"]} />
    <div className={styles.textCenter}>
      <h1>Our Team</h1>
    </div>
  </Layout>
)

export default TeamPage
