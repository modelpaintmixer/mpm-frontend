/* eslint-disable react/no-unescaped-entities */
import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = () => (
  <>
    <SEO title="About This Site" />
    <Layout title="About This Site">
      <div className="text-block">
        <p>
          <b>ModelPaintMixer.com</b> is intended to be a centralized repository
          for paints and custom color mixes for the scale modeling community.
          The original idea was suggested to me in 2018 after I had gone through
          considerable effort to find recipes for the Caunter Scheme colors for
          a World War II subject.
        </p>
        <p>
          While the site is currently limited in focus to paints from the
          company <a href="/manufacturer/1">Tamiya, Inc.</a>, the goal is to
          expand to other manufacturers over time.
        </p>
        <p>
          Participation on this site as a registered user requires an agreement
          to abide by this site's <Link to="/code">Code of Conduct</Link>, as
          well as agreeing to the <Link to="/terms">Terms of Service</Link>.
        </p>
      </div>
      <div className="text-block">
        <h3>Technical Details</h3>
        <p>
          This site is created using the{" "}
          <a href="https://www.gatsbyjs.org" title="Gatsby home">
            Gatsby
          </a>{" "}
          site creation tool built upon the{" "}
          <a href="https://reactjs.org/" title="React home">
            React
          </a>{" "}
          JavaScript framework. The typography and text theming come from the{" "}
          <a
            href="https://kyleamathews.github.io/typography.js/"
            title="Typography.js home"
          >
            Typography.js
          </a>{" "}
          project, using the Fairy Gates theme. Icons used for navigation are
          from the{" "}
          <a
            href="https://google.github.io/material-design-icons/"
            title="Material Design icons"
          >
            Material Design Icons
          </a>{" "}
          set.
        </p>
        <p>
          The background image is from the the collection,{" "}
          <a href="https://blog.spoongraphics.co.uk/freebies/free-camouflage-patterns-for-illustrator-photoshop">
            "Free Camouflage Patterns for Illustrator &amp; Photoshop"
          </a>{" "}
          from the{" "}
          <a
            href="https://blog.spoongraphics.co.uk/"
            title="Spoon Graphics home"
          >
            Spoon Graphics
          </a>{" "}
          blog. The background uses the "Woodland Camouflage" image, converted
          to PNG and the opacity adjusted down to 25%.
        </p>
      </div>
      <div className="text-block">
        <h3>Additional Credit</h3>
        <p>Special thanks go to:</p>
        <p>
          <b>Eugenie Taylor</b>, for designing and creating the logo/icon for
          the site, as well as providing valuable feedback on design and layout
          issues.
        </p>
        <p>
          <b>John Heck</b>, for seeding the original idea and also providing
          feedback on the content, design and layout.
        </p>
      </div>
    </Layout>
  </>
)

export default AboutPage
