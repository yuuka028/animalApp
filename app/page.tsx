"use client"; // ✅ クライアントコンポーネントとして指定

import Link from "next/link";

export default function Home() {
    return (
        <div style={{ textAlign: "center", margin: "0 10px" }}>
            <h2 style={{ fontSize: "16px", marginTop: "100px" }}>あにまるの画像をひたすら楽しむことができます</h2>
            <div style={{ display: "flex", justifyContent: "space-around", width: "300px", margin: "0 auto", marginTop: "50px" }}>
                <p style={{ background: "#4191E0", padding: "10px", borderRadius: "10px" }}>
                    <Link href="/dog" style={{ color: "#ffffff", textDecoration: "none", fontWeight: "bold" }}>いぬを見る</Link>
                </p>
                <p style={{ background: "#4191E0", padding: "10px", borderRadius: "10px" }}>
                    <Link href="/cat" style={{ color: "#ffffff", textDecoration: "none", fontWeight: "bold" }}>ねこを見る</Link>
                </p>
            </div>
        </div>
    );
}
