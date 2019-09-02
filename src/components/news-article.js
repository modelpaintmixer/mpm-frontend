import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import styled from "styled-components"

import RenderMarkdown from "./render-markdown"
import { CombinedDate } from "./date-format"

const Headline = styled.p`
  font-weight: bold;
  margin-bottom: 0;
  margin-top: 0.75rem;
  font-size: 110%;
`

const NewsArticle = ({ article }) => (
  <>
    <Headline id={article.slug}>{article.headline}</Headline>
    <p style={{ fontSize: "75%" }}>
      By{" "}
      <Link to={`/user/username=${article.User.username}`}>
        {article.User.username}
      </Link>
      , <CombinedDate date={article.updatedAt} />
    </p>
    <div>
      <RenderMarkdown>{article.content}</RenderMarkdown>
    </div>
  </>
)

NewsArticle.propTypes = {
  key: PropTypes.number,
  article: PropTypes.object.isRequired,
}

export default NewsArticle
