import * as React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../../components/layout'
import { Disqus } from 'gatsby-plugin-disqus';

const BlogPost = ({data}) => {
  
  const image = getImage(data.mdx.frontmatter.hero_image)
  const disqusConf = {
    url: `https://${data.site.host}/blog/${data.mdx.slug}`,
    identifier: data.mdx.id,
    title: data.mdx.frontmatter.title,
  }

  return (
    <Layout pageTitle={data.mdx.frontmatter.title}>
      <p>Posted: {data.mdx.frontmatter.date}</p>
      <GatsbyImage
        image={image}
        alt={data.mdx.frontmatter.hero_image_alt}
      />
      <p>
        <em>
          Photo Credit:{" "}
          <a href={data.mdx.frontmatter.hero_image_credit_link}>
            {data.mdx.frontmatter.hero_image_credit_text}
          </a>
        </em>
      </p>
      <MDXProvider>
        <MDXRenderer localImages={data.mdx.frontmatter.embeddedImagesLocal}>
          {data.mdx.body}
        </MDXRenderer>
      </MDXProvider>
      <Disqus config={disqusConf} />
    </Layout>
  )
}

export const query = graphql`
  query($id: String) {
    site {
      host
      port
    }
    mdx(id: {eq: $id}) {
      slug
      body
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        hero_image_alt
        hero_image_credit_link
        hero_image_credit_text
        hero_image {
          childImageSharp {
            gatsbyImageData
          }
        }
        embeddedImagesLocal {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED)
          }
        }
      }
    }
  }
`

export default BlogPost