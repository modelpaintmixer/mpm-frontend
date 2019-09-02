/* eslint-disable react/no-unescaped-entities */
import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import queryString from "query-string"
import ScaleLoader from "react-spinners/ScaleLoader"

import useDataApi from "../utils/data-api"
import SEO from "../components/seo"
import Layout from "../components/layout"
import ColorBlocks from "../components/color-blocks"
import { DateFormat, CombinedDate } from "../components/date-format"
import RenderMarkdown from "../components/render-markdown"
import { sanitizeEmail } from "../utils/textutils"

const UserPage = ({ location }) => {
  const values = queryString.parse(location.search)

  if (!values.username) {
    return (
      <>
        <h2>An Error Occurred</h2>
        <div className="text-block">
          <p>This page was requested without a user name.</p>
          <p>
            To browse all users, visit the
            <Link to="/users">All Users</Link>
            page.
          </p>
        </div>
      </>
    )
  } else {
    const [{ data, loading, error }] = useDataApi(
      `/api/view/user/${values.username}`,
      {
        data: {},
      }
    )

    if (error) {
      return (
        <div>
          <p>An error occurred trying to load data:</p>
          <p>{error.message}</p>
        </div>
      )
    } else if (loading) {
      return (
        <div className="text-block">
          <div className="loading">
            <ScaleLoader />
          </div>
        </div>
      )
    } else {
      let {
        username,
        name,
        email,
        country,
        state,
        website,
        occupation,
        interests,
        lastVisit,
        createdAt,
        Colors: colors,
      } = data.user

      email = sanitizeEmail(email)
      country = country || "United States"

      return (
        <>
          <SEO title={`User: ${username}`} />
          <Layout title={`User: ${username}`}>
            <div className="text-block">
              <div style={{ width: "100%", display: "flex" }}>
                <div style={{ textAlign: "center", flex: 1 }}>
                  <p>(No profile image)</p>
                </div>
                <div style={{ flex: 1 }}>
                  <table>
                    <tbody>
                      <tr>
                        <td>Name:</td>
                        <td>{name}</td>
                      </tr>
                      <tr>
                        <td>Email:</td>
                        <td>{email}</td>
                      </tr>
                      <tr>
                        <td>Country:</td>
                        <td>{country}</td>
                      </tr>
                      <tr>
                        <td>State/Province:</td>
                        <td>{state}</td>
                      </tr>
                      <tr>
                        <td>Website:</td>
                        <td>{website}</td>
                      </tr>
                      <tr>
                        <td>Occupation:</td>
                        <td>{occupation}</td>
                      </tr>
                      <tr>
                        <td>Joined:</td>
                        <td>
                          <DateFormat date={createdAt} />
                        </td>
                      </tr>
                      <tr>
                        <td>Last online:</td>
                        <td>
                          {lastVisit ? <CombinedDate date={lastVisit} /> : ""}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <RenderMarkdown>{interests || ""}</RenderMarkdown>
              </div>
              {colors.length === 0 ? (
                ""
              ) : (
                <>
                  <h3>User's Colors</h3>
                  <ColorBlocks colors={colors} />
                </>
              )}
            </div>
          </Layout>
        </>
      )
    }
  }
}

UserPage.propTypes = {
  location: PropTypes.object,
}

export default UserPage
