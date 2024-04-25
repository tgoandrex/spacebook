import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

// Components
import SearchReportsForm from "../../../_components/forms/SearchReportsForm";
import AdminSearchReports from "../../../_components/search/admin/AdminSearchReports";

const AdminSearchPage = async({ searchParams } : { searchParams: { type?: string }; }) => {
  const type = searchParams?.type || '';

  const session = await getServerSession(authOptions);

  if(session?.user.role === "User") {
    redirect("/");
  }

  return (
    <main className='page-layout'>
      <SearchReportsForm />
      <div className="overflow-x-auto">
        <AdminSearchReports type={type} />
      </div>
    </main>
  )
}

export default AdminSearchPage;