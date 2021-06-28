/**
 * Implement Gatsby's Node APIs in this file.
 *
 * This runs in node env when gatsby generates new version of our site
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const path = require('path');

// gatsby expects createPages() func, would not work w/ diff name
exports.createPages = ({graphql, actions}) => {
  // under the hood, actions refers to redux actions
  const {createPage} = actions;
  const bookTemplate = path.resolve('src/templates/bookTemplate.js');

  // query books and return them, this is a promise
  return graphql(`
    query MyQuery {
      allBook {
        edges {
          node {
            id
            summary
            title
            localImage {
              childImageSharp {
                fixed(width:200) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            author {
              name
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      throw result.errors;
    }

    // result is the same thing we had on index page
    result.data.allBook.edges.forEach((book) => {
      createPage({ // loops through all books and dynamically creates root for us based on book id
        path: `/book/${book.node.id}`,
        component: bookTemplate, // need a component to render with these options
        context: book.node // passes in book data to bookTemplate + maps to props.pageContext (propery)
      });
    });

  });
}
