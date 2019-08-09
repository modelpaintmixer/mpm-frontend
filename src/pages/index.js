import React, { Component } from "react"
import { instanceOf } from "prop-types"
import { withCookies, Cookies } from "react-cookie"
import Modal from "react-awesome-modal"

import Layout from "../components/layout"
import NewestChanges from "../components/newest-changes"
import SEO from "../components/seo"
import MainNavigation from "../components/main-navigation"

const mailchimpUrl = "https://mailchi.mp/5a620671bda0/mpm"

const IndexPage = () => (
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
        <NewestChanges />
      </section>
    </Layout>
  </>
)

class IndexUnderConstruction extends Component {
  constructor(props) {
    super(props)

    const { cookies } = props
    this.state = {
      signupSeen: cookies.get("signupSeen") || false,
      intervalId: null,
      visible: false,
    }

    this.showSignup = this.showSignup.bind(this)
    this.closeSignup = this.closeSignup.bind(this)
  }

  showSignup() {
    if (!this.state.signupSeen) {
      this.props.cookies.set("signupSeen", true, "/")
      this.setState({ visible: true })
    }
    clearInterval(this.state.intervalId)
  }

  closeSignup() {
    this.setState({ visible: false })
  }

  componentDidMount() {
    let intervalId = setInterval(this.showSignup, 2000)
    this.setState({ intervalId: intervalId })
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }

  render() {
    return (
      <>
        <IndexPage />
        <Modal
          visible={this.state.visible}
          width="450"
          effect="fadeInDown"
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
              <a href="" onClick={() => this.closeSignup()}>
                Close
              </a>
            </p>
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
