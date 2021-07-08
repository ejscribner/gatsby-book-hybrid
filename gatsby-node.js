/**
 * Implement Gatsby's Node APIs in this file.
 *
 * This runs in node env when gatsby generates new version of our site
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const path = require('path');

exports.onCreateWebpackConfig = ({ actions, stage }) => {
  if (stage === "develop-html" || stage === "build-html") {
    actions.setWebpackConfig({
      resolve: {
        mainFields: ["main"],
      },
    })
  } else {
    actions.setWebpackConfig({
      resolve: {
        mainFields: ["browser", "module", "main"],
      },
    })
  }
}

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
        context: { bookId: book.node.id } // we can pass in bookID and just query the book directly from bookTemplate
      });
    });

  });
}
