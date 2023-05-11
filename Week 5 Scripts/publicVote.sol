// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Contract {
	enum Choices { Yes, No }

	struct Vote {
		Choices choice;
		address voter;
	}
	
	// TODO: create a public state variable: an array of votes
		
	Vote[] public votes;


	function createVote(Choices _choice) external {
		// TODO: add a new vote to the array of votes state variable
		require(hasVoted(msg.sender) == false);
		votes.push(Vote(_choice, msg.sender));
	}

	function hasVoted (address _address) public view returns (bool) {
		for(uint i =0; i<votes.length; i++)
		{
			if(votes[i].voter == _address)
				return true;
		}
		return false;
	}

	function findChoice (address _address) external view returns (Choices) {
		for(uint i =0; i<votes.length; i++)
		{
			if(votes[i].voter == _address)
				return votes[i].choice;
		}
	}

	function changeVote (Choices _choice) external {

		require(hasVoted(msg.sender) == true);

		for(uint i =0; i<votes.length; i++)
		{
			if(votes[i].voter == msg.sender)
				votes[i].choice = _choice;
		}
	}
}