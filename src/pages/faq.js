/* eslint-disable react/no-unescaped-entities */
import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Qpara = styled.p`
  font-weight: bold;
  margin-bottom: 0.1rem;
`
const Apara = styled.p`
  margin-top: 0;
`

const FAQPage = () => (
  <>
    <SEO title="Frequently Asked Questions" />
    <Layout title="Frequently Asked Questions">
      <section className="text-block">
        <h3>Site Progress</h3>
        <ul>
          <li>
            <div>
              <Qpara>When will the site be fully functional?</Qpara>
              <Apara>
                It's hard to give an exact timeline, as this is a side-project
                of mine and comes after my day job (and occasional modeling). At
                present, the target for full functionality is late December.
              </Apara>
            </div>
          </li>
          <li>
            <div>
              <Qpara>When will I be able to create an account?</Qpara>
              <Apara>
                User accounts will not be made available until the related
                software elements are considered sufficiently stable. Your
                privacy, and compliance with Europe's{" "}
                <a href="https://eugdpr.org/">GDPR</a> requirements, are our
                priorities when it comes to user accounts.
              </Apara>
            </div>
          </li>
          <li>
            <div>
              <Qpara>
                What sort of privacy and data-protection are you planning?
              </Qpara>
              <Apara>
                This site will not be storing any real amount of personal
                information. Aside from a name, email, user-name and password,
                the bulk of the information we plan on storing in connection to
                a user will be: color mixes they've created, comments they've
                made, and ratings of other colors they've made. This may change
                before the full site is rolled out, but once user accounts are
                enabled the stored information will be well-defined and stable.
              </Apara>
            </div>
          </li>
          <li>
            <div>
              <Qpara>What about cookies, ads, etc.?</Qpara>
              <Apara>
                This site will require some browser cookies in order to fully
                function. Before we roll out any significant amount of
                functionality, we will offer a (GDPR-compliant) mechanism for
                opting in and out of different categories of cookies.
              </Apara>
              <Apara>
                As for ads, there is no plan in the short-term to make any use
                of ads. If this changes (out of necessity), the cookie policy
                will be updated to reflect this and you will have the option of
                opting out. We have <em>no</em> plans to utilize any commercial
                ad networks, for a range of reasons.
              </Apara>
            </div>
          </li>
          <li>
            <div>
              <Qpara>Will there be any tracking code sent by this site?</Qpara>
              <Apara>
                No. This is one of the reasons we are against using any
                commercial ad networks. Even if circumstances require setting up
                ad revenue, there will be no user-tracking code associated with
                it.
              </Apara>
            </div>
          </li>
          <li>
            <div>
              <Qpara>Do you have any sort of analytics installed?</Qpara>
              <Apara>
                We will be using Google Analytics on the site, both to measure
                performance and to try and improve the overall user experience.
                Before the Google code is integrated or deployed, we will ensure
                that it is configured to anonymize IP addresses and related
                data.
              </Apara>
            </div>
          </li>
          <li>
            <div>
              <Qpara>
                I have an idea for something I'd like to see... interested?
              </Qpara>
              <Apara>
                Absolutely! Use the email address on the{" "}
                <Link to="/contact">Contact</Link> page and let us know what
                you're thinking!
              </Apara>
            </div>
          </li>
        </ul>
      </section>
      <section className="text-block">
        <h3>Site Functionality</h3>
        <ul>
          <li>
            <div>
              <Qpara>What is the mechanism for adding color recipes?</Qpara>
              <Apara>
                This is still under design. The current plan is to allow the
                user to select from available paints and upload one or more
                photos from which to derive the actual color of the mix.
              </Apara>
            </div>
          </li>
          <li>
            <div>
              <Qpara>
                Will I be able to mix paints together experimentally and see the
                resulting color?
              </Qpara>
              <Apara>
                Unfortunately, no. Mixing of colors in the RGB space that
                computer monitors (and other devices) use is not the same as
                mixing pigments. At least for now, the site will rely on
                scanning swatches in photographs.
              </Apara>
            </div>
          </li>
          <li>
            <div>
              <Qpara>
                What if a given paint is already a great match for a given
                color?
              </Qpara>
              <Apara>
                When first planning this site and database, the goal was to only
                focus on those colors that <em>needed</em> to be custom-mixed.
                But the larger plan is now to be a more comprehensive center for
                questions of colors and paints. To this end, paints that people
                consider to be a good native match will be used to create colors
                that have just one mix element: that paint.
              </Apara>
            </div>
          </li>
        </ul>
      </section>
      <section className="text-block">
        <h3>Other Resources</h3>
        <ul>
          <li>
            <div>
              <Qpara>
                Will there be links to other paint and painting-related
                resources?
              </Qpara>
              <Apara>
                Absolutely! We hope to eventually have this site be a
                clearinghouse for scale modeling-related color and paint
                questions.
              </Apara>
            </div>
          </li>
          <li>
            <div>
              <Qpara>
                Will I be able to buy paint or other resources through this
                site?
              </Qpara>
              <Apara>
                There is no plan for this currently. However, we may consider
                partnering with online hobby stores that offer the paint ranges
                referenced in our database in the future. Feel free to contact
                us (
                <a href="mailto:modelpaint@modelpaintmixer.com">
                  modelpaint@modelpaintmixer.com
                </a>
                ) if you are such an entity and are interested in something like
                this.
              </Apara>
            </div>
          </li>
        </ul>
      </section>
    </Layout>
  </>
)

export default FAQPage
