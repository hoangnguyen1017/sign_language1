import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import background from "../assets/background.svg";
import logo from "../assets/logo.svg";
import Image from "../assets/bantay.svg";
const API_URL = import.meta.env.VITE_API_URL;
const FeedbackPage: React.FC = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const username = user?.username || "Ẩn danh";
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!name.trim() || !content.trim()) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }

    try {
      await fetch(`${API_URL}/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          subject: name,
          content: content,
        }),
      });

      setError("");
      setSubmitted(true);
      navigate("/");
    } catch (error) {
      console.error("Lỗi khi gửi phản hồi:", error);
      setError("Đã xảy ra lỗi khi gửi phản hồi");
    }
  };


  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          width: "100vw",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          position: "relative",
        }}>
        {/* Logo */}
        <img
          src={logo}
          alt="Logo"
          onClick={() => navigate("/")}
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

        {/* BÊN TRÁI: Hình ảnh */}
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "end",
          }}>
          <img
            src={Image}
            alt="Hình đại diện"
            style={{
              width: "150%",
              maxHeight: "150%",
            }}
          />
        </div>

        {/* BÊN PHẢI: Form feedback */}
        <div className="d-flex justify-content-center align-items-center">
          <div
            className="card p-4 shadow-sm rounded-5 bg-white"
            style={{ width: "100%", maxWidth: "400px", height: "530px" }}>
            {!submitted ? (
              <>
                <div>
                  <h1 className="fw-bold text-center mb-3">Phản hồi</h1>

                  <div className="mb-3">
                    <label className="form-label">
                      Bạn muốn phản hồi về vấn đề gì?
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg border-primary"
                      placeholder="Vấn đề phản hồi"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="mb-2">
                    <label className="form-label">Nhập nội dung phản hồi</label>
                    <textarea
                      className="form-control form-control-lg border-primary"
                      rows={7}
                      placeholder="Nội dung phản hồi"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      style={{ resize: "none" }}
                    />
                  </div>

                  {error && (
                    <div className="text-danger small mb-2">{error}</div>
                  )}
                </div>

                <div className="d-grid mt-2">
                  <Button
                    label="Gửi phản hồi"
                    variant="blue"
                    onClick={handleSubmit}
                  />
                </div>
              </>
            ) : (
              <div className="text-center d-flex flex-column justify-content-center h-100">
                <h2 className="fw-bold mb-4">PHẢN HỒI</h2>

                <p className="text mb-3">
                  Cảm ơn quý khách đã phản hồi! <br />Ý kiến của quý khách sẽ
                  được tiếp nhận và góp phần phát triển sản phẩm.
                </p>
                <p className="text mb-4">
                  Cùng chung tay phát triển một <br />
                  Xã hội Việt Nam không rào cản ngôn ngữ.
                </p>

                {/* <div className="d-grid gap-2">
                  <Button
                    label="Gửi thành công!"
                    variant="blue"
                    onClick={handleBack}
                  />
                </div> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
