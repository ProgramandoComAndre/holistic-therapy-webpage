import Nav from "./components/Nav";
import "./globals.css"
import { Container } from "react-bootstrap";
import AuthProvider from "./providers/AuthProvider";
import { Suspense } from "react";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
            <html lang="en">
            <body className="">
            
            <AuthProvider>

              <Suspense>
               
              	
                  {children}
              </Suspense>
              
            </AuthProvider>
            </body>
            </html>
  );
}
