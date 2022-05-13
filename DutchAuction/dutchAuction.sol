// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract SuperCoolNFT is ERC721 , Ownable {
   using Strings for uint256;


    uint public initialCost =  10 ether;
    uint public  rate   = 1000;
    uint public Auctionduration = 7 days;
    uint public timeStart;



   constructor( string memory _name ,string memory _symbol  )ERC721(_name , _symbol)
    {  
    assert(initialCost -  Auctionduration * rate > 0 );
    }
      

   function mint( address  _to , uint  _tokenId) public payable  {
           require( timeStart > 0 ) ;
           uint cost = getPrice() ;
           require( msg.value >= cost );
         _safeMint( _to, _tokenId);
   }

   function mintOwner( address  _to , uint  _tokenId) public onlyOwner  {          
         _safeMint( _to, _tokenId);
   }

    function startAuction( ) public onlyOwner  {   
      timeStart = block.timestamp;

         
   }

   function getPrice() public view returns(uint const){    
      if(timeStart == 0){
         return initialCost;
      }
      require(  block.timestamp - timeStart <=  Auctionduration);   
      uint _cost = initialCost - ( block.timestamp - timeStart ) * rate ;
      return _cost;
   }
   
   function withdraw( ) public payable onlyOwner{
      (bool os,) = payable(owner()).call{value: address(this).balance}("");
      require(os);
   }
    
}

