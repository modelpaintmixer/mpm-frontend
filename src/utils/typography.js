import Typography from "typography"
import theme from "typography-theme-fairy-gates"
theme.overrideThemeStyles = () => ({
  "div > :last-child": {
    marginBottom: 0,
  },
  "div > :first-child": {
    marginTop: 0,
  },
  "section > :last-child": {
    marginBottom: 0,
  },
  "section > :first-child": {
    marginTop: 0,
  },
})

const typography = new Typography(theme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== "production") {
  typography.injectStyles()
}

export const { scale, rhythm, options } = typography
export default typography
