import React, { Component } from "react";
import CelebCollectible from "../abis/CelebCollectible.json";
import Navbar from "./Navbar";
import Main from "./Main";
import Web3 from "web3";
import "./App.css";

require("dotenv").config();

//Declare IPFS
const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
}); // leaving out the arguments will default to these values

const pinataSDK = require("@pinata/sdk");
const pinata = pinataSDK(
  process.env.REACT_APP_PINATA_API_KEY,
  process.env.REACT_APP_PINATA_SECRET_API_KEY
);

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();

    this.setState({ loading: false });
  }

  async loadWeb3() {
    if (window.ethereum) {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      window.web3 = new Web3(window.ethereum);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    const networkId = await web3.eth.net.getId();
    const networkData = CelebCollectible.networks[networkId];

    if (networkData) {
      const celebCollectible = new web3.eth.Contract(
        CelebCollectible.abi,
        networkData.address
      );
      const totalSupply = await celebCollectible.methods.totalSupply().call();
      this.setState({ celebCollectible, totalSupply });

      // Load Collectibles
      for (let i = totalSupply; i >= 1; i--) {
        const tokenURI = await celebCollectible.methods.tokenURI(i).call();
        const collectible = await this.fetchJSONData(tokenURI);
        if (i === totalSupply) {
          const currentOwner = await celebCollectible.methods.ownerOf(i).call();
          this.setState({ currentCollectible: collectible, currentOwner });
        }
        this.setState({
          collectibles: [...this.state.collectibles, collectible],
        });
      }

      this.setState({ loading: false });
    } else {
      window.alert(
        "CelebCollectible contract not deployed to detected network."
      );
    }
  }

  async fetchJSONData(uri) {
    const api_call = await fetch(uri);
    const data = await api_call.json();
    return data;
  }

  //Get file
  captureFile = (event) => {
    event.preventDefault();

    const file = event.target.files[0];
    if (file.type.startsWith("image")) {
      this.setState({ fileType: "image", fileTypeNumber: 0 });
    } else if (file.type.startsWith("video")) {
      this.setState({ fileType: "video", fileTypeNumber: 1 });
    } else if (file.type.startsWith("audio")) {
      this.setState({ fileType: "audio", fileTypeNumber: 2 });
    } else {
      this.setState({ fileType: "etc", fileTypeNumber: 3 });
    }

    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) });
      console.log("buffer", this.state.buffer);
    };
  };

  //Get Value from Child
  setNameAndDesc = (name, description) => {
    this.setState({ name, description });

    this.uploadFile();
  };

  //Upload File
  uploadFile = async () => {
    this.setState({ loading: true });
    console.log("Submitting file to IPFS...");

    //Add file to the IPFS
    const ipfsResult = await ipfs.add(this.state.buffer);
    console.log("IPFS result", ipfsResult);
    this.setState({ fileHash: ipfsResult[0].hash });

    const body = {
      name: this.state.name,
      description: this.state.description,
      image_url: "https://ipfs.infura.io/ipfs/" + this.state.fileHash,
      attributes: [
        {
          file_type: this.state.fileType,
        },
      ],
    };

    //Add JSON Metadata to the IPFS via Pinata
    const pinataResult = await pinata.pinJSONToIPFS(body);
    //handle results here
    console.log("Pinata result", pinataResult);
    this.setState({
      tokenURI: "https://gateway.pinata.cloud/ipfs/" + pinataResult.IpfsHash,
    });

    this.mintToken(this.state.tokenURI, this.state.fileTypeNumber);
  };

  //Mint Token
  mintToken = async () => {
    await this.state.celebCollectible.methods
      .mint(this.state.tokenURI, this.state.fileTypeNumber)
      .send({ from: this.state.account })
      .on("transactionHash", async (hash) => {
        const newCollectible = await this.fetchJSONData(this.state.tokenURI);
        this.setState({
          collectibles: [newCollectible, ...this.state.collectibles],
          currentOwner: this.state.account,
          currentCollectible: newCollectible,
          loading: false,
        });
      });
  };

  //Change Video
  changeToken = (collectible) => {
    this.setState({ currentCollectible: collectible });
  };

  constructor(props) {
    super(props);
    this.state = {
      account: "",
      celebCollectible: null,
      collectibles: [],
      description: "",
      currentCollectible: null,
      currentOwner: "",
      loading: true,
      name: "",
    };

    //Bind functions
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        {this.state.loading ? (
          <div id="loader" className="text-center mt-5">
            <p>Loading...</p>
          </div>
        ) : (
          <Main
            captureFile={this.captureFile}
            setNameAndDesc={this.setNameAndDesc}
            changeToken={this.changeToken}
            collectibles={this.state.collectibles}
            currentCollectible={this.state.currentCollectible}
            currentOwner={this.state.currentOwner}
          />
        )}
      </div>
    );
  }
}

export default App;
