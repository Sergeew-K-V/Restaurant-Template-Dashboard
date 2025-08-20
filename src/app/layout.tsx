import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ReactQueryProvider } from "@/shared/providers/ReactQueryProvider";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const poppinsFont = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Dashboard App",
  description: "Create next dashboard app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppinsFont.variable} antialiased`}>
        <AntdRegistry>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
