import React, { Component } from "react"
import { PopupboxManager, PopupboxContainer } from "react-popupbox"
import "react-popupbox/dist/react-popupbox.css"

import Layout from "../components/layout"

export default class TestPage extends Component {
  openPopupBox() {
    const content = (
      <div>
        <p>Line 1</p>
        <p>Line 2</p>
        <p>Line 3</p>
      </div>
    )

    PopupboxManager.open({ content })
  }

  render() {
    const popupboxConfig = {
      fadeIn: true,
      fadeInSpeed: 500,
      overlayOpacity: 0.5,
      content: {
        className: "text-block",
      },
    }

    return (
      <>
        <h2>Test Page</h2>
        <div
          style={{
            width: "100%",
            marginBottom: "1rem",
          }}
        >
          <div class="text-block">
            <button onClick={this.openPopupBox}>Click</button>
            <PopupboxContainer {...popupboxConfig} />
          </div>
        </div>
      </>
    )
  }
}
