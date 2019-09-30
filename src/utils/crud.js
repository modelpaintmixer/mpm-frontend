/*
 * This is assuming that the form from which this is called is a Formik
 * construct
 */
import axios from "axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import apiEndpoint from "./api-endpoint"

const setupCRUDHandler = params => {
  return (values, actions) => submitCRUDForm(params, values, actions)
}

const submitCRUDForm = (params, values, actions) => {
  const { type } = params

  if (values.action === "delete") {
    if (!confirm(`Really delete this ${type}?`)) {
      actions.setSubmitting(false)
      return
    }
  }

  axios
    .post(`${apiEndpoint}/api/update/${type}`, values)
    .then(res => {
      let status = res.data.status
      if (status === "success") {
        toast("Success")
      } else if (status === "error") {
        toast.error(`Error: ${res.data.error.message}`)
      }
      actions.setSubmitting(false)
    })
    .catch(error => {
      toast.error(`Error: ${error.message}`)
      actions.setSubmitting(false)
    })
}

export { setupCRUDHandler, submitCRUDForm }
