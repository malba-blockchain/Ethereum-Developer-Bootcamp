// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Voting {
    
    address [] public votingMemebers;  // An array to store the addresses of the voting members.

    constructor(address [] memory _allowedAddresses) {
        votingMemebers = _allowedAddresses;  // Initialize the 'votingMembers' array with the provided addresses.
        votingMemebers.push(msg.sender);  // Add the contract deployer as a voting member.
    }

    struct Proposal {
        address target;  // The target address to which the proposal is directed.
        bytes data;  // The calldata to be sent to the target address.
        uint yesCount;  // The number of 'yes' votes received for the proposal.
        uint noCount;  // The number of 'no' votes received for the proposal.
    }

    Proposal [] public proposals;  // An array to store all the proposals.

    mapping (address => mapping (uint => uint)) votesCasted;  // A mapping to keep track of votes casted by each address for each proposal.

    event ProposalCreated(uint);  // Event emitted when a new proposal is created.

    event VoteCast(uint, address indexed);  // Event emitted when a vote is cast.

    /////////////////////////////////
    //Functions of the smart contract
    /////////////////////////////////

    function newProposal (address _targetAddress, bytes calldata _calldataToSend) external {
        
        require(isVotingMember(msg.sender), "The address is not a voting member");  // Check if the caller is a voting member.

        emit ProposalCreated(proposals.length);  // Emit the 'ProposalCreated' event with the index of the new proposal.

        proposals.push(Proposal(_targetAddress, _calldataToSend, 0, 0));  // Create a new proposal and add it to the 'proposals' array with the provided target address and calldata, initializing the vote counts to 0.

    }

    function castVote (uint _proposalId, bool _vote) external {

        require(isVotingMember(msg.sender), "The address is not a voting member");  // Check if the caller is a voting member.

        // If the sender hasn't voted for this proposal before, proceed with the normal flow.
        if(votesCasted[msg.sender][_proposalId] == 0) {
            if(_vote == true) {
                proposals[_proposalId].yesCount ++;  // Increment the 'yesCount' of the proposal by 1.
                votesCasted[msg.sender][_proposalId] = 1;  // Set the vote status of the sender for this proposal to 1, indicating a 'yes' vote.
            }
            else {
                proposals[_proposalId].noCount ++;  // Increment the 'noCount' of the proposal by 1.
                votesCasted[msg.sender][_proposalId] = 2;  // Set the vote status of the sender for this proposal to 2, indicating a 'no' vote.
            }
        }
        // If the sender has already voted for this proposal, don't increment the vote counts and swap the votes.
        if(votesCasted[msg.sender][_proposalId] != 0) {
            if(_vote == true && votesCasted[msg.sender][_proposalId] == 2) {
                proposals[_proposalId].noCount --;  // Decrement the 'noCount' of the proposal by 1.
                proposals[_proposalId].yesCount ++;  // Increment the 'yesCount' of the proposal by 1.

                votesCasted[msg.sender][_proposalId] = 1;  // Change the vote status of the sender for this proposal to 1, indicating a 'yes' vote.
            }
            else if(_vote == false && votesCasted[msg.sender][_proposalId] == 1) {
                proposals[_proposalId].yesCount --;  // Decrement the 'yesCount' of the proposal by 1.
                proposals[_proposalId].noCount ++;  // Increment the 'noCount' of the proposal by 1.
                
                votesCasted[msg.sender][_proposalId] = 2;  // Change the vote status of the sender for this proposal to 2, indicating a 'no' vote.
            }
            else {
                // Do nothing if the sender tries to vote the same way as before.
            }
        }

        // Execute the proposal if it receives at least 10 'yes' votes.
        if(proposals[_proposalId].yesCount >= 10)
        {
            (bool success,) = proposals[_proposalId].target.call(proposals[_proposalId].data);  // Execute the contract call with the target address and calldata of the proposal.
            require(success, "There was an error in executing the proposal");  // Ensure the proposal execution was successful.
        }

        emit VoteCast(_proposalId, msg.sender);  // Emit the 'VoteCast' event with the proposal index and the address of the sender.

       
    }

    function isVotingMember(address _addressToFind) internal view returns (bool) {
        
        for(uint i =0; i<votingMemebers.length; i++)
        {
            if(votingMemebers[i] == _addressToFind) {
                return true;  // Return true if the provided address is found in the 'votingMembers' array.
            }
        }
        return false;  // Return false if the provided address is not found in the 'votingMembers' array.
    }
}
