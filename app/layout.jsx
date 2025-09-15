
export const metadata = {
  title: "Cannata",
  description: "Cannata website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
