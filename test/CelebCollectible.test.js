const CelebCollectible = artifacts.require("./CelebCollectible.sol");

require("chai").use(require("chai-as-promised")).should();

contract("CelebCollectible", (accounts) => {
  let celebCollectible;

  before(async () => {
    celebCollectible = await CelebCollectible.deployed();
  });

  describe("deployment", async () => {
    it("deploys successfully", async () => {
      const address = await celebCollectible.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it("has a name", async () => {
      const name = await celebCollectible.name();
      assert.equal(name, "Celebrity Collectible");
    });

    it("has a symbol", async () => {
      const symbol = await celebCollectible.symbol();
      assert.equal(symbol, "CELEB");
    });
  });

  describe("minting", async () => {
    it("creates a new token", async () => {
      const fileType = 1;
      const result = await celebCollectible.mint("this is token uri", fileType);

      const totalSupply = await celebCollectible.totalSupply();
      assert.equal(totalSupply, 1);

      const event = result.logs[0].args;
      const tokenId = event.tokenId.toNumber();
      assert.equal(tokenId, 1, "id is correct");
      assert.equal(
        event.from,
        "0x0000000000000000000000000000000000000000",
        "from is correct"
      );
      assert.equal(event.to, accounts[0], "to is correct");

      const tokenType = await celebCollectible.tokenIdToTokenType(tokenId);
      assert.equal(tokenType, fileType, "token type is correct");
    });
  });
});
