import "./globals.css";

export const metadata = {
  title: "Engagement Analyzer - Instagram & TikTok Public Engagement Metrics",
  description: "Analyze Instagram and TikTok public engagement, detect bot activity, and get authenticity scores for accounts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-ios bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 min-h-screen">
        {/* Background decoration elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-400/10 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}