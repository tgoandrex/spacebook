// Components
import Feed from "./_components/Feed";
import PostForm from "./_components/forms/PostForm";

const Home = () => {
  return (
    <main className='page-layout'>
      {/*
        (If the user is authenticated...) {
          <PostForm />
          <Feed />
        }
        // Else show the below message
        <div className="flex flex-col items-center sm:flex-row text-center flex-grow justify-between h-full">
          <h1 className="text-6xl font-bold flex-1 font-serif">Welcome to Spacebook</h1>
          <span className="flex-1">To get started, login or register a new account from the navigation bar.</span>
        </div>
      */}
      <PostForm />
      <Feed />
    </main>
  )
}

export default Home;