import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer-container">
      <div className="row">
        <div className="col-4">
          <img
            src="https://static.careerbuilder.vn/themes/careerbuilder/img/logo.png"
            alt=""
          />
          <ul>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="19"
                viewBox="0 0 13 19"
                fill="none"
                style={{ marginRight: "19px" }}
              >
                <path
                  d="M6.46532 0.686035C3.26765 0.686035 0.651367 3.30231 0.651367 6.49999C0.651367 8.08776 2.2 10.9476 2.27636 11.0877C2.27881 11.0922 2.28058 11.0952 2.28318 11.0996L5.87299 17.1867C6.06347 17.5097 6.52849 17.5159 6.72747 17.198L10.4732 11.2154C10.4757 11.2113 10.4773 11.2088 10.4799 11.2049C10.562 11.0807 12.3374 8.37556 12.3374 6.55813C12.3374 3.30231 9.72113 0.686035 6.46532 0.686035ZM6.46532 9.69766C4.60486 9.69766 3.09323 8.18603 3.09323 6.32557C3.09323 4.4651 4.60486 2.95348 6.46532 2.95348C8.32579 2.95348 9.83741 4.4651 9.83741 6.32557C9.77927 8.24417 8.32579 9.69766 6.46532 9.69766Z"
                  stroke="black"
                  strokeWidth="1.25"
                  strokeMiterlimit="10"
                ></path>
              </svg>
              Tòa FS - GoldSeason số 47 Nguyễn Tuân, P.Thanh Xuân Trung, Q.Thanh
              Xuân, Hà Nội
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M15.4054 19.6889C15.2186 19.6884 15.0324 19.6679 14.8499 19.6278C11.3758 18.9092 8.17522 17.2242 5.61655 14.7667C3.11247 12.3039 1.37577 9.16817 0.616547 5.73895C0.527026 5.31156 0.548998 4.86833 0.68035 4.4519C0.811701 4.03547 1.04801 3.65984 1.36655 3.36117L3.58877 1.22228C3.70227 1.11494 3.83714 1.03274 3.98456 0.981049C4.13198 0.929356 4.28864 0.909331 4.44432 0.922281C4.60575 0.939122 4.76152 0.991122 4.9007 1.07462C5.03987 1.15813 5.15906 1.27111 5.24988 1.40561L8.02766 5.51117C8.13183 5.67047 8.18211 5.859 8.17111 6.04902C8.16011 6.23904 8.0884 6.42051 7.96655 6.56673L6.5721 8.23339C7.12746 9.46253 7.91396 10.5734 8.88877 11.5056C9.85727 12.4716 11.002 13.2429 12.261 13.7778L13.9888 12.4056C14.1339 12.2909 14.3105 12.2231 14.495 12.2112C14.6796 12.1993 14.8635 12.2439 15.0221 12.3389L19.2165 15.0501C19.3605 15.136 19.4831 15.2534 19.5752 15.3935C19.6674 15.5335 19.7266 15.6926 19.7485 15.8588C19.7704 16.025 19.7544 16.194 19.7018 16.3532C19.6491 16.5124 19.5611 16.6575 19.4443 16.7778L17.2777 18.9223C17.0315 19.1672 16.7394 19.361 16.4181 19.4926C16.0968 19.6242 15.7526 19.6909 15.4054 19.6889ZM4.35544 2.02228L2.13321 4.16117C1.95402 4.32814 1.82137 4.53888 1.74832 4.77266C1.67526 5.00644 1.66431 5.25521 1.71655 5.4945C2.4225 8.71236 4.04528 11.6569 6.38877 13.9723C8.79666 16.2843 11.8086 17.8692 15.0777 18.5445C15.3251 18.5962 15.5815 18.5858 15.8239 18.514C16.0663 18.4423 16.2871 18.3115 16.4665 18.1334L18.6332 15.9889L14.5832 13.3723L12.7277 14.8501C12.6566 14.9063 12.5729 14.9443 12.4838 14.9607C12.3947 14.9772 12.303 14.9716 12.2165 14.9445C10.6758 14.3768 9.27958 13.4757 8.12766 12.3056C6.93619 11.193 6.01134 9.82562 5.4221 8.30561C5.39717 8.21359 5.39635 8.11671 5.4197 8.02428C5.44305 7.93184 5.48979 7.84698 5.55544 7.77784L7.05544 5.98339L4.35544 2.02228Z"
                  fill="black"
                ></path>
              </svg>
              Giấy phép đăng ký kinh doanh số: 0107307178
            </li>
            <li>
              <i
                style={{ marginRight: "10px" }}
                className="fa-regular fa-clock"
              ></i>
              Giờ làm việc: 8:00am - 20:00pm
            </li>
          </ul>
        </div>
        <div className="col-8">
          <div>
            <h5>Về CareerBuilder</h5>
            <p>Giới thiệu</p>
            <p>Góc báo chí</p>
            <p>Tuyển dụng</p>
            <p>Liên hệ</p>
            <p>Hỏi đáp</p>
          </div>
          <div>
            <h5>Hồ sơ và CV</h5>
            <p>Quản lý CV của bạn</p>
            <p>CareerBuilder Profile</p>
            <p>Hướng dẫn viết CV</p>
            <p>Thư viện CV theo ngành nghề</p>
          </div>
          <div>
            <h5>Cộng đồng CareerBuilder</h5>
            <div style={{ marginTop: "20px", marginBottom: "30px" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="41"
                height="40"
                viewBox="0 0 41 40"
                fill="none"
              >
                <rect
                  y="0.000488281"
                  width="40.0333"
                  height="39.9917"
                  fill="#F97E6C"
                ></rect>
                <path
                  d="M29.607 16.1986C29.377 15.3406 28.702 14.6636 27.845 14.4326C26.279 14.0026 20.014 13.9956 20.014 13.9956C20.014 13.9956 13.75 13.9886 12.183 14.3996C11.343 14.6286 10.649 15.3206 10.417 16.1776C10.004 17.7436 10 20.9916 10 20.9916C10 20.9916 9.996 24.2556 10.406 25.8056C10.636 26.6626 11.311 27.3396 12.169 27.5706C13.751 28.0006 19.999 28.0076 19.999 28.0076C19.999 28.0076 26.264 28.0146 27.83 27.6046C28.686 27.3746 29.364 26.6986 29.597 25.8416C30.011 24.2766 30.014 21.0296 30.014 21.0296C30.014 21.0296 30.034 17.7646 29.607 16.1986ZM18.01 24.0006L18.015 18.0006L23.222 21.0056L18.01 24.0006Z"
                  fill="white"
                ></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="41"
                height="40"
                viewBox="0 0 41 40"
                fill="none"
              >
                <rect
                  x="0.0751953"
                  width="40.0333"
                  height="39.9917"
                  fill="#F97E6C"
                ></rect>
                <path
                  d="M23.6002 11.2515L21.1667 11.2476C18.4328 11.2476 16.666 13.0583 16.666 15.861V17.9881H14.2193C14.0079 17.9881 13.8367 18.1593 13.8367 18.3705V21.4525C13.8367 21.6637 14.0081 21.8347 14.2193 21.8347H16.666V29.6114C16.666 29.8226 16.8372 29.9937 17.0487 29.9937H20.241C20.4524 29.9937 20.6236 29.8224 20.6236 29.6114V21.8347H23.4844C23.6958 21.8347 23.867 21.6637 23.867 21.4525L23.8682 18.3705C23.8682 18.2691 23.8278 18.172 23.7562 18.1002C23.6845 18.0285 23.5869 17.9881 23.4854 17.9881H20.6236V16.1849C20.6236 15.3183 20.8303 14.8783 21.9605 14.8783L23.5998 14.8777C23.811 14.8777 23.9822 14.7065 23.9822 14.4955V11.6337C23.9822 11.4229 23.8112 11.2518 23.6002 11.2515Z"
                  fill="white"
                ></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="41"
                height="40"
                viewBox="0 0 41 40"
                fill="none"
              >
                <rect
                  x="0.0375977"
                  width="40.0333"
                  height="39.9917"
                  fill="#F97E6C"
                ></rect>
                <path
                  d="M20.053 14.2183C16.8578 14.2183 14.2694 16.8053 14.2694 19.9959C14.2694 23.1877 16.8578 25.7747 20.053 25.7747C23.2456 25.7747 25.8365 23.1877 25.8365 19.9959C25.8365 16.8053 23.2456 14.2183 20.053 14.2183ZM20.053 23.7501C17.9775 23.7501 16.2948 22.0692 16.2948 19.9971C16.2948 17.9238 17.9775 16.2441 20.053 16.2441C22.1284 16.2441 23.8086 17.9238 23.8086 19.9971C23.8086 22.0692 22.1284 23.7501 20.053 23.7501Z"
                  fill="white"
                ></path>
                <path
                  d="M26.0667 15.3531C26.8115 15.3531 27.4153 14.7499 27.4153 14.0058C27.4153 13.2618 26.8115 12.6586 26.0667 12.6586C25.3219 12.6586 24.7181 13.2618 24.7181 14.0058C24.7181 14.7499 25.3219 15.3531 26.0667 15.3531Z"
                  fill="white"
                ></path>
                <path
                  d="M30.7293 12.6361C30.1426 11.1252 28.9479 9.93041 27.4354 9.34678C26.5609 9.01809 25.6364 8.84188 24.7006 8.82188C23.4958 8.76939 23.1143 8.75439 20.0592 8.75439C17.0042 8.75439 16.6126 8.75439 15.4179 8.82188C14.4846 8.84063 13.5601 9.01684 12.6856 9.34678C11.1718 9.93041 9.97709 11.1252 9.39161 12.6361C9.06258 13.5109 8.88619 14.4333 8.86742 15.3681C8.81363 16.5703 8.79736 16.9515 8.79736 20.0046C8.79736 23.0565 8.79736 23.4452 8.86742 24.6412C8.88619 25.576 9.06258 26.4983 9.39161 27.3744C9.97834 28.8841 11.1731 30.0789 12.6868 30.6637C13.5576 31.0037 14.4821 31.1961 15.4204 31.2261C16.6251 31.2786 17.0067 31.2949 20.0617 31.2949C23.1168 31.2949 23.5083 31.2949 24.7031 31.2261C25.6376 31.2074 26.5621 31.0299 27.4379 30.7025C28.9504 30.1164 30.1451 28.9228 30.7318 27.4119C31.0609 26.5371 31.2373 25.6148 31.256 24.6799C31.3098 23.4777 31.3261 23.0965 31.3261 20.0434C31.3261 16.9902 31.3261 16.6028 31.256 15.4068C31.2398 14.4595 31.0646 13.5209 30.7293 12.6361ZM29.2056 24.5487C29.1968 25.2686 29.0667 25.9822 28.8165 26.6583C28.4349 27.6418 27.658 28.4192 26.6747 28.7966C26.0054 29.0453 25.2998 29.1753 24.5855 29.1853C23.397 29.2403 23.0617 29.254 20.0142 29.254C16.9642 29.254 16.6526 29.254 15.4416 29.1853C14.7298 29.1765 14.0217 29.0453 13.3537 28.7966C12.3666 28.4204 11.5847 27.6431 11.2031 26.6583C10.9579 25.9909 10.8253 25.2848 10.814 24.5725C10.7602 23.3852 10.7477 23.0503 10.7477 20.0059C10.7477 16.9602 10.7477 16.6491 10.814 15.4381C10.8228 14.7182 10.9529 14.0058 11.2031 13.3297C11.5847 12.3437 12.3666 11.5676 13.3537 11.1902C14.0217 10.9427 14.7298 10.8115 15.4416 10.8015C16.6314 10.7477 16.9654 10.7327 20.0142 10.7327C23.063 10.7327 23.3757 10.7327 24.5855 10.8015C25.2998 10.8102 26.0054 10.9415 26.6747 11.1902C27.658 11.5688 28.4349 12.3462 28.8165 13.3297C29.0617 13.9971 29.1943 14.7032 29.2056 15.4156C29.2594 16.6041 29.2731 16.9377 29.2731 19.9834C29.2731 23.0278 29.2731 23.3552 29.2193 24.55H29.2056V24.5487Z"
                  fill="white"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: "1%" }}>
        © 2014-2023 TopCV Vietnam JSC. All rights reserved.
      </div>
    </div>
  );
}

export default Footer;
