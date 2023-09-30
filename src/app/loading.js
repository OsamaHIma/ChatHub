export default function Loading() {
  return (
    <div
      className="relative flex h-screen flex-col items-center justify-center bg-stone-200 dark:bg-primary-black"
      dir="ltr"
    >
      <div className="gradient absolute top-20  h-80 w-80 bg-indigo-600/30 blur-[100px]" />

      <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-gray-900 dark:border-gray-300"></div>
      <div className="mt-2 text-lg text-gray-900 dark:text-stone-300">
        Loading...
      </div>
    </div>
  );
}
