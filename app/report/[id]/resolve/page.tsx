'use client'

import { useParams } from 'next/navigation';

// Components
import ReportResolveForm from "../../../_components/forms/ReportResolveForm";

// Constants (Only temporary while backend is disabled)
import { reports } from "../../../_constants";

const ReportResolvePage = () => {
  const params = useParams();

  const report = reports.find(report => report.id === Number(params.id));
  return (
    <main className='page-layout'>
      {report ?
        <ReportResolveForm id={report.id} />
      :
        <div className='text-2xl text-center'>Report not found!</div>
      }
    </main>
  )
}

export default ReportResolvePage;