// Components
import SearchForm from "../../_components/forms/SearchForm";
import AdminSearchPosts from "../../_components/search/admin/AdminSearchPosts";
import AdminSearchPhotos from "../../_components/search/admin/AdminSearchPhotos";
import AdminSearchUsers from "../../_components/search/admin/AdminSearchUsers";

const AdminPage = async({ searchParams } : { searchParams: { query?: string, type?: string }; }) => {
  const query = searchParams?.query || '';
  const type = searchParams?.type || '';

  return (
    <main className='page-layout'>
      <SearchForm />
      <div className="overflow-x-auto">
        {type === "posts" ?
          <AdminSearchPosts query={query} />
        : type === "photos" ?
          <AdminSearchPhotos query={query} />
        : type === "users" ?
          <AdminSearchUsers query={query} />
        :
          <div className="mt-4 text-center">Please select Posts, Photos, or Users above.</div>
        }
      </div>
    </main>
  )
}

export default AdminPage;