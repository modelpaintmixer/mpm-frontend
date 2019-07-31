module.exports = {
  siteMetadata: {
    title: `Model Paint Mixer`,
    description: `A site for finding and exchanging custom paint mixes`,
    author: `@rjray`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          default: require.resolve("./src/components/md-layout.js"),
        },
      },
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `ModelPaintMixer.com`,
        short_name: `PaintMixer`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `browser`,
        icon: `src/images/mpm-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
  ],
}
