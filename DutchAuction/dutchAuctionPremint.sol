// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

interface IERC721 {
    function transferFrom(
        address _from,
        address _to,
        uint256 _nftId
    ) external;
}

contract dutchAuctionContract is Ownable {
    uint256 public id;
    uint256 public initialCost = 1 ether;
    uint256 public rate = 10000;
    uint256 public auctionDuration = 7 days;
    uint256 public timeStart;
    IERC721 public immutable nft;
    address public immutable seller;

    constructor(address _nft, uint256 _id) {
        nft = IERC721(_nft);
        id = (_id);
        seller = msg.sender;
        require(initialCost - auctionDuration * rate >= 0);
    }

    // public

    function getPrice() public view returns (uint256 const) {
        if (timeStart == 0) {
            return initialCost;
        }
        require(block.timestamp - timeStart <= auctionDuration);
        uint256 _cost = initialCost - (block.timestamp - timeStart) * rate;
        return _cost;
    }

    function buy() public payable {
        uint256 cost = getPrice();
        require(msg.value >= cost);
        nft.transferFrom(seller, msg.sender, id);
        uint256 refund = msg.value - cost;
        if (refund >= 0) {
            payable(msg.sender).transfer(refund);
        }
        selfdestruct(payable(seller));
    }

    //onlyOwner

    function startAuction() public onlyOwner {
        require(timeStart == 0, "Auction has already started");
        timeStart = block.timestamp;
    }
}
