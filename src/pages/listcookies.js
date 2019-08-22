import React from "react"

import {
  ListCookiesTable,
  ListCookiesDescriptions,
} from "../components/list-cookies"
import Layout from "../components/layout"
import SEO from "../components/seo"

const ListCookies = () => (
  <>
    <SEO title="List of Site Cookies" />
    <Layout title="Our Site-Wide Cookies">
      <section className="text-block">
        <ListCookiesTable />
      </section>
      <section className="text-block">
        <ListCookiesDescriptions />
      </section>
    </Layout>
  </>
)

export default ListCookies
