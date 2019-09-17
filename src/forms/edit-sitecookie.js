import React from "react"
import PropTypes from "prop-types"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

import EditorWithPreview from "../components/editor-with-preview"
import { RadioButtonGroup, RadioButton } from "../components/radiobutton-group"

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .max(100)
    .required(
      <em style={{ fontSize: "75%", color: "red" }}>Name must not be empty</em>
    ),
  needed: Yup.boolean(),
  duration: Yup.string()
    .max(16)
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

const EditSiteCookieForm = ({
  id,
  name,
  needed,
  duration,
  description,
  inUse,
}) => (
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

EditSiteCookieForm.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  needed: PropTypes.bool,
  duration: PropTypes.string,
  description: PropTypes.string,
  inUse: PropTypes.bool,
}

export default EditSiteCookieForm
