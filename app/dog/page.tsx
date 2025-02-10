"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Backbtn from "../components/backbtn";

const placeholder = "https://via.placeholder.com/300"; // ✅ ダミー画像を設定

export default function DogPage() {
    return <Dog />;
}

function Dog() {
    const [dogImage, setDogImage] = useState<string>(placeholder);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchDogImage();
    }, []);

    const fetchDogImage = async () => {
        try {
            setDogImage(placeholder); // ✅ 画像をリセットしてプレースホルダーを表示
            setError("");
            const response = await fetch("https://dog.ceo/api/breeds/image/random");
            if (!response.ok) throw new Error(`HTTPエラー: ${response.status}`);
            const data: { message: string } = await response.json();
            setDogImage(data.message);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "データの取得に失敗しました");
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2 style={{ fontSize: "16px" }}>ランダムないぬ</h2><br></br>
            {error ? (
                <p style={{ color: "red" }}>⚠️ {error}</p>
            ) : (
                <Image src={dogImage} alt="ランダムないぬ" width={300} priority />
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
