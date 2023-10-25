import "./globals.css";
import Providers from "@/components/Providers";

export const metadata = {
  title: "ChatHub - Messaging Platform",
  description: "ChatHub - A messaging platform for seamless communication",
  keywords: "ChatHub, chat, messaging, communication, MERN stack",
  author: "Osama Ibrahim",
  schemaMarkup: {
    "@context": "https://schema.org/",
    "@type": "Person",
    "name": "Osama",
    "jobTitle": "Front-end Developer",
    "url": "https://osama-ibrahim-portfolio.vercel.app/",
    "sameAs": [
      "https://www.linkedin.com/in/osama-ibrahim2002/",
      "https://github.com/OsamaHIma/"
    ]
  }
};


const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/logoTab.svg" />
        <link href="highlight.js/monokai-sublime.min.css" rel="stylesheet" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js" integrity="sha512-D9gUyxqja7hBtkWpPWGt9wfbfaMGVt9gnyCvYa+jojwwPHLCzUm5i8rpk7vD7wNee9bA35eYIjobYPaQuKS1MQ==" crossorigin="anonymous" referrerpolicy="no-referrer" ></script>
      </head>
      <body className="bg-indigo-200 text-gray-900 ltr:!font-poppins rtl:!font-cairo dark:bg-gray-900 dark:text-slate-100">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};
export default RootLayout;
