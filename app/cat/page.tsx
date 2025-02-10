"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Backbtn from "../components/backbtn";

const placeholder = "https://via.placeholder.com/300"; // ✅ ダミー画像を設定

export default function CatPage() {
    return <Cat />;
}

function Cat() {
    const [catImage, setCatImage] = useState<string>(placeholder);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchCatImage();
    }, []);

    const fetchCatImage = async () => {
        try {
            setCatImage(placeholder); // ✅ 画像をリセットしてプレースホルダーを表示
            setError("");
            const response = await fetch("https://api.thecatapi.com/v1/images/search");
            if (!response.ok) throw new Error(`HTTPエラー: ${response.status}`);
            const data: { url: string }[] = await response.json();
            setCatImage(data[0].url);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "データの取得に失敗しました");
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2 style={{ fontSize: "16px" }}>ランダムなねこ</h2><br></br>
            {error ? (
                <p style={{ color: "red" }}>⚠️ {error}</p>
            ) : (
                <Image src={catImage} alt="ランダムなねこ" width={300} priority />
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
