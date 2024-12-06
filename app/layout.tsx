import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/providers"
import { ThemeToggle } from "@/components/theme-toggle"

// More comprehensive font configuration
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
  display: 'swap'
})

// Enhanced metadata with more SEO-friendly configuration
export const metadata: Metadata = {
  title: {
    default: "Prana Local",
    template: "%s | Prana Local"
  },
  description: "Prana Local - Beautiful Digital Solutions, Inspired by Nature.",
  keywords: [
    "mobile app development", 
    "web development", 
    "e-commerce", 
    "data visualization", 
    "business strategy", 
    "tech consulting", 
    "mobile app design", 
    "web design", 
    "e-commerce development", 
    "data visualization solutions", 
    "business strategy planning", 
    "tech consulting services", 
    "full-stack development",
    "database design",
    "API development",
    "big data solutions",
    "machine learning",
    "data analytics",
    "data science",
    "data visualization",
    "data management",
    "data integration",
    "data pipeline",
    "data warehouse",
    "data transformation",
    "data cleansing",
    "data quality",
    "data security",
    "data privacy",
    "data governance",
    "data monitoring",
    "data reporting",
    "data analytics",
    "data visualization",
    "data analytics",
    "data visualization",
    "data analytics",
    "data visualization",
    "secure development",
    "cloud computing",
    "devops",
    "product management",
    ],
  openGraph: {
    title: "Prana Local",
    description: "Beautiful Digital Solutions, Inspired by Nature",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prana Local",
    description: "Beautiful Digital Solutions, Inspired by Nature"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    }
  }
}

// Viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning 
      className={`${inter.variable} font-sans`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#2ee89e" />
      </head>
      <body 
        className={`
          ${inter.className} 
          min-h-screen 
          bg-background 
          text-foreground 
          antialiased
          overflow-x-hidden
          selection:bg-primary/20
          selection:text-primary-dark
          relative
        `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="relative">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}