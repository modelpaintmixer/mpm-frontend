import React from "react"
import PropTypes from "prop-types"
import ScaleLoader from "react-spinners/ScaleLoader"

import useDataApi from "../utils/data-api"
import RenderMarkdown from "../components/render-markdown"
import Layout from "../components/layout"
import SEO from "../components/seo"

const OnePeriod = ({ period }) => (
  <div style={{ marginBottom: "1rem" }}>
    <h3>
      <a href={`/period/?id=${period.id}`} title={period.abbreviation}>
        {period.name}
      </a>
    </h3>
    {period.notes === null ? (
      ""
    ) : (
      <RenderMarkdown>{period.notes}</RenderMarkdown>
    )}
  </div>
)

OnePeriod.propTypes = {
  period: PropTypes.object.isRequired,
  key: PropTypes.string,
}

const PeriodsPage = () => {
  const [{ data, loading, error }] = useDataApi("/api/period", {
    data: {},
  })
  let content

  if (error) {
    content = (
      <div className="text-block">
        <h3>An Error Occurred</h3>
        <p>An error occurred trying to load all the periods:</p>
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
    let periods = data.periods.sort((a, b) => a.fromYear - b.fromYear)
    content = periods.map((period, index) => (
      <OnePeriod key={index} period={period} />
    ))
  }

  return (
    <>
      <SEO title="All Periods" />
      <Layout title="All Periods">
        <div className="text-block">{content}</div>
      </Layout>
    </>
  )
}

export default PeriodsPage
