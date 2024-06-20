import Nav from "./components/Nav";
import "./globals.css"
import { Container } from "react-bootstrap";
import AuthProvider from "./providers/AuthProvider";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
            <html lang="en">
            <body className="">
            
            <AuthProvider>
               
              	
                  {children}
              
            </AuthProvider>
            </body>
            </html>
  );
}
