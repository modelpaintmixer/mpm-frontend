import React from "react"
import PropTypes from "prop-types"
import queryString from "query-string"
import ScaleLoader from "react-spinners/ScaleLoader"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

import useDataApi from "../../utils/data-api"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import EditorWithPreview from "../../components/editor-with-preview"
import {
  RadioButtonGroup,
  RadioButton,
} from "../../components/radiobutton-group"

const validationSchema = Yup.object().shape({
  name: Yup.string().required(
    <em style={{ fontSize: "75%", color: "red" }}>Name must not be empty</em>
  ),
  needed: Yup.boolean(),
  duration: Yup.string()
    .lowercase()
    .matches(/\d+[mhdy]/, { excludeEmptyString: true }),
  description: Yup.string()
    .max(5000)
    .required(
      <em style={{ fontSize: "75%", color: "red" }}>
        Description must not be empty
      </em>
    ),
  inUse: Yup.boolean(),
})

const EditSitecookiePage = ({ location }) => {
  const values = queryString.parse(location.search)

  if (!values.id) {
    return (
      <>
        <SEO title="Error" />
        <Layout title="Edit Sitecookie: Error">
          <h2>An Error Occurred</h2>
          <div className="text-block">
            <p>This page was requested without an sitecookie ID.</p>
          </div>
        </Layout>
      </>
    )
  } else {
    const [{ data, loading, error }] = useDataApi(
      `/api/sitecookie/${values.id}`,
      {
        data: {},
      }
    )

    if (error) {
      return (
        <>
          <SEO title="Error" />
          <Layout title="Edit Sitecookie: Error">
            <h2>An Error Occurred</h2>
            <div className="text-block">
              <p>An error occurred trying to load data:</p>
              <p>{error.message}</p>
            </div>
          </Layout>
        </>
      )
    } else if (loading) {
      return (
        <>
          <SEO title="Loading..." />
          <Layout title="Edit Sitecookie: Loading...">
            <div className="text-block">
              <div className="loading">
                <ScaleLoader />
              </div>
            </div>
          </Layout>
        </>
      )
    } else {
      let { id, name, needed, duration, description, inUse } = data.sitecookie

      return (
        <>
          <SEO title={`Edit Sitecookie: ${name}`} />
          <Layout title={`Edit Sitecookie: ${name}`}>
            <div className="text-block">
              <Formik
                initialValues={{
                  id,
                  name,
                  needed,
                  duration,
                  description,
                  inUse,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                  alert(JSON.stringify(values, null, 2))
                  actions.setSubmitting(false)
                }}
              >
                {({ setFieldValue, isSubmitting }) => (
                  <Form>
                    <div
                      style={{
                        display: "grid",
                        width: "100%",
                        gridTemplateColumns: "1fr 2fr",
                        rowGap: "0.5rem",
                        columnGap: "1rem",
                      }}
                    >
                      <div style={{ textAlign: "right" }}>
                        <label htmlFor="name" style={{ display: "block" }}>
                          Name:
                        </label>
                        <ErrorMessage name="name" component="p" />
                      </div>
                      <div>
                        <Field type="text" name="name" />
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <label htmlFor="needed" style={{ display: "block" }}>
                          Needed:
                        </label>
                        <ErrorMessage name="needed" component="p" />
                      </div>
                      <div>
                        <RadioButtonGroup>
                          <Field
                            component={RadioButton}
                            name="needed"
                            id="neededTrue"
                            label="True"
                            value={true}
                          />
                          <Field
                            component={RadioButton}
                            name="needed"
                            id="neededFalse"
                            label="False"
                            value={false}
                          />
                        </RadioButtonGroup>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <label htmlFor="inUse" style={{ display: "block" }}>
                          In Use:
                        </label>
                        <ErrorMessage name="inUse" component="p" />
                      </div>
                      <div>
                        <RadioButtonGroup>
                          <Field
                            component={RadioButton}
                            name="inUse"
                            id="inUseTrue"
                            label="True"
                            value={true}
                          />
                          <Field
                            component={RadioButton}
                            name="inUse"
                            id="inUseFalse"
                            label="False"
                            value={false}
                          />
                        </RadioButtonGroup>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <label htmlFor="duration" style={{ display: "block" }}>
                          Duration:
                        </label>
                        <ErrorMessage name="duration" component="p" />
                      </div>
                      <div>
                        <Field type="text" name="duration" />
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <label
                          htmlFor="description"
                          style={{ display: "block" }}
                        >
                          Description:
                        </label>
                        <ErrorMessage name="description" component="p" />
                      </div>
                      <div>
                        <Field
                          name="description"
                          component={EditorWithPreview}
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        marginTop: "1rem",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <button name="reset" type="reset">
                        Reset
                      </button>
                      <button
                        name="update"
                        type="submit"
                        disabled={isSubmitting}
                        onClick={() => setFieldValue("action", "update", false)}
                      >
                        Update
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </Layout>
        </>
      )
    }
  }
}

EditSitecookiePage.propTypes = {
  location: PropTypes.object.isRequired,
}

export default EditSitecookiePage
