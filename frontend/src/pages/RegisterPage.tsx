import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../components/Button";
import background from "../assets/Background.svg";
import logo from "../assets/logo.svg";
const API_URL = import.meta.env.VITE_API_URL;
// 🧪 Schema kiểm tra hợp lệ
const schema = yup.object().shape({
  account: yup
    .string()
    .required("Vui lòng nhập tài khoản hoặc email")
    .test("email-or-username", "Tài khoản hoặc email không hợp lệ", (value) => {
      const isEmail = /\S+@\S+\.\S+/.test(value || "");
      return isEmail || value?.length >= 3;
    }),
  username: yup.string().required("Vui lòng nhập tên người dùng"),
  password: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
  age: yup.number().required("Vui lòng nhập tuổi"),
  gender: yup.string().required("Vui lòng chọn giới tính"),
  occupation: yup.string().required("Vui lòng chọn nghề nghiệp"),
  userGroup: yup.string().required("Vui lòng chọn nhóm người dùng"),
});

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(`❌ ${result.detail}`);
        return;
      }

      alert("✅ Đăng ký thành công!");
      navigate("/login");
    } catch (error) {
      alert("❌ Lỗi kết nối server");
      console.error(error);
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
        position: "relative",
      }}>
      {/* Logo góc trái */}
      <img
        src={logo}
        alt="Logo"
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          height: "50px",
          objectFit: "contain",
          zIndex: 10,
        }}
      />

      {/* Card đăng ký */}
      <div
        className="card p-4 shadow-sm rounded-5 bg-white"
        style={{ minHeight: "600px", width: "470px" }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h6 className="text-muted">Welcome to THỦ</h6>
            <h1 className="fw-bold">Đăng ký</h1>
          </div>
          <div className="text-muted small text-end">
            Đã có tài khoản?
            <br />
            <span
              className="text-primary fw-semibold"
              role="button"
              onClick={() => navigate("/login")}>
              Đăng nhập
            </span>
          </div>
        </div>

        {/* Form bắt đầu */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Account or email */}
          <div className="mb-3">
            <label className="form-label">Nhập email</label>
            <Controller
              name="account"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="form-control form-control-lg border-primary"
                  placeholder="email"
                />
              )}
            />
            {errors.account && (
              <div className="text-danger small">{errors.account.message}</div>
            )}
          </div>

          {/* Username */}
          <div className="mb-3">
            <label className="form-label">Tên người dùng</label>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="form-control form-control-lg border-primary"
                  placeholder="Tên người dùng"
                />
              )}
            />
            {errors.username && (
              <div className="text-danger small">{errors.username.message}</div>
            )}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Nhập mật khẩu</label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="password"
                  className="form-control form-control-lg border-primary"
                  placeholder="Mật khẩu"
                />
              )}
            />
            {errors.password && (
              <div className="text-danger small">{errors.password.message}</div>
            )}
          </div>

          {/* Age */}
          <div className="mb-3">
            <label className="form-label">Tuổi</label>
            <Controller
              name="age"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  className="form-control form-control-lg border-primary"
                  placeholder="Nhập tuổi"
                />
              )}
            />
            {errors.age && <div className="text-danger small">{errors.age.message}</div>}
          </div>

          {/* Gender */}
          <div className="mb-3">
            <label className="form-label">Giới tính</label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <select {...field} className="form-control form-control-lg border-primary">
                  <option value="">-- Chọn giới tính --</option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </select>
              )}
            />
            {errors.gender && <div className="text-danger small">{errors.gender.message}</div>}
          </div>

          {/* Occupation */}
          <div className="mb-3">
            <label className="form-label">Nghề nghiệp</label>
            <Controller
              name="occupation"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="form-control form-control-lg border-primary"
                  placeholder="Nhập nghề nghiệp"
                />
              )}
            />
            {errors.occupation && <div className="text-danger small">{errors.occupation.message}</div>}
          </div>

          {/* User Group */}
          <div className="mb-3">
            <label className="form-label">Bạn thuộc nhóm nào dưới đây?</label>
            <Controller
              name="userGroup"
              control={control}
              render={({ field }) => (
                <select {...field} className="form-control form-control-lg border-primary">
                  <option value="">-- Chọn nhóm --</option>
                  <option value="Người khiếm thính">Người khiếm thính</option>
                  <option value="Người thân của người khiếm thính">Người thân của người khiếm thính</option>
                  <option value="Giáo viên / Tình nguyện viên">Giáo viên / Tình nguyện viên</option>
                  <option value="Người quan tâm đến ngôn ngữ ký hiệu">Người quan tâm đến ngôn ngữ ký hiệu</option>
                </select>
              )}
            />
            {errors.userGroup && <div className="text-danger small">{errors.userGroup.message}</div>}
          </div>

          {/* Nút đăng ký */}
          <div className="d-flex justify-content-center mt-3">
            <Button label="Đăng ký" variant="blue" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
