pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";

contract CelebCollectible is ERC721Full {
  enum TokenType { IMAGE, VIDEO, AUDIO, ETC }

  mapping(uint256 => TokenType) public tokenIdToTokenType;

  constructor() public ERC721Full("Celebrity Collectible", "CELEB") {}

  function mint(string memory _tokenURI, uint256 _fileType)
    public
    returns (bool)
  {
    uint256 _tokenId = totalSupply().add(1);

    _mint(msg.sender, _tokenId);
    _setTokenURI(_tokenId, _tokenURI);

    TokenType _tokenType = TokenType(_fileType);
    tokenIdToTokenType[_tokenId] = _tokenType;

    return true;
  }
}
