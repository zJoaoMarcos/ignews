import { GetServerSideProps, GetStaticProps } from "next";
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { RichText } from "prismic-dom";
import { getPrismicClient } from "../../../services/prismic";

import styles from "../post.module.scss";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface PostPreviewProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function PostPreview({ post }: PostPreviewProps) {
  const {data}: any = useSession();
  const router = useRouter();

  useEffect(() => {
    if (data?.activeSubscription) {
      router.push(`/posts/${post.slug}`)
    }
  }, [data])


  return (
    <>
      <Head>
        <title>{post?.title} | Ignews</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post?.title}</h1>
          <time>{post?.updatedAt}</time>
          <div
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: post?.content }}
          />

          <div className={styles.continueReading}>
            Wanna continue reading?{" "}
            <Link href="/" legacyBehavior>
              <a>Subscribe now 🤗</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as any

  const prismic = getPrismicClient();

  const response: any = await prismic.getByUID("publication", slug, {});

  const post = {
    slug,
    title: RichText.asText(response.data?.title),
    content: RichText.asHtml(response.data?.content.splice(0, 3)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ),
  };

  return {
    props: {
      post,
    },
    revalidate: 60 * 30, //30 minutes
  };
};
