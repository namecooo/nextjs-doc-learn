import "server-only";

import { notFound } from "next/navigation";

interface Post {
  id: string;
  title: string;
  content: string;
}

async function getPost(id: string) {
  const res = await fetch(`https://api.vercel.app/blog/${id}`);
  const post: Post = await res.json();

  if (!post) notFound();
  return post;
}

export async function generateStaticParams() {
  const posts = await fetch("https://api.vercel.app/blog").then((res) =>
    res.json()
  );

  return posts.map((post: Post) => ({
    id: post.id.toString(),
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params;

  const post = await getPost(id);

  return {
    title: post.title,
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const post = await getPost(id);

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}
