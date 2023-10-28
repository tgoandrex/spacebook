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
        <div className="flex flex-col items-center sm:flex-row text-center flex-grow justify-between h-full sm:mt-24">
        <div className="flex-1">
          <div className="relative w-[400px] h-[400px] bg-yellow-400 dark:bg-white rounded-full flex items-center justify-center shadow-xl">
            <div className="absolute h-10 w-10 rounded-full bg-gray-500 top-[60px] left-[60px] hidden dark:block"></div>
            <div className="absolute h-8 w-8 rounded-full bg-gray-500 top-[100px] left-[120px] hidden dark:block"></div>
            <div className="absolute h-12 w-12 rounded-full bg-gray-500 top-[160px] left-[50px] hidden dark:block"></div>
            <div className="absolute w-[410px] h-[410px] bg-yellow-400 dark:bg-white rounded-full -top-1 -left-1 filter blur-lg opacity-70"></div>
            <h1 className="text-5xl font-bold font-serif dark:text-black z-10">Welcome to Spacebook</h1>
          </div>
        </div>
        <div className="flex-1 mt-12 sm:mt-0 flex-grow-1 text-3xl">To get started, login or register a new account from the navigation bar.</div>
      </div>
      */}
      <div className="flex flex-col items-center sm:flex-row text-center flex-grow justify-between h-full sm:mt-24">
        <div className="flex-1">
          <div className="relative w-[400px] h-[400px] bg-yellow-400 dark:bg-white rounded-full flex items-center justify-center shadow-xl">
            <div className="absolute h-10 w-10 rounded-full bg-gray-500 top-[60px] left-[60px] hidden dark:block"></div>
            <div className="absolute h-8 w-8 rounded-full bg-gray-500 top-[100px] left-[120px] hidden dark:block"></div>
            <div className="absolute h-12 w-12 rounded-full bg-gray-500 top-[160px] left-[50px] hidden dark:block"></div>
            <div className="absolute w-[410px] h-[410px] bg-yellow-400 dark:bg-white rounded-full -top-1 -left-1 filter blur-lg opacity-70"></div>
            <h1 className="text-5xl font-bold font-serif dark:text-black z-10">Welcome to Spacebook</h1>
          </div>
        </div>
        <div className="flex-1 mt-12 sm:mt-0 flex-grow-1 text-3xl">To get started, login or register a new account from the navigation bar.</div>
      </div>
    </main>
  )
}

export default Home;