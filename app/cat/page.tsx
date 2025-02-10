"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Backbtn from "../components/backbtn";

export default function CatPage() {
    return <Cat />;
}

function Cat() {
    const [catImage, setCatImage] = useState<string | null>(null);
    const [error, setError] = useState("");

    // ✅ `useEffect` の前に関数を定義
    const fetchCatImage = async () => {
        try {
            setCatImage(null); // ✅ エラーが起きた場合に備えて、画像をリセット
            setError(""); // ✅ エラー表示をリセット
            const response = await fetch("https://api.thecatapi.com/v1/images/search");
            if (!response.ok) throw new Error(`HTTPエラー: ${response.status}`);
            const data: { url: string }[] = await response.json();
            setCatImage(data[0].url);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "データの取得に失敗しました");
        }
    };

    useEffect(() => {
        fetchCatImage();
    }, []); // ✅ 依存配列を明示的に `[]` に設定

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2 style={{ fontSize: "16px" }}>ランダムなねこ</h2><br></br>
            {error ? (
                <p style={{ color: "red" }}>⚠️ {error}</p>
            ) : catImage ? (
                <Image src={catImage} alt="ランダムな猫" width={300} height={300} priority />
            ) : (
                <p>画像を読み込んでいます...</p> // ✅ 初期表示時のプレースホルダー
            )}
            <br></br>
            <button
                onClick={fetchCatImage}
                style={{ margin: "20px", padding: "10px", backgroundColor: "#4191E0", border: "none", borderRadius: "10px", color: "#ffffff", fontWeight: "bold" }}
            >
                他のねこを見る
            </button>
            <br></br>
            <Backbtn />
        </div>
    );
}
