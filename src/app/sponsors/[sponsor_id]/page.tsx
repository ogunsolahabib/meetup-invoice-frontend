import SponsorDetails from "@/components/page-specific/sponsors/sponsor-details";

export default function SponsorPage({ params }: { params: { sponsor_id: string } }) {
    return <div className="container bg-background">
        <SponsorDetails sponsor_id={params.sponsor_id} />
    </div>
} 