"use client"; // ✅ クライアントコンポーネント

import { useState, useEffect, Suspense } from "react";
import Backbtn from "../components/backbtn"; // ✅ 共通の戻るボタンを利用

export default function CatPage() {
    return (
        <Suspense fallback={<p>画像を読み込んでいます...</p>}>
            <Cat />
        </Suspense>
    );
}

function Cat() {
    const [catImage, setCatImage] = useState("about:blank"); // ✅ 初期値を設定
    const [error, setError] = useState("");

    const fetchCatImage = async () => {
        try {
            setError("");
            const response = await fetch("https://api.thecatapi.com/v1/images/search");
            if (!response.ok) throw new Error(`HTTPエラー: ${response.status}`);
            const data = await response.json();
            setCatImage(data[0].url);
        } catch (err: any) {
            setError(err.message || "データの取得に失敗しました");
        }
    };

    useEffect(() => {
        fetchCatImage();
    }, []);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2 style={{ fontSize: "16px" }}>ランダムなねこ</h2><br></br>
            {error ? <p style={{ color: "red" }}>⚠️ {error}</p> : <img src={catImage} alt="ランダムな猫" width={300} />}<br></br>
            <button onClick={fetchCatImage} style={{ margin: "20px", padding: "10px", backgroundColor: "#4191E0", border: "none", borderRadius: "10px", color: "#ffffff", fontWeight: "bold" }}>
                他のねこを見る
            </button><br></br>
            <Backbtn />
        </div>
    );
}
