import React, { Component } from "react";
import audio from "../music-note.png";
import etc from "../document.png";

class Main extends Component {
  render() {
    return (
      <div className="container-fluid">
        <br></br>
        &nbsp;
        <br></br>
        <div className="row h-50">
          <div className="col-md-6">
            <div
              className="embed-responsive embed-responsive-16by9 rounded border border-secondary"
              style={{
                height: "600px",
              }}
            >
              <iframe
                className="embed-responsive-item"
                src={
                  this.props.currentCollectible
                    ? this.props.currentCollectible.image_url
                    : "about:blank"
                }
                allowFullScreen
              ></iframe>
              {/* {(() => {
                if (
                  this.props.currentCollectible.attributes[0].file_type ===
                  "image"
                ) {
                  return (
                    <img
                      className="img-fluid mx-auto d-block"
                      src={this.props.currentCollectible.image_url}
                      alt=""
                    />
                  );
                } else if (
                  this.props.currentCollectible.attributes[0].file_type ===
                  "video"
                ) {
                  return (
                    <video
                      src={this.props.currentCollectible.image_url}
                      controls
                    ></video>
                  );
                } else if (
                  this.props.currentCollectible.attributes[0].file_type ===
                  "audio"
                ) {
                  return (
                    <audio
                      src={this.props.currentCollectible.image_url}
                      controls
                    ></audio>
                  );
                } else {
                  return (
                    <a href={this.props.currentCollectible.image_url}>
                      <img src={etc} alt="" />
                    </a>
                  );
                }
              })()} */}
            </div>
          </div>
          <div
            className="col-md-2 text-break overflow-auto rounded border border-secondary"
            style={{ maxHeight: "768px", minWidth: "175px" }}
          >
            <h3>
              <b>
                {this.props.currentCollectible
                  ? this.props.currentCollectible.name
                  : ""}
              </b>
            </h3>
            <br />
            <h6>Owned by {this.props.currentOwner}</h6>
            <br />
            <br />
            <p>
              {this.props.currentCollectible
                ? this.props.currentCollectible.description
                : ""}
            </p>
          </div>
          <div className="col-md-2"></div>
          <div
            className="col-md-2 overflow-auto text-center"
            style={{ maxHeight: "768px", minWidth: "175px" }}
          >
            <div className="content">
              <h3>Create new item</h3>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  const name = this.name.value;
                  const description = this.description.value;

                  this.props.setNameAndDesc(name, description);
                }}
              >
                <input
                  type="file"
                  onChange={this.props.captureFile}
                  style={{ width: "250px" }}
                  required
                />
                <input
                  type="text"
                  className="form-control mb-1"
                  placeholder="Item Name"
                  ref={(input) => {
                    this.name = input;
                  }}
                  required
                />
                <input
                  type="text"
                  className="form-control mb-1"
                  placeholder="Provide a detailed description of your item."
                  ref={(input) => {
                    this.description = input;
                  }}
                />
                <input
                  type="submit"
                  className="btn btn-block btn-primary"
                  value="MINT"
                />
              </form>
            </div>
          </div>
        </div>
        <br></br>
        &nbsp;
        <hr />
        &nbsp;
        <br></br>
        &nbsp;
        <br></br>
        <div className="row">
          {this.props.collectibles.map((collectible, key) => {
            return (
              <div className="col-md-3" key={key}>
                <div
                  className="card mb-5 bg-light mx-auto"
                  style={{ width: "18rem", height: "24rem" }}
                  onClick={() => this.props.changeToken(collectible)}
                >
                  {(() => {
                    if (collectible.attributes[0].file_type === "image") {
                      return (
                        <img
                          className="card-img-top mx-auto token rounded border border-secondary mt-4"
                          src={collectible.image_url}
                          alt=""
                        />
                      );
                    } else if (
                      collectible.attributes[0].file_type === "video"
                    ) {
                      return (
                        <video
                          className="card-img-top mx-auto token rounded border border-secondary mt-4"
                          src={collectible.image_url}
                        ></video>
                      );
                    } else if (
                      collectible.attributes[0].file_type === "audio"
                    ) {
                      return (
                        <img
                          className="card-img-top mx-auto token rounded border border-secondary mt-4"
                          src={audio}
                        />
                      );
                    } else {
                      return (
                        <img
                          className="card-img-top mx-auto token rounded border border-secondary mt-4"
                          src={etc}
                        />
                      );
                    }
                  })()}
                  <div className="card-body">
                    <h5 className="text-dark">{collectible.name}</h5>
                    <p className="card-text">{collectible.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Main;
