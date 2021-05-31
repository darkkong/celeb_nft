import React, { Component } from "react";
import audio from "../music-note.png";

class Main extends Component {
  render() {
    return (
      <div className="container-fluid">
        <br></br>
        &nbsp;
        <br></br>
        <div className="row">
          <main role="main" className="col-lg-12 d-flex text-center">
            <div className="content mr-auto ml-auto">
              <h1>Create new item</h1>
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
          </main>
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
              <div className="col-md-3">
                <div
                  className="card mb-5 bg-light mx-auto"
                  style={{ width: "18rem", height: "24rem" }}
                  key={key}
                  onClick={() =>
                    this.props.changeVideo(
                      collectible.image_url,
                      collectible.name
                    )
                  }
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
