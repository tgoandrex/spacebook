import { auth } from "../../../auth";

import { redirect } from "next/navigation";

// Components
import SearchForm from "../../_components/forms/SearchForm";
import AdminSearchPosts from "../../_components/search/admin/AdminSearchPosts";
import AdminSearchPhotos from "../../_components/search/admin/AdminSearchPhotos";
import AdminSearchUsers from "../../_components/search/admin/AdminSearchUsers";
import AdminSearchComments from "../../_components/search/admin/AdminSearchComments";

const AdminSearchPage = async({ searchParams } : { searchParams: { query?: string, type?: string, page?: string, pageSize?: string }; }) => {
  const query = searchParams?.query || '';
  const type = searchParams?.type || '';
  const page = parseInt(searchParams?.page || '1', 10);
  const pageSize = parseInt(searchParams?.pageSize || '10', 10);

  const session = await auth();

  if(session?.user.role === "User") {
    redirect("/");
  }

  return (
    <main className='page-layout'>
      <SearchForm title="Admin" />
      <div className="overflow-x-auto">
        {type === "posts" ?
          <AdminSearchPosts query={query} page={page} pageSize={pageSize} />
        : type === "photos" ?
          <AdminSearchPhotos query={query} page={page} pageSize={pageSize} />
        : type === "comments" ?
          <AdminSearchComments query={query} page={page} pageSize={pageSize} />
        : type === "users" ?
          <AdminSearchUsers query={query} page={page} pageSize={pageSize} />
        :
          <div className="mt-4 text-center">Please select Posts, Photos, Comments, or Users above.</div>
        }
      </div>
    </main>
  )
}

export default AdminSearchPage;