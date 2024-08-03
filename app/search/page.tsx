// Components
import SearchForm from "../_components/forms/SearchForm";
import SearchPosts from "../_components/search/SearchPosts";
import SearchPhotos from "../_components/search/SearchPhotos";
import SearchUsers from "../_components/search/SearchUsers";

const SearchPage = async({ searchParams } : { searchParams: { query?: string, type?: string, page?: string, pageSize?: string }; }) => {
  const query = searchParams?.query || '';
  const type = searchParams?.type || '';
  const page = parseInt(searchParams?.page || '1', 10);
  const pageSize = parseInt(searchParams?.pageSize || '10', 10);
  
  return (
    <main className='page-layout'>
      <section>
        <SearchForm title="General" />
        {type === "posts" ?
          <SearchPosts query={query} page={page} pageSize={pageSize} />
        : type === "photos" ?
          <SearchPhotos query={query} page={page} pageSize={pageSize} />
        : type === "users" ?
          <SearchUsers query={query} page={page} pageSize={pageSize} />
        :
          <div className="mt-4 text-center">Please select Posts, Photos, or Users above.</div>
        }
      </section>
    </main>
  )
}

export default SearchPage;