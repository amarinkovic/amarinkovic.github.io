import * as React from 'react'
import Layout from '../components/layout'
import { StaticImage } from 'gatsby-plugin-image'

const IndexPage = () => {
  return (
    <Layout pageTitle="Welcome, I am delighted to have you here!">
      <StaticImage
        alt="No!"
        src="../images/grumpy2.jpg"
      />
    </Layout>
  )
}

export default IndexPage