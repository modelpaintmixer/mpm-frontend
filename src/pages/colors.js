import React from "react"
import ScaleLoader from "react-spinners/ScaleLoader"

import useDataApi from "../utils/data-api"
import Layout from "../components/layout"
import ColorBlocks from "../components/color-blocks"
import SEO from "../components/seo"

const ColorsPage = () => {
  const [{ data, loading, error }] = useDataApi("/api/color", { data: {} })
  let content

  if (error) {
    content = (
      <div className="text-block">
        <h3>An Error Occurred</h3>
        <p>An error occurred trying to load all the colors:</p>
        <p>{error.message}</p>
      </div>
    )
  } else if (loading) {
    content = (
      <div className="text-block">
        <div className="loading">
          <ScaleLoader />
        </div>
      </div>
    )
  } else {
    let colors = data.colors
    let count = colors.length
    content = (
      <div className="text-block">
        <h3>{count} Colors in Database</h3>
        <ColorBlocks colors={colors} />
      </div>
    )
  }

  return (
    <>
      <SEO title="All Colors" />
      <Layout title="All Colors">{content}</Layout>
    </>
  )
}

export default ColorsPage
