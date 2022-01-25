import * as React from 'react'
import Layout from '../components/layout'
import { StaticImage } from 'gatsby-plugin-image'

const IndexPage = () => {
  return (
    <Layout pageTitle="Aleksandar's website">
      <p>Welcome, delighted to see you here!</p>
      <StaticImage
        alt="No!"
        src="../images/grumpy2.jpg"
      />
    </Layout>
  )
}

export default IndexPage