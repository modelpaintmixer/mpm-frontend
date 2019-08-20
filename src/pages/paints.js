import React from "react"
import ScaleLoader from "react-spinners/ScaleLoader"

import useDataApi from "../utils/data-api"
import Layout from "../components/layout"
import PaintBlocks from "../components/paint-blocks"
import SEO from "../components/seo"

const PaintsPage = () => {
  const [{ data, loading, error }] = useDataApi("/api/paint", { data: {} })
  let content

  if (error) {
    content = (
      <div className="text-block">
        <h3>An Error Occurred</h3>
        <p>An error occurred trying to load all the paints:</p>
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
    let paints = data.paints
    let count = paints.length
    content = (
      <div className="text-block">
        <h3>{count} Paints in Database</h3>
        <PaintBlocks paints={paints} />
      </div>
    )
  }

  return (
    <>
      <SEO title="All Paints" />
      <Layout title="All Paints">{content}</Layout>
    </>
  )
}

export default PaintsPage
