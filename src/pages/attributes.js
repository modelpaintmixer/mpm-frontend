import React from "react"
import PropTypes from "prop-types"
import ScaleLoader from "react-spinners/ScaleLoader"

import useDataApi from "../utils/data-api"
import Layout from "../components/layout"
import SEO from "../components/seo"

const OneAttribute = ({ attribute }) => (
  <div>
    <h3>
      <a href={`/attribute/?id=${attribute.id}`}>{attribute.name}</a>
    </h3>
    <p>{attribute.description}</p>
    <p>
      {attribute.paint_count === 0
        ? "No paints"
        : attribute.paint_count === 1
        ? "1 paint"
        : `${attribute.paint_count} paints`}
    </p>
  </div>
)

OneAttribute.propTypes = {
  attribute: PropTypes.object.isRequired,
  key: PropTypes.string,
}

const AttributesPage = () => {
  const [{ data, loading, error }] = useDataApi("/api/view/attributes", {
    data: {},
  })
  let content

  if (error) {
    content = (
      <div className="text-block">
        <h3>An Error Occurred</h3>
        <p>An error occurred trying to load all the attributes:</p>
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
    content = data.attributes.map((attribute, index) => (
      <OneAttribute key={index} attribute={attribute} />
    ))
  }

  return (
    <>
      <SEO title="All Attributes" />
      <Layout title="All Attributes">
        <div className="text-block">{content}</div>
      </Layout>
    </>
  )
}

export default AttributesPage
