import "./globals.css";
import Providers from "@/components/Providers";

export const metadata = {
  title: "ChatHub - Messaging Platform",
  description: "ChatHub - A messaging platform for seamless communication",
  keywords: "ChatHub, chat, messaging, communication, MERN stack",
  author:"Osama Ibrahim",
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
      </head>
      <body className="bg-stone-200 text-gray-900 ltr:!font-poppins rtl:!font-cairo dark:bg-gray-900 dark:text-slate-100">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};
export default RootLayout;
