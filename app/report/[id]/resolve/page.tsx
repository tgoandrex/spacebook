import { auth } from "../../../../auth";

import { redirect } from "next/navigation";

import prisma from "../../../../prisma/lib/prisma";

// Components
import ReportResolveForm from "../../../_components/forms/ReportResolveForm";

const ReportResolvePage = async (props: { params: { id: number; } }) => {
  const report = await prisma.report.findUnique({
    where: {
      id: Number(props.params.id)
    },
    select: {
      id: true
    }
  });

  const session = await auth();

  if(session?.user.role !== "Admin") {
    redirect("/");
  }

  return (
    <main className='page-layout'>
      <div className="text-center pb-4">
        <span className="text-2xl">Resolve Report</span>
      </div>
      {report ?
        <ReportResolveForm id={report.id} />
      :
        <div className='text-2xl text-center'>Report not found!</div>
      }
    </main>
  )
}

export default ReportResolvePage;