import { useRouter } from "next/navigation";


export default function Backbtn() {
    const router = useRouter();
    return (
        <>
            <button onClick={() => router.push("/")} style={{ margin: "20px", padding: "10px", backgroundColor: "#4191E0", border: "none", borderRadius: "10px", color: "#ffffff", fontWeight: "bold" }}>トップに戻る</button>
        </>
    )
}