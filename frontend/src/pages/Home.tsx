import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import background from "../assets/background.svg";
import section1 from "../assets/section1.svg";
import login_register from "../assets/login_register.svg";
import camera from "../assets/camera.svg";
import using from "../assets/using.svg";
import mail from "../assets/mail.svg";
import logo from "../assets/logo.svg";
import facebook from "../assets/facebook.svg";
import tiktok from "../assets/tiktok.svg";
import mailIcon from "../assets/mail_icon.svg";
import location from "../assets/location.svg";
import phone from "../assets/phone.svg";
import { useNavigate } from "react-router-dom";

const Home = () => {
  type User = {
    username: string;
  };

  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Lỗi khi parse user", error);
      }
    }
  }, []);

  const bgStyle: React.CSSProperties = {
    position: "fixed",
    top: "56px",
    left: 0,
    width: "100%",
    height: "calc(100vh - 56px)",
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    zIndex: -1,
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Lỗi khi parse user", error);
      }
    }
  }, []);

  return (
    <div>
      <Navbar user={user} />

      {/* Nền đứng yên */}
      <div style={bgStyle}></div>

      {/* Các section dạng slide */}
      <main className="position-relative z-0 text-white">
        <section className="min-vh-100 d-flex align-items-center">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-6">
                <h1 className="display-4 fw-bold">
                  Công cụ chuyển đổi<br></br>Ngôn ngữ Ký hiệu sang<br></br>tiếng
                  Việt dành cho<br></br>người Việt
                </h1>
                <p className="lead">
                  THỦ hỗ trợ dịch ngôn ngữ ký hiệu Việt Nam thành tiếng Việt
                  <br></br>ngay lập tức, hoạt động trên tất cả thiết bị sở hữu
                  camera.<br></br>Công cụ hoàn toàn miễn phí, phù hợp cho người
                  khiếm ngữ,<br></br>giáo viên, học sinh và tất cả người dân
                  Việt Nam trong giao<br></br>tiếp không rào cản.
                </p>
                <button
                  className="btn btn-outline-light"
                  title={!user ? "Bạn cần đăng nhập để dùng công cụ" : ""}
                  onClick={() => {
                    if (user) {
                      navigate("/page");
                    } else {
                      navigate("/login");
                    }
                  }}>
                  DÙNG NGAY
                </button>
              </div>
              <div className="col-6">
                <img src={section1} alt="" />
              </div>
            </div>
          </div>
        </section>

        <section
          className="min-vh-100 d-flex align-items-center"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(255,255,255,0.4), rgba(255,255,255,0))",
            backdropFilter: "blur(0px)",
            WebkitBackdropFilter: "blur(0px)",
          }}>
          <div className="container">
            <h1 className="text-center">THỦ LÀ AI</h1>
            <h2 className="fw-normal text-center pt-5">
              Thủ là dự án khởi nghiệp được thực hiện bởi nhóm sinh viên thuộc
              <br />
              Trường Đại học FPT phân hiệu TP. HCM. Dự án được tạo ra với mục
              <br />
              đích xóa bỏ rào cản giao tiếp giữa người khiếm ngữ và xã hội Việt
              <br />
              Nam. Chúng tôi mang xứ mệnh trao cơ hội phát triển tương lai
              <br />
              người khiếm ngữ và đồng bào Việt Nam ngày vững mạnh.
            </h2>
          </div>
        </section>

        <section className="min-vh-100 d-flex align-items-center">
          <div className="container">
            <h1 className="text-center">CÁCH SỬ DỤNG</h1>
            <p className="text-center fs-5 pt-3 fw-normal">
              Để có trải nghiệm sử dụng tốt nhất, dưới đây là bảng hướng dẫn sử
              dụng
            </p>
            <div className="row py-5">
              <div className="col-6 d-flex justify-content-center">
                <img src={login_register} alt="" />
              </div>
              <div className="col-6">
                <span className="display-4 fw-bold text-secondary">01</span>
                <h3 className="fw-bold">
                  <span className="text-primary">Đăng nhập</span> /{" "}
                  <span className="text-info">Đăng ký</span>
                </h3>
                <p className="fs-5 mt-3">
                  Quý khách vui lòng Đăng nhập hoặc Đăng ký tài khoản để sử dụng
                  công cụ THỬ. Quý khách có thể hoàn tất bước 01 thông qua mục
                  Đăng nhập / Đăng ký trên thanh Menu.
                </p>
              </div>
            </div>
            <div className="row py-5">
              <div className="col-6">
                <span className="display-4 fw-bold text-secondary">02</span>
                <h3 className="fw-bold">
                  <span className="text-primary">Cho phép Camera</span>
                </h3>
                <p className="fs-5 mt-3">
                  Để có thể sử dụng công cụ, Quý khách vui lòng cho phép trình
                  duyệt THỦ được sử dụng Camera trên thiết bị của Quý khách.
                </p>
              </div>
              <div className="col-6 d-flex justify-content-center">
                <img src={camera} alt="" />
              </div>
            </div>
            <div className="row py-5">
              <div className="col-6 d-flex justify-content-center">
                <img src={using} alt="" />
              </div>
              <div className="col-6">
                <span className="display-4 fw-bold text-secondary">03</span>
                <h3 className="fw-bold">
                  <span className="text-primary">Bắt đầu sử dụng</span>
                </h3>
                <p className="fs-5 mt-3">
                  Để công cụ dễ dàng nhận diện chuyển động tay của Quý khách,
                  Quý khách vui lòng điều chỉnh Camera sao cho vùng thu hình ảnh
                  bắt trọn 1 hoặc 2 bàn tay của Quý khách. Sau khi đáp ứng được
                  điều kiện trên Quý Khách có thể sử dụng công cụ một cách thoải
                  mái nhất!
                </p>
              </div>
            </div>
            <div className="row py-5">
              <div className="col-6">
                <span className="display-4 fw-bold text-secondary">04</span>
                <h3 className="fw-bold">
                  <span className="text-primary">Phản hồi</span>
                </h3>
                <p className="fs-5 mt-3">
                  Chúc Quý khách có trải nghiệm tuyệt vời với THỦ! Nếu Quý khách
                  có bất kỳ thắc mắc hay ý kiến gì về công cụ THỦ, Quý khách có
                  thể liên hệ chúng tôi qua Hotline/Gmail/Mục Phản hồi trên
                  thanh Menu.
                </p>
              </div>
              <div className="col-6 d-flex justify-content-center">
                <img src={mail} alt="" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-black p-5">
        <div className="container">
          <div className="row">
            <div className="col-6 align-items-center gap-3 text-white">
              <div className="d-flex align-items-center gap-3">
                <img src={logo} alt="" />
                <h1 className="text-white">THỦ</h1>
              </div>

              <p>
                Sứ mệnh của chúng tôi là xây dựng một<br></br>nền tảng giao tiếp
                hòa nhập, hỗ trợ cộng<br></br>đồng người khiếm ngữ Việt Nam
                thông<br></br>qua công nghệ nhận diện ngôn ngữ ký<br></br>hiệu.
                Chung tay xóa bỏ rào cản ngôn ngữ,<br></br>bắt đầu từ một cử chỉ
                tay.
              </p>
              <div className="d-flex gap-3">
                <div className="gap-2 d-flex align-items-center">
                  <img src={facebook} alt="" />
                  <a
                    href="https://www.facebook.com/profile.php?id=61577366454686"
                    target="_blank"
                    rel="noopener noreferrer">
                    Facebook
                  </a>
                </div>
                <div className="gap-2 d-flex align-items-center">
                  <img src={tiktok} alt="" />
                  <a
                    href="https://www.tiktok.com/@thu_signlanguagedetector"
                    target="_blank"
                    rel="noopener noreferrer">
                    Tiktok
                  </a>
                </div>
              </div>
            </div>
            <div className="col-6 text-white align-items-center justify-content-center">
              <h1 className="text-decoration-underline">LIÊN HỆ CHÚNG TÔI</h1>
              <div className="pt-3 gap-3 d-flex flex-column">
                <div className="d-flex gap-3 ">
                  <img src={location} alt="" />
                  <p>7 Đ. D1, Long Thạnh Mỹ, Thủ Đức, Hồ Chí Minh 700000 </p>
                </div>
                <div className="d-flex gap-3">
                  {" "}
                  <img src={mailIcon} alt="" />
                  <p>thusinglanguagedetector@gmail.com</p>
                </div>
                <div className="d-flex gap-3">
                  {" "}
                  <img src={phone} alt="" />
                  <p>+84 12345 6789</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
