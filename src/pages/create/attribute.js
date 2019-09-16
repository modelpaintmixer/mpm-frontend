import React from "react"

import Layout from "../../components/layout"
import SEO from "../../components/seo"
import EditAttributeForm from "../../forms/edit-attribute"

const CreateAttributePage = () => (
  <>
    <SEO title="Create Attribute" />
    <Layout title="Create Attribute">
      <div className="text-block">
        <EditAttributeForm />
      </div>
    </Layout>
  </>
)

export default CreateAttributePage
