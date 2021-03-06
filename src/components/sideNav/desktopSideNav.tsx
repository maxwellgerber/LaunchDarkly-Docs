/** @jsx jsx */
import { jsx } from 'theme-ui'
import { graphql, useStaticQuery } from 'gatsby'
import TreeNode from './treeNode'
import { findRootTopic } from '../../utils/navigationDataUtils'

const DesktopSideNav = () => {
  const {
    site: { pathPrefix },
    allNavigationData: { nodes: navigationData },
    rootTopics: { nodes: topics },
  } = useStaticQuery(graphql`
    query {
      site {
        pathPrefix
      }

      allNavigationData: allNavigationDataJson {
        nodes {
          items {
            label
            path
            svg
            flagKey
            items {
              path
              label
              flagKey
              items {
                label
                path
                flagKey
              }
            }
          }
          label
          path
        }
      }

      rootTopics: allRootTopicsJson {
        nodes {
          path
          allItems
        }
      }
    }
  `)

  const currentNode = findRootTopic(topics, navigationData, pathPrefix)
  if (!currentNode) {
    if (typeof window !== 'undefined') {
      console.error(`Can't find root topic! pathPrefix: ${pathPrefix}`)
    }
    return null
  }
  return (
    <nav
      sx={{
        gridArea: 'sideNav',
        bg: 'grayWash',
        display: ['none', 'block'],
        borderRight: '1px solid',
        borderColor: 'grayMed',
        pt: 4,
      }}
    >
      <TreeNode nodes={currentNode.items} />
    </nav>
  )
}

export default DesktopSideNav
