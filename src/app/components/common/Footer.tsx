import "./footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <p className="site-footer-notice">
        코스 정보는 참고용입니다. 방문 전 해당 공원이나 관리기관의 공식 안내 페이지에서 최신 정보를 확인해 주세요.
      </p>
      <div className="site-footer-contact">
        <span>정보 정정·문의</span>
        <a href="https://github.com/recoma96/trailnote/issues">GitHub Issues</a>
        <a href="mailto:seokbong60@gmail.com">seokbong60@gmail.com</a>
      </div>
      <p>
        developed by <a href="https://github.com/recoma96">rekoma</a>
      </p>
    </footer>
  );
}
