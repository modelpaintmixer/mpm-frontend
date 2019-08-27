import React from "react"
import ScaleLoader from "react-spinners/ScaleLoader"

import useDataApi from "../utils/data-api"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ChangeItem from "../components/change-item"

const ChangesPage = () => {
  const [{ data, loading, error }] = useDataApi("/api/stats/changes/25", {
    data: {},
  })
  let content, title

  if (error) {
    content = <p>Error: {error.message}</p>
  } else if (loading) {
    content = (
      <div className="loading">
        <ScaleLoader />
      </div>
    )
  } else {
    let changes = data.changes
    title = `${changes.length} Newest Changes`

    content = (
      <ul>
        {changes.map((item, index) => (
          <li key={index}>
            <ChangeItem item={item} />
          </li>
        ))}
      </ul>
    )
  }

  return (
    <>
      <SEO title={title} />
      <Layout title={title}>
        <div className="text-block">{content}</div>
      </Layout>
    </>
  )
}

export default ChangesPage
