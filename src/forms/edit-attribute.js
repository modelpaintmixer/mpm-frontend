import React from "react"
import PropTypes from "prop-types"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

import EditorWithPreview from "../components/editor-with-preview"
import { setupCRUDHandler } from "../utils/crud"

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .max(25)
    .required(
      <em style={{ fontSize: "75%", color: "red" }}>Name must not be empty</em>
    ),
  description: Yup.string()
    .max(2000)
    .ensure()
    .required(
      <em style={{ fontSize: "75%", color: "red" }}>
        Description must not be empty
      </em>
    ),
})

const EditAttributeForm = ({ id, name, description }) => (
  <div className="edit-form">
    <Formik
      initialValues={{ id, name, description }}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={setupCRUDHandler({ type: "attribute" })}
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
              <label htmlFor="description" style={{ display: "block" }}>
                Description:
              </label>
              <ErrorMessage name="description" component="p" />
            </div>
            <div>
              <Field name="description" component={EditorWithPreview} />
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

EditAttributeForm.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
}

export default EditAttributeForm
