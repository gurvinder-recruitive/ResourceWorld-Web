import Careers from "../careers";

export default async function Page({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = await params;

  return <Careers initialJobId={Number(jobId)} />;
}