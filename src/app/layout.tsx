import "./globals.css";

export const metadata = {
  title: "TIL | by Federico Vitale",
  description: "Today I Learned",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="rx-bg-neutral-1 rx-text-neutral-11 min-h-screen w-screen">
        <div className="max-w-[1200px] min-h-screen mx-auto px-2 sm:px-4 text-base">
          {children}
        </div>
      </body>
    </html>
  );
}
