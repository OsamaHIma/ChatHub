import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative paddings innerWidth !font-poppins" dir="ltr">
      <div className="gradient absolute right-[100px] top-10 h-80 w-80 bg-indigo-600/30 blur-[100px]" />

      <div className="container mx-auto min-h-screen px-6 py-12 lg:flex lg:items-center lg:gap-12">
        <div className="wf-ull lg:w-1/2">
          <div className="text-7xl text-indigo-500 font-dark font-extrabold mb-8">
            404
          </div>
          <p className="text-2xl md:text-3xl font-light leading-normal mb-8">
            Sorry we couldn&apos;t find the page you&apos;re looking for
          </p>

          <div className="mt-6 flex items-center gap-x-3">
            <Link
              href="/"
              className="px-5 inline py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-indigo-600 active:bg-orange-600 hover:bg-orange-400"
            >
              back to homepage
            </Link>
          </div>
        </div>

        <div className="relative mt-12 w-full lg:mt-0 lg:w-1/2">
          <Image
            className="w-full max-w-lg lg:mx-auto"
            width={400}
            height={400}
            priority
            src="/404.svg"
            alt="Page not found"
          />
        </div>
      </div>
    </section>
  );
}
