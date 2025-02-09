
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body style={{ margin: 0 }}>
        <header style={{ textAlign: "center", padding: "10px", backgroundColor: "#4191E0", }}>
          <h1 style={{ color: "#ffffff", margin: "0" }}>🐾ランダムあにまる🐾</h1>

        </header>
        <main>{children}</main>

      </body>
    </html>
  );
}
