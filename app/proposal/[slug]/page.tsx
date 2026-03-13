import { ClientProposal } from '@/components/ClientProposal'

export default function ProposalPage({ params }: { params: { slug: string } }) {
  return <ClientProposal slug={params.slug} />
}
