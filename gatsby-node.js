const path = require("path");

exports.createPages = ({
  boundActionCreators,
  graphql
}) => {
  const { createPage } = boundActionCreators
  const postTemplate = path.resolve(`src/template/blog-post.js`);
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            html
            id
            frontmatter {
              path
              title
              author
              date
            }
          }
        }
      }
    }
  `).then(res => {
    if(res.error) {
      return Promise.reject(res.errors)
    }

    res.data.allMarkdownRemark.edges.forEach(({node}) => {
      createPage({
        path: node.frontmatter.path,
        component: postTemplate
      })
    })
  })
}
