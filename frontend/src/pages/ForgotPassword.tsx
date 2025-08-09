import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import background from "../assets/Background.svg";
import logo from "../assets/logo.svg";
import Button from "../components/Button";
const API_URL = import.meta.env.VITE_API_URL;
const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [account, setAccount] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showNewPassword] = useState(false);
  const [showConfirmPassword] = useState(false);


  useEffect(() => {
    if (step === 4) {
      const timeout = setTimeout(() => navigate("/login"), 2000);
      return () => clearTimeout(timeout);
    }
  }, [step, navigate]);

  const handleSendOtp = async () => {
    setError("");
    setMessage("");
    try {
      const res = await axios.post(`${API_URL}/auth/forgot-password/send-otp`, { account });
      setMessage(res.data.message);
      setStep(2);
    } catch (err) {
      setError(axios.isAxiosError(err) ? err.response?.data?.message || "Lỗi khi gửi OTP" : "Lỗi không xác định");
    }
  };

  const handleVerifyOtp = async () => {
    setError("");
    setMessage("");
    try {
      const res = await axios.post(`${API_URL}/verify-otp`, { account, otp });
      setMessage(res.data.message);
      setStep(3);
    } catch (err) {
      setError(axios.isAxiosError(err) ? err.response?.data?.message || "OTP không đúng" : "Lỗi không xác định");
    }
  };

  const handleResetPassword = async () => {
    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/auth/forgot-password/reset`, {
        account,
        otp,
        newPassword,
      });
      setMessage(res.data.message);
      setStep(4);
    } catch (err) {
      setError(axios.isAxiosError(err) ? err.response?.data?.message || "Lỗi khi đổi mật khẩu" : "Lỗi không xác định");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        src={logo}
        alt="Logo"
        role="button"
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

      <form
        onSubmit={(e) => e.preventDefault()}
        className="card p-4 shadow-sm rounded-5 bg-white d-flex flex-column"
        style={{ minHeight: "600px", width: "470px" }}
      >
        <div className="flex-grow-1">
          <div className="text-center mb-4">
            <h1 className="fw-bold">Quên mật khẩu</h1>
            <div className="text-muted small">
              Đã có tài khoản?{" "}
              <span
                className="text-primary fw-semibold"
                role="button"
                onClick={() => navigate("/login")}
              >
                Đăng nhập
              </span>
            </div>
          </div>

          {error && <div className="alert alert-danger py-2">{error}</div>}
          {message && <div className="alert alert-success py-2">{message}</div>}

          {step === 1 && (
            <div className="mb-3">
              <label className="form-label">Vui lòng nhập email</label>
              <input
                type="text"
                className="form-control form-control-lg border-primary"
                placeholder="Tên tài khoản email"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
              />
            </div>
          )}

          {step === 2 && (
            <div className="mb-3">
              <label className="form-label">Nhập mã OTP</label>
              <input
                type="text"
                className="form-control form-control-lg border-primary"
                placeholder="Mã OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
          )}

          {step === 3 && (
            <>
              {/* Nhập mật khẩu mới */}
              <div className="mb-3">
                <label className="form-label">Nhập mật khẩu mới</label>
                <div className="input-group input-group-lg">
                  <input
                    type={showNewPassword ? "text" : "password"} 
                    className="form-control border-primary"
                    placeholder="Mật khẩu mới"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* Xác nhận mật khẩu mới */}
              <div className="mb-3">
                <label className="form-label">Xác nhận mật khẩu mới</label>
                <div className="input-group input-group-lg">
                  <input
                    type={showConfirmPassword ? "text" : "password"} // ← bạn quên type ở đây, mình thêm lại
                    className="form-control border-primary"
                    placeholder="Nhập lại mật khẩu"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          {step === 4 && (
            <div className="text-center text-success fw-semibold mt-4">
              Mật khẩu đã được đặt lại thành công. Bạn sẽ được chuyển hướng...
            </div>
          )}
        </div>

        <div>
          {step === 1 && <Button label="Nhận mã OTP" onClick={handleSendOtp} />}
          {step === 2 && <Button label="Xác nhận OTP" onClick={handleVerifyOtp} />}
          {step === 3 && <Button label="Đặt lại mật khẩu" onClick={handleResetPassword} />}
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
