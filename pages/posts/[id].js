export default function PostTemplate({ post }) {
  console.log(post);
  if (post?.title) return <h1>{post.title}</h1>;
  else return <h1>empty</h1>;
}

export async function getStaticPaths() {
  console.log("here1");
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();
  let posts_ = posts.slice(0, 10);

  // Get the paths we want to pre-render based on posts
  const paths = posts_.map((post) => ({
    params: { id: post.id.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params: { id } }) {
  console.log("here2");
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const post = await res.json();

  return {
    props: {
      post,
    },
    revalidate: 10,
  };
}
