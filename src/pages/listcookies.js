import React from "react"

import CookiesTable from "../components/list-cookies"
import Layout from "../components/layout"
import SEO from "../components/seo"

const ListCookies = () => (
  <>
    <SEO title="List of Site Cookies" />
    <Layout title="Our Site-Wide Cookies">
      <section className="text-block">
        <CookiesTable />
      </section>
    </Layout>
  </>
)

export default ListCookies
