import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import background from "../assets/background.svg";
import logo from "../assets/logo.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const API_URL = import.meta.env.VITE_API_URL;
// ✅ Schema kiểm tra form với Yup
const schema = yup.object().shape({
  username: yup.string().required("Vui lòng nhập tài khoản hoặc email"),
  password: yup.string().required("Vui lòng nhập mật khẩu"),
});

type FormData = {
  username: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const [passwordVisible] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });


  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // gửi username & password
      });

      const result = await response.json();

      if (!response.ok) {
        setSubmitError(result.detail || "Đăng nhập thất bại");
        return;
      }

      localStorage.setItem("user", JSON.stringify({ username: result.username }));
      localStorage.setItem("token", result.token || "dummy_token");

      alert("Đăng nhập thành công!");
      navigate("/");
    } catch (err) {
      console.error("Lỗi kết nối:", err);
      setSubmitError("Lỗi kết nối tới server");
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
      }}>
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
        onSubmit={handleSubmit(onSubmit)}
        className="card p-4 shadow-sm rounded-5 bg-white"
        style={{ minHeight: "600px", width: "470px" }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h6 className="text-muted">Welcome to THỦ</h6>
            <h1 className="fw-bold">Đăng nhập</h1>
          </div>
          <div className="text-muted small text-end">
            Chưa có tài khoản?
            <br />
            <span
              className="text-primary fw-semibold"
              role="button"
              onClick={() => navigate("/register")}>
              Đăng ký
            </span>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Nhập tên tài khoản hoặc email</label>
          <input
            type="text"
            className={`form-control form-control-lg border-primary ${
              errors.username ? "is-invalid" : ""
            }`}
            placeholder="Tên tài khoản hoặc email"
            {...register("username")}
          />
          {errors.username && (
            <div className="invalid-feedback d-block">
              {errors.username.message}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Nhập mật khẩu</label>
          <div className="input-group input-group-lg">
            <input
              type={passwordVisible ? "text" : "password"}
              className={`form-control border-primary ${
                errors.password || submitError ? "is-invalid" : ""
              }`}
              placeholder="Mật khẩu"
              {...register("password")}
            />
          </div>
          {errors.password && (
            <div className="invalid-feedback d-block">
              {errors.password.message}
            </div>
          )}
          {submitError && (
            <div className="invalid-feedback d-block">{submitError}</div>
          )}
          <div className="d-flex justify-content-end mt-1">
            <div
              className="text-end mt-1 small text-primary"
              role="button"
              onClick={() => navigate("/forgot")}>
              Quên mật khẩu?
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center my-2">
          <Button label="Đăng nhập" variant="blue" />
        </div>

        <div className="d-flex justify-content-center align-items-center my-3">
          <span className="text-muted small">Hoặc</span>
        </div>

        <div className="d-flex justify-content-center my-2">
          <Button label="Đăng nhập bằng Google" variant="google" />
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
