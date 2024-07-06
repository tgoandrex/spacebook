import Link from "next/link";
import prisma from "../../../../prisma/lib/prisma";

// Constants
import { adminTableHeadersReports } from "../../../_constants";

const AdminSearchReports = async ({ type } : { type: string; }) => {

  const filteredReports = await prisma.report.findMany({
    where: {
      resolved: type === "unresolved" ? false : true
    },
    include: {
      reporter: {
        select: {
          id: true
        }
      }
    }
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
              <Link href={`/user/${report.reporter.id}/posts`} className="text-blue-700">{report.reporterUsername}</Link>
            </td>
            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
              "{report.reporterMessage}"
            </td>
            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
              {report.commentId ?
                `${report.commentId} (Comment)`
              :
              report.photoId ?
                <Link href={`/photo/${report.photoId}`} className="text-blue-700">
                  {report.photoId} (Photo)
                </Link>
                :
                <Link href={`/post/${report.postId}`} className="text-blue-700">
                  {report.postId} (Post)
                </Link>
              }
            </td>
            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
              {report.resolved === true ? `"${report.adminAction}"` : "Not resolved yet!"}
            </td>
            <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-500">
              {report.createdAt.toLocaleString()}
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