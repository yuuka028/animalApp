"use client";
import Image from "next/image";

import { useState, useEffect, Suspense } from "react";
import Backbtn from "../components/backbtn";

export default function CatPage() {
    return (
        <Suspense fallback={<p>画像を読み込んでいます...</p>}>
            <Cat />
        </Suspense>
    );
}

function Cat() {
    const [catImage, setCatImage] = useState("about:blank");
    const [error, setError] = useState("");

    const fetchCatImage = async () => {
        try {
            setError("");
            const response = await fetch("https://api.thecatapi.com/v1/images/search");
            if (!response.ok) throw new Error(`HTTPエラー: ${response.status}`);
            const data = await response.json();
            setCatImage(data[0].url);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("データの取得に失敗しました");
            }
        }
    };

    useEffect(() => {
        fetchCatImage();
    }, []);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2 style={{ fontSize: "16px" }}>ランダムなねこ</h2><br></br>
            {error ? <p style={{ color: "red" }}>⚠️ {error}</p> : <Image src={catImage} alt="ランダムな猫" width={300} height={300} priority />}<br></br>
            <button onClick={fetchCatImage} style={{ margin: "20px", padding: "10px", backgroundColor: "#4191E0", border: "none", borderRadius: "10px", color: "#ffffff", fontWeight: "bold" }}>
                他のねこを見る
            </button><br></br>
            <Backbtn />
        </div>
    );
}
