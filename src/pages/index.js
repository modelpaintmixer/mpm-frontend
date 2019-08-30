import React, { Component } from "react"
import PropTypes from "prop-types"
import { instanceOf } from "prop-types"
import { withCookies, Cookies } from "react-cookie"
import Modal from "react-awesome-modal"

import Layout from "../components/layout"
import NewestChanges from "../components/newest-changes"
import SEO from "../components/seo"
import MainNavigation from "../components/main-navigation"
import NewsItem from "../components/news-item"

const mailchimpUrl = "https://mailchi.mp/5a620671bda0/mpm"

const IndexPage = props => (
  <>
    <SEO />
    <Layout>
      <section className="text-block">
        <p>
          Welcome to <b>Model Paint Mixer</b>, a site that gathers custom colors
          and mixes for scale modeling. The colors presented here are created by
          users for the purpose of sharing with the scale modeling community.
        </p>
      </section>
      <section
        className="text-block"
        style={{
          textAlign: "center",
        }}
      >
        <b>
          This site is still under construction.{" "}
          <a href={mailchimpUrl}>Sign up here</a> to be notified as more
          features are added and when the site fully launches.
        </b>
        <br />
        <span style={{ fontSize: "80%" }}>
          This mailing list will only be used until the full site launches, and
          will be removed at that time.
        </span>
      </section>
      <MainNavigation />
      <section className="text-block">
        <h3>Site News</h3>
        <NewestChanges {...props} />
      </section>
    </Layout>
  </>
)

IndexPage.propTypes = {
  showNewsItem: PropTypes.func.isRequired,
  closeNewsItem: PropTypes.func.isRequired,
}

class IndexUnderConstruction extends Component {
  constructor(props) {
    super(props)

    const { cookies } = props
    this.state = {
      signupSeen: cookies.get("signupSeen") || false,
      intervalId: null,
      signupVisible: false,
      newsItemVisible: false,
      newsItemId: 0,
    }

    this.showSignup = this.showSignup.bind(this)
    this.closeSignup = this.closeSignup.bind(this)
    this.showNewsItem = this.showNewsItem.bind(this)
    this.closeNewsItem = this.closeNewsItem.bind(this)
    this.escFunction = this.escFunction.bind(this)
  }

  escFunction(event) {
    if (event.keyCode === 27) {
      this.setState({ signupVisible: false, newsItemVisible: false })
    }
  }

  showSignup() {
    if (!this.state.signupSeen) {
      let expires = new Date()
      expires.setDate(expires.getDate() + 365)
      this.props.cookies.set("signupSeen", true, {
        path: "/",
        expires: expires,
      })
      this.setState({ signupVisible: true })
    }
    clearInterval(this.state.intervalId)
  }

  closeSignup() {
    this.setState({ signupVisible: false })
  }

  showNewsItem(itemId) {
    this.setState({ newsItemVisible: true, newsItemId: itemId })
  }

  closeNewsItem() {
    this.setState({ newsItemVisible: false })
  }

  componentDidMount() {
    let intervalId = setInterval(this.showSignup, 1500)
    this.setState({ intervalId: intervalId })
    document.addEventListener("keydown", this.escFunction, false)
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId)
    document.removeEventListener("keydown", this.escFunction, false)
  }

  render() {
    return (
      <>
        <IndexPage
          showNewsItem={this.showNewsItem}
          closeNewsItem={this.closeNewsItem}
        />
        <Modal
          visible={this.state.signupVisible}
          width="450"
          effect="fadeInUp"
          onClickAway={() => this.closeSignup()}
        >
          <div
            style={{
              textAlign: "center",
              margin: "0.5rem",
            }}
          >
            <h3>Sign Up for Updates</h3>
            <p>
              This site is still under construction.{" "}
              <a href={mailchimpUrl}>Sign up here</a> to be notified as more
              features are added and when the site fully launches.
            </p>
            <p style={{ fontSize: "80%" }}>
              This mailing list will only be used until the full site launches,
              and will be removed at that time.
            </p>
            <p style={{ fontSize: "120%" }}>
              <a href={mailchimpUrl}>Sign up here</a>
            </p>
            <p>
              <a onClick={() => this.closeSignup()}>Close</a>
            </p>
          </div>
        </Modal>
        <Modal
          visible={this.state.newsItemVisible}
          width="450"
          effect="fadeInDown"
          onClickAway={() => this.closeNewsItem()}
        >
          <div
            style={{
              margin: "0.5rem",
            }}
          >
            <NewsItem
              itemId={this.state.newsItemId}
              closeItem={this.closeNewsItem}
            />
          </div>
        </Modal>
      </>
    )
  }
}

IndexUnderConstruction.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
}

// export default IndexPage
export default withCookies(IndexUnderConstruction)
