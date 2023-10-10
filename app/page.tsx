import prisma from '../prisma/lib/prisma';

// Components
import PostForm from './_components/forms/PostForm';

const Home = async () => {
  /* Backend temporarily DISABLED: Usage has exceeded the resources included on the HOBBY  plan and no additional data can be written (10/04)
  const data = await prisma.post.findMany({
    where: {
      // However we find the authorized user's followed user(s) posts!
    },
    include: {
      author: {
        select: { id: true }
      }
    }
  });
  */

  return (
    <main className='page-layout'>
      <h1 className="text-3xl font-bold underline">Hello, Home Page!</h1>
      <PostForm />
      {/* Backend temporarily DISABLED: Usage has exceeded the resources included on the HOBBY  plan and no additional data can be written (10/04)
      data.length > 0 ? 
        <ul>
          {data.map((post) => (
            <li key={post.id}>
              <span>{post.id}</span>
              <span>{post.content}</span>
              <span>{post.authorEmail}</span>
              <span>{post.author.id}</span>
            </li>
          ))}
        </ul> :
        <p>No posts yet! Create a post!</p>
      */}
    </main>
  )
}

export default Home;