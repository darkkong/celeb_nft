import React, { Component } from "react";
import Identicon from "identicon.js";
import celebrity from "../celebrity.png";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <div className="navbar-brand col-sm-3 col-md-2 mr-0">
          <img
            src={celebrity}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt=""
          />
          &nbsp;Celebrity Collectible Minter
        </div>
        <ul className="navbar-nav px-3">
          <li>
            <small id="account">
              <a
                target="_blank"
                alt=""
                className="text-white text-monospace"
                rel="noopener noreferrer"
                href={
                  "https://rinkeby.etherscan.io/address/" + this.props.account
                }
              >
                {this.props.account}
              </a>
            </small>
            {this.props.account ? (
              <img
                alt=""
                className="ml-2"
                width="30"
                height="30"
                src={`data:image/png;base64,${new Identicon(
                  this.props.account,
                  30
                ).toString()}`}
              />
            ) : (
              <span></span>
            )}
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
