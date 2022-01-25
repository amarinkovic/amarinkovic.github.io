module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "amarinkovic",
  },
  plugins: [
    // https://www.gatsbyjs.com/plugins/gatsby-remark-prismjs
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          // `gatsby-remark-prismjs`,
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              showLineNumbers: true,
              classPrefix: "language-",
              prompt: {
                user: "aleksandar",
                host: "localhost",
                global: false,
              },
            }
          }
        ]
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `blog`,
        path: `${__dirname}/blog`,
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-plugin-mdx",
    "gatsby-transformer-sharp",
    "gatsby-theme-blog", 
    "gatsby-theme-blog-darkmode"
  ],
};
