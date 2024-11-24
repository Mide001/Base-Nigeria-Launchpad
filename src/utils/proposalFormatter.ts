// Define the contract proposal structure
interface ContractProposal {
    id: bigint
    title: string
    description: string
    status: number
    upvotes: bigint
    proposer: string
    category: string
    creationDate: number
  }
  
  // Define the frontend proposal structure
  interface FormattedProposal {
    id: number
    title: string
    description: string
    status: ProposalStatus
    votes: number
    comments: number
    date: string
    author: string
    category: string
  }
  
  // Status mapping from contract to frontend enum
  enum ProposalStatus {
    Active = "active",
    UnderReview = "in development",
    Implemented = "completed",
    Rejected = "rejected"
  }
  
  const getProposalStatus = (status: number): ProposalStatus => {
    switch (status) {
      case 0:
        return ProposalStatus.Active
      case 1:
        return ProposalStatus.UnderReview
      case 2:
        return ProposalStatus.Implemented
      case 3:
        return ProposalStatus.Rejected
      default:
        return ProposalStatus.Active
    }
  }
  
  const cleanString = (str: string): string => {
    // Remove null bytes and trim whitespace
    return str.replace(/\0/g, '').trim()
  }
  
  export const formatProposals = (contractProposals: ContractProposal[]): FormattedProposal[] => {
    if (!contractProposals) return []
    
    return contractProposals.map((proposal) => {
      // Convert bigint to number safely
      const idNumber = Number(proposal.id)
      const votesNumber = Number(proposal.upvotes)
      
      return {
        id: idNumber,
        title: cleanString(proposal.title),
        description: cleanString(proposal.description),
        status: getProposalStatus(proposal.status),
        votes: votesNumber,
        comments: 0, 
        date: new Date(proposal.creationDate * 1000).toLocaleDateString(),
        author: `${proposal.proposer.slice(0, 6)}...${proposal.proposer.slice(-4)}`,
        category: cleanString(proposal.category)
      }
    })
  }