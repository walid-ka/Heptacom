import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Logo from "@/components/logo";
import MainNav from "@/components/mainNav";
import { Toaster } from "react-hot-toast";
import Provider from "@/provider/provider";
import { GlobalStateProvider } from "@/provider/contextProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// this will be in all pages
export const metadata: Metadata = {
  title: "HEPTACOM",
  description: "Internal application",
};

// if we want for each page
// export const metedata = {
//   title: {
//     template: "HEPTACOM | %s ",
//     default: "HEPTACOM",
//     description: "Internal application",

//   }
// }

//  then use this in every page 
// export const metadata: Metadata = {
//   title: "About",
//   description: "About HEPTACOM",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="grid grid-cols-[16rem,1fr] grid-rows-[auto,1fr] h-screen">
          <aside className="flex flex-col justify-start gap-20 my-20 mx-5 ">
            <Logo />
            <MainNav />
          </aside>
          <main className=" px-16 pb-10 bg-background-secondary overflow-scroll w-full h-screen scrollbar-hide">
            <div className="max-w-[120rem] mt-10 flex flex-col gap-14 w-full">
              <GlobalStateProvider>
                <Provider>
                  {children}
                </Provider>
              </GlobalStateProvider>
            </div>
          </main>
        </div>

        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: { duration: 3000 },
            error: { duration: 5000 },
            style: {
              fontSize: "14px",
              maxWidth: "400px",
              padding: "14px 20px",
              backgroundColor: "#ffffff",
              color: "#898989",
            },
          }}
        />
      </body>
    </html>
  );
}
