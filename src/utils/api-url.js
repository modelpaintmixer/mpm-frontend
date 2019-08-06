const apiEndpoint = process.env.API_ENDPOINT

const apiurl = path => `${apiEndpoint}${path}`

export default apiurl
