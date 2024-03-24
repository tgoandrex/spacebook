'use client'

import Link from "next/link";

// Constants (Only temporary while backend is disabled)
import { reports, adminTableHeadersReports } from "../../../_constants";

const AdminSearchReports = ({ type } : { type: string; }) => {

  const filteredReports = reports.filter((report) => {
    return report.resolved === (type === "resolved" ? true : false);
  });

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-100">
        <tr>
          {adminTableHeadersReports.map((header, i) => (
            <th key={i} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredReports.length > 0 ?
          filteredReports.map((report, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-100"}>
            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
              {report.id}
            </td>
            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
              <Link href={`/user/${report.reporter.id}/posts`}>{report.reporter.username}</Link>
            </td>
            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
              "{report.reporterMessage}"
            </td>
            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
              {report.reportedEntity.type !== "comment" ?
                <Link href={`/${report.reportedEntity.type}/${report.reportedEntity.id}`}>
                  {report.reportedEntity.id} ({report.reportedEntity.type})
                </Link>
              :
                `${report.reportedEntity.id} (${report.reportedEntity.type})`
              }
            </td>
            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
              {report.resolved === true ? `"${report.adminMessage}"` : "Not resolved yet!"}
            </td>
            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
              {report.createdAt}
            </td>
            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
              {report.resolved === false ?
                <Link href={`/report/${report.id}/resolve`} className="text-blue-700">Resolve</Link>
              :
                "Already resolved!"
              }
              </td>
          </tr>
          ))
          :
          <tr className="bg-white">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500" colSpan={adminTableHeadersReports.length}>
              Search found no reports!
            </td>
          </tr>
        }
      </tbody>
    </table>
  )
}

export default AdminSearchReports;