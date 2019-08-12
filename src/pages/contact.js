import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const ContactPage = () => (
  <>
    <SEO title="Contact Us" />
    <Layout>
      <h2>Contact Us</h2>
      <section className="text-block">
        <p>
          Please feel free to contact us with suggestions, corrections,
          questions, etc.
        </p>
        <p>
          <a href="mailto:modelpaint@modelpaintmixer.com">
            modelpaint@modelpaintmixer.com
          </a>
        </p>
        <p>
          You can also follow us on Twitter:{" "}
          <a href="https://twitter.com/modelpaintmixer">@modelpaintmixer</a>.
        </p>
      </section>
    </Layout>
  </>
)

export default ContactPage
