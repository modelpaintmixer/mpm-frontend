import React from "react"
import PropTypes from "prop-types"
import ScaleLoader from "react-spinners/ScaleLoader"

import useDataApi from "../utils/data-api"
import Layout from "../components/layout"
import SEO from "../components/seo"
import RenderMarkdown from "../components/render-markdown"

const OneManufacturer = ({ manufacturer }) => (
  <div>
    <h3>
      <a href={`/manufacturer/?id=${manufacturer.id}`}>
        {manufacturer.fullName}
      </a>
    </h3>
    <p>Founded: {manufacturer.origin}</p>
    <p>
      {manufacturer.paint_count === 0
        ? "No paints"
        : manufacturer.paint_count === 1
        ? "1 paint"
        : `${manufacturer.paint_count} paints`}
    </p>
    {manufacturer.notes === null ? (
      ""
    ) : (
      <RenderMarkdown>{manufacturer.notes}</RenderMarkdown>
    )}
  </div>
)

OneManufacturer.propTypes = {
  manufacturer: PropTypes.object.isRequired,
  key: PropTypes.string,
}

const ManufacturersPage = () => {
  const [{ data, loading, error }] = useDataApi("/api/view/manufacturers", {
    data: {},
  })
  let content

  if (error) {
    content = (
      <div className="text-block">
        <h3>An Error Occurred</h3>
        <p>An error occurred trying to load all the manufacturers:</p>
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
    content = data.manufacturers.map((manufacturer, index) => (
      <OneManufacturer key={index} manufacturer={manufacturer} />
    ))
  }

  return (
    <>
      <SEO title="All Manufacturers" />
      <Layout title="All Manufacturers">
        <div className="text-block">{content}</div>
      </Layout>
    </>
  )
}

export default ManufacturersPage
