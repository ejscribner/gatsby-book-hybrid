module.exports = {
  siteMetadata: {
    title: `Gatsby Learning - Book Club`,
    description: `A HYBRID site created to learn more about Gatsby.js`,
    author: `@ejscribner`,
  },
  plugins: [
    { // download and generate URLs for images from firebase
      resolve: `gatsby-plugin-remote-images`,
      options: {
        nodeType: 'Book', // refrences the book node type created in allBook query
        imagePath: 'imageUrl',
      },
    },
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-firesource',
      options: {
        credential: require('./firebase.json'),
        types: [
          {
            type: 'Book',
            collection: 'books',
            map: doc => ({ // maps data (each doc) from firestore to objects we can query using graphQL
              title: doc.title,
              summary: doc.summary,
              imageUrl: doc.imageUrl,
              author___NODE: doc.author.id, // ___NODE allows us to query author ref from graphQL (defines key?)
            })
          },
          {
            type: 'Author',
            collection: 'authors',
            map: doc => ({ // maps data (each doc) from firestore to objects we can query using graphQL
              name: doc.name,
            })
          }
        ]
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
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
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
