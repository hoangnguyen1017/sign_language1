import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.svg";
import user_icon from "../assets/user_icon.svg";
import background from "../assets/background.svg";
import Button from "../components/Button"; // Nếu cần thiết, nếu không có thì có thể xóa
const API_URL = import.meta.env.VITE_API_URL;
// ✅ GradientBox giữ nguyên như trong giao diện mẫu
const GradientBox: React.FC<{
  children: React.ReactNode;
  height?: string;
}> = ({ children, height }) => (
  <div
    style={{
      borderRadius: "20px",
      padding: "1px",
      background: "linear-gradient(135deg, #3C339A, #AEE4ED)",
      marginBottom: "1rem",
      width: "800px",
      maxWidth: "100%",
      height: height || "auto",
    }}
  >
    <div
      style={{
        backgroundColor: "rgba(11, 15, 26, 0.9)",
        borderRadius: "20px",
        padding: "1rem 2rem",
        color: "white",
        fontWeight: "bold",
        fontSize: "18px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  </div>
);

const CameraPage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [label, setLabel] = useState("Đang chờ...");
  const [note, setNote] = useState("");

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Không thể mở camera:", err);
        setLabel("Không thể mở camera");
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(captureAndSendFrame, 100);
    return () => clearInterval(interval);
  }, []);

  const captureAndSendFrame = async () => {
  if (!videoRef.current) return;

  const canvas = document.createElement("canvas");
  canvas.width = videoRef.current.videoWidth;
  canvas.height = videoRef.current.videoHeight;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
  canvas.toBlob(async (blob) => {
    if (!blob) return;

    const formData = new FormData();
    formData.append("file", blob, "frame.jpg");

    try {
      const response = await fetch(`${API_URL}/predict/`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.label) {
        setLabel(data.label);

        // 🔄 Gọi backend để lấy result_text đã được xử lý (có dấu, xóa, space)
        const textResponse = await fetch(`${API_URL}/text/`);
        const textData = await textResponse.json();
        setNote(textData.text);
      }
    } catch (error) {
      console.error("Lỗi khi gửi ảnh:", error);
      setLabel("Lỗi gửi ảnh");
    }
  }, "image/jpeg");
};

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        padding: "1rem",
      }}
    >
      {/* Left */}
      <div
        style={{
          flex: 1,
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <img
          src={logo}
          alt="Logo"
          role="button"
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            height: "50px",
            objectFit: "contain",
            zIndex: 10,
            cursor: "pointer",
          }}
        />

        {/* CAMERA */}
        <GradientBox height="600px">
          <div style={{ textAlign: "center", marginBottom: "0.5rem" }}>CAMERA</div>
          <div style={{ borderRadius: "12px", overflow: "hidden", height: "100%" }}>
            <video
              ref={videoRef}
              autoPlay
              muted
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        </GradientBox>

        {/* KẾT QUẢ */}
        <GradientBox>
          <div style={{ textAlign: "center" }}>KẾT QUẢ: {label}</div>
        </GradientBox>

        {/* NOTE - từ đang ghép */}
        <GradientBox height="250px">
          <div style={{ marginBottom: "0.5rem" }}>TỪ ĐANG GHÉP</div>
          <div
            style={{
              fontSize: "22px",
              fontWeight: "normal",
              overflowY: "auto",
              color: "#ccc",
              height: "100%",
              whiteSpace: "pre-wrap",
            }}
          >
            {note || "|"}
          </div>
        </GradientBox>
      </div>

      {/* Right */}
      <div
        style={{
          width: "220px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "stretch",
          gap: "12px",
          paddingTop: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            backgroundColor: "#1E1E2F",
            borderRadius: "12px",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "16px",
            gap: "8px",
          }}
        >
          <img src={user_icon} alt="user" style={{ width: 20, height: 20 }} />
          <span style={{ flexGrow: 1, textAlign: "center" }}>Chế độ Ghi chú</span>
        </div>
        <Button label="QUAY LẠI" variant="gray" onClick={() => window.history.back()} />
      </div>
    </div>
  );
};

export default CameraPage;