import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

// Components
import SearchForm from "../../_components/forms/SearchForm";
import AdminSearchPosts from "../../_components/search/admin/AdminSearchPosts";
import AdminSearchPhotos from "../../_components/search/admin/AdminSearchPhotos";
import AdminSearchUsers from "../../_components/search/admin/AdminSearchUsers";
import AdminSearchComments from "../../_components/search/admin/AdminSearchComments";

const AdminSearchPage = async({ searchParams } : { searchParams: { query?: string, type?: string }; }) => {
  const query = searchParams?.query || '';
  const type = searchParams?.type || '';

  const session = await getServerSession(authOptions);

  if(session?.user.role === "User") {
    redirect("/");
  }

  return (
    <main className='page-layout'>
      <SearchForm title="Admin" />
      <div className="overflow-x-auto">
        {type === "posts" ?
          <AdminSearchPosts query={query} />
        : type === "photos" ?
          <AdminSearchPhotos query={query} />
        : type === "comments" ?
          <AdminSearchComments query={query} />
        : type === "users" ?
          <AdminSearchUsers query={query} />
        :
          <div className="mt-4 text-center">Please select Posts, Photos, Comments, or Users above.</div>
        }
      </div>
    </main>
  )
}

export default AdminSearchPage;