"use client";
import Image from "next/image";

import { useState, useEffect, Suspense } from "react";
import BackToHomeButton from "../components/backbtn";

export default function DogPage() {
    return (
        <Suspense fallback={<p>画像を読み込んでいます...</p>}>
            <Dog />
        </Suspense>
    );
}

function Dog() {
    const [dogImage, setDogImage] = useState("about:blank");
    const [error, setError] = useState("");

    const fetchDogImage = async () => {
        try {
            setError("");
            const response = await fetch("https://dog.ceo/api/breeds/image/random");
            if (!response.ok) throw new Error(`HTTPエラー: ${response.status}`);
            const data = await response.json();
            setDogImage(data.message);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("データの取得に失敗しました");
            }
        }
    };

    useEffect(() => {
        fetchDogImage();
    }, []);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2 style={{ fontSize: "16px" }}>ランダムないぬ</h2><br></br>
            {error ? <p style={{ color: "red" }}>⚠️ {error}</p> : <Image src={dogImage} alt="ランダムな猫" width={300} height={300} priority />}<br></br>
            <button onClick={fetchDogImage} style={{ margin: "20px", padding: "10px", backgroundColor: "#4191E0", border: "none", borderRadius: "10px", color: "#ffffff", fontWeight: "bold" }}>
                他のいぬを見る
            </button><br></br>
            <BackToHomeButton />
        </div>
    );
}
