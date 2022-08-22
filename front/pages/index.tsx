import Head from "next/head";
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{" "}
          <a className="text-blue-600" href="https://nextjs.org">
            Next.js!
          </a>
        </h1>
        <Link href = "/counter" >
          <a className="text-6xl text-blue-600 font-bold">
            /counter
          </a>
        </Link>
        <Link href = "/markets" >
          <a className="text-6xl text-blue-600 font-bold">
            /markets
          </a>
        </Link>
        <Link href = "/testzk" >
          <a className="text-6xl text-blue-600 font-bold">
            /testzk
          </a>
        </Link>
        <Link href = "/_main" >
          <a className="text-6xl text-blue-600 font-bold">
            /_main
          </a>
        </Link>
      </main>
    </div>
  );
}
