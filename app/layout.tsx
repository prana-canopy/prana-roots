import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/providers"
import { ThemeToggle } from "@/components/theme-toggle"
import { Toaster } from "@/components/ui/toaster"

// More comprehensive font configuration
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
  display: 'swap'
})

// Enhanced metadata with more SEO-friendly configuration
export const metadata: Metadata = {
  title: {
    default: "Prana Roots - Your Gateway to Wellness",
    template: "%s | Prana Roots"
  },
  description: "Prana Roots - Empowering your wellness journey with holistic solutions and personalized support",
  keywords: [
    "wellness", 
    "holistic health", 
    "personal development", 
    "lifestyle",
    "mindfulness"
  ],
  openGraph: {
    title: "Prana Roots",
    description: "Your Gateway to Wellness",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prana Roots",
    description: "Your Gateway to Wellness"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    }
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
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
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body 
        className={`
          ${inter.className} 
          min-h-screen 
          bg-background 
          text-foreground 
          antialiased
          overflow-x-hidden
        `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <ThemeToggle />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}