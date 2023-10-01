import prisma from '../prisma/lib/prisma';

// Components
import PostForm from './components/PostForm';

const Home = async () => {
  const data = await prisma.post.findMany({
    include: {
      author: {
        select: { id: true }
      },
    }
  });

  return (
    <main>
      <h1 className="text-3xl font-bold underline">Hello, Home Page!</h1>
      <PostForm />
      {data.length > 0 ? 
        <ul>
          {data.map((post) => (
            <>
              <li>{post.id}</li>
              <li>{post.content}</li>
              <li>{post.authorEmail}</li>
              <li>{post.author.id}</li>
            </>
          ))}
        </ul> :
        <p>No posts yet! Create a post!</p>
      }
    </main>
  )
}

export default Home;