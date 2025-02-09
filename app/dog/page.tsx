"use client"; // ✅ クライアントコンポーネント

import { useState, useEffect, Suspense } from "react";
import BackToHomeButton from "../components/backbtn"; // ✅ 共通の戻るボタンを利用

export default function DogPage() {
    return (
        <Suspense fallback={<p>画像を読み込んでいます...</p>}>
            <Dog />
        </Suspense>
    );
}

function Dog() {
    const [dogImage, setDogImage] = useState("about:blank"); // ✅ 初期値を設定
    const [error, setError] = useState("");

    const fetchDogImage = async () => {
        try {
            setError("");
            const response = await fetch("https://dog.ceo/api/breeds/image/random");
            if (!response.ok) throw new Error(`HTTPエラー: ${response.status}`);
            const data = await response.json();
            setDogImage(data.message);
        } catch (err: any) {
            setError(err.message || "データの取得に失敗しました");
        }
    };

    useEffect(() => {
        fetchDogImage();
    }, []);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2 style={{ fontSize: "16px" }}>ランダムないぬ</h2><br></br>
            {error ? <p style={{ color: "red" }}>⚠️ {error}</p> : <img src={dogImage} alt="ランダムな犬" width={300} style={{ margin: "0 auto" }} />}<br></br>
            <button onClick={fetchDogImage} style={{ margin: "20px", padding: "10px", backgroundColor: "#4191E0", border: "none", borderRadius: "10px", color: "#ffffff", fontWeight: "bold" }}>
                他のいぬを見る
            </button><br></br>
            <BackToHomeButton />
        </div>
    );
}
