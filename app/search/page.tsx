// Components
import SearchForm from "../_components/forms/SearchForm";
import SearchPosts from "../_components/search/SearchPosts";
import SearchPhotos from "../_components/search/SearchPhotos";
import SearchUsers from "../_components/search/SearchUsers";

const SearchPage = async({ searchParams } : { searchParams: { query?: string, type?: string }; }) => {
  const query = searchParams?.query || '';
  const type = searchParams?.type || '';
  
  return (
    <main className='page-layout'>
      <section>
        <SearchForm title="General" />
        {type === "posts" ?
          <SearchPosts query={query} />
        : type === "photos" ?
          <SearchPhotos query={query} />
        : type === "users" ?
          <SearchUsers query={query} />
        :
          <div className="mt-4 text-center">Please select Posts, Photos, or Users above.</div>
        }
      </section>
    </main>
  )
}

export default SearchPage;