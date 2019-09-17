import React from "react"
import PropTypes from "prop-types"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

import EditorWithPreview from "../components/editor-with-preview"
import { DateFormat } from "../components/date-format"

const validationSchema = Yup.object().shape({
  headline: Yup.string()
    .max(512)
    .required(
      <em style={{ fontSize: "75%", color: "red" }}>
        Headline must not be empty
      </em>
    ),
  content: Yup.string()
    .max(10000)
    .ensure()
    .required(
      <em style={{ fontSize: "75%", color: "red" }}>Story must not be empty</em>
    ),
})

const EditNewsItemForm = ({ id, headline, content, createdAt, updatedAt }) => (
  <div className="edit-form">
    <Formik
      initialValues={{ id, headline, content }}
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
              <label htmlFor="headline" style={{ display: "block" }}>
                Name:
              </label>
              <ErrorMessage name="headline" component="p" />
            </div>
            <div>
              <Field type="text" name="headline" />
            </div>
            <div style={{ textAlign: "right" }}>
              <label htmlFor="content" style={{ display: "block" }}>
                Content:
              </label>
              <ErrorMessage name="content" component="p" />
            </div>
            <div>
              <Field name="content" component={EditorWithPreview} />
            </div>
            {id ? (
              <>
                <div style={{ textAlign: "right" }}>Created:</div>
                <div>
                  <DateFormat date={createdAt} />
                </div>
                <div style={{ textAlign: "right" }}>Updated:</div>
                <div>
                  <DateFormat date={updatedAt} />
                </div>
              </>
            ) : (
              ""
            )}
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
            {id ? (
              <>
                <button
                  name="delete"
                  type="submit"
                  disabled={isSubmitting}
                  onClick={() => setFieldValue("action", "delete", false)}
                >
                  Delete
                </button>
                <button
                  name="update"
                  type="submit"
                  disabled={isSubmitting}
                  onClick={() => setFieldValue("action", "update", false)}
                >
                  Update
                </button>
              </>
            ) : (
              <button
                name="create"
                type="submit"
                disabled={isSubmitting}
                onClick={() => setFieldValue("action", "create", false)}
              >
                Create
              </button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  </div>
)

EditNewsItemForm.propTypes = {
  id: PropTypes.number,
  headline: PropTypes.string,
  content: PropTypes.string,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
}

export default EditNewsItemForm
