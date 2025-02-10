"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Backbtn from "../components/backbtn";

export default function DogPage() {
    return <Dog />;
}

function Dog() {
    const [dogImage, setDogImage] = useState<string | null>(null);
    const [error, setError] = useState("");

    // ✅ `useEffect` の前に関数を定義
    const fetchDogImage = async () => {
        try {
            setDogImage(null); // ✅ エラーが起きた場合に備えて、画像をリセット
            setError(""); // ✅ エラー表示をリセット
            const response = await fetch("https://dog.ceo/api/breeds/image/random");
            if (!response.ok) throw new Error(`HTTPエラー: ${response.status}`);
            const data: { message: string } = await response.json();
            setDogImage(data.message);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "データの取得に失敗しました");
        }
    };

    useEffect(() => {
        fetchDogImage();
    }, []); // ✅ 依存配列を明示的に `[]` に設定

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2 style={{ fontSize: "16px" }}>ランダムないぬ</h2><br></br>
            {error ? (
                <p style={{ color: "red" }}>⚠️ {error}</p>
            ) : dogImage ? (
                <Image src={dogImage} alt="ランダムないぬ" width={300} height={300} priority />
            ) : (
                <p>画像を読み込んでいます...</p> // ✅ 初期表示時のプレースホルダー
            )}
            <br></br>
            <button
                onClick={fetchDogImage}
                style={{ margin: "20px", padding: "10px", backgroundColor: "#4191E0", border: "none", borderRadius: "10px", color: "#ffffff", fontWeight: "bold" }}
            >
                他のいぬを見る
            </button>
            <br></br>
            <Backbtn />
        </div>
    );
}
