import React from "react"
import ScaleLoader from "react-spinners/ScaleLoader"

import useDataApi from "../utils/data-api"
import SEO from "../components/seo"
import Layout from "../components/layout"
import NewsArticle from "../components/news-article"

const NewsPage = () => {
  const [{ data, loading, error }] = useDataApi("/api/newsitem", { data: {} })
  let content

  if (error) {
    content = (
      <div className="text-block">
        <h3>An Error Occurred</h3>
        <p>An error occurred trying to load news:</p>
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
    content = data.newsitems.map((item, index) => (
      <NewsArticle key={index} article={item} />
    ))
  }

  return (
    <>
      <SEO title="Latest Site News" />
      <Layout title="Latest Site News">
        <div className="text-block">{content}</div>
      </Layout>
    </>
  )
}

export default NewsPage
