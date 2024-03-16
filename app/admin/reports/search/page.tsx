// Components
import SearchReportsForm from "../../../_components/forms/SearchReportsForm";
import AdminSearchReports from "../../../_components/search/admin/AdminSearchReports";

const AdminSearchPage = async({ searchParams } : { searchParams: { type?: string }; }) => {
  const type = searchParams?.type || '';

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