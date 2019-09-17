import React from "react"
import PropTypes from "prop-types"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

import EditorWithPreview from "../components/editor-with-preview"

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .max(100)
    .required(
      <em style={{ fontSize: "75%", color: "red" }}>Name must not be empty</em>
    ),
  abbreviation: Yup.string()
    .max(10)
    .required(
      <em style={{ fontSize: "75%", color: "red" }}>
        Abbreviation must not be empty
      </em>
    ),
  notes: Yup.string()
    .ensure()
    .max(2000),
})

const EditOriginForm = ({ id, name, abbreviation, notes }) => (
  <div className="edit-form">
    <Formik
      initialValues={{ id, name, abbreviation, notes }}
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
              <label htmlFor="abbreviation" style={{ display: "block" }}>
                Abbreviation:
              </label>
              <ErrorMessage name="abbreviation" component="p" />
            </div>
            <div>
              <Field type="text" name="abbreviation" />
            </div>
            <div style={{ textAlign: "right" }}>
              <label htmlFor="notes" style={{ display: "block" }}>
                Notes:
              </label>
            </div>
            <div>
              <Field name="notes" component={EditorWithPreview} />
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

EditOriginForm.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  abbreviation: PropTypes.string,
  notes: PropTypes.string,
}

export default EditOriginForm
