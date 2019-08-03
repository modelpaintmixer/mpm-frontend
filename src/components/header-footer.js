import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import {
  MdAccountCircle,
  MdHelp,
  MdInfo,
  MdEmail,
  MdBrush,
  MdPalette,
  MdSearch,
  MdSpeakerNotes,
  MdLockOutline,
} from "react-icons/md"

import SiteIcon from "./siteicon"
import styles from "./header-footer.module.css"

const IconLink = props => (
  <>
    <Link to={props.to}>
      <span className="link-text">{props.children}</span>
    </Link>{" "}
    <Link to={props.to} className={"link-icon"}>
      {props.icon}
    </Link>
  </>
)

IconLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  icon: PropTypes.node.isRequired,
}

const ListLink = props => (
  <li className={styles.menuListLink}>
    <IconLink to={props.to} icon={props.icon}>
      {props.children}
    </IconLink>
  </li>
)

ListLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  icon: PropTypes.node.isRequired,
}

export const Header = props => (
  <header>
    <div className={styles.headerContainer}>
      <div className={styles.icon}>
        <Link
          to="/"
          style={{
            textDecoration: `none`,
          }}
        >
          <SiteIcon />
        </Link>
      </div>
      <div className={styles.menu}>
        <ul className={styles.menuList}>
          <ListLink to="/paints" icon={<MdBrush />}>
            Paints
          </ListLink>
          <ListLink to="/colors" icon={<MdPalette />}>
            Colors
          </ListLink>
          <ListLink to="/search" icon={<MdSearch />}>
            Search
          </ListLink>
          <ListLink to="/faq" icon={<MdHelp />}>
            FAQ
          </ListLink>
        </ul>
        <div>
          <h1 className={styles.titleHeader}>
            {props.title || "Model Paint Mixer"}
          </h1>
        </div>
      </div>
      <div className={styles.account}>
        <IconLink to="/login" icon={<MdAccountCircle />}>
          Login
        </IconLink>
      </div>
    </div>
  </header>
)

Header.propTypes = {
  title: PropTypes.string,
}

export const Footer = () => (
  <footer>
    <div className={styles.footerContainer}>
      <div className={styles.copyright}>&copy; {new Date().getFullYear()}</div>
      <div className={styles.menu}>
        <ul className={styles.menuList}>
          <ListLink to="/about" icon={<MdInfo />}>
            About
          </ListLink>
          <ListLink to="/code" icon={<MdSpeakerNotes />}>
            Code & Terms
          </ListLink>
          <ListLink to="/privacy" icon={<MdLockOutline />}>
            Privacy
          </ListLink>
        </ul>
      </div>
      <div className={styles.contact}>
        <IconLink to="/contact" icon={<MdEmail />}>
          Contact
        </IconLink>
      </div>
    </div>
  </footer>
)
