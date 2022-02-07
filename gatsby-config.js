module.exports = {
  siteMetadata: {
    siteUrl: "https://amarinkovic.github.io",
    title: "amarinkovic",
    author: "amarinkovic"
  },
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
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
    "gatsby-theme-blog-darkmode",
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
          shortname: `amarinkovic`
      }
  }
  ],
};
