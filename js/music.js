document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("bgMusic");
  const btn = document.getElementById("musicBtn");
  if (!music || !btn) return;

  /* ===== LẤY TRẠNG THÁI ===== */
  let isPlaying = localStorage.getItem("music") === "on";
  let savedTime = parseFloat(sessionStorage.getItem("musicTime")) || 0;

  /* ===== KHI LOAD TRANG ===== */
  music.currentTime = savedTime;

  if (isPlaying) {
    music.play().catch(() => {});
    btn.textContent = "🔇 Tắt nhạc";
  } else {
    btn.textContent = "🎵 Bật nhạc";
  }

  /* ===== CLICK NÚT ===== */
  btn.addEventListener("click", () => {
    if (!isPlaying) {
      music.play();
      btn.textContent = "🔇 Tắt nhạc";
      localStorage.setItem("music", "on");
    } else {
      music.pause();
      btn.textContent = "🎵 Bật nhạc";
      localStorage.setItem("music", "off");
    }
    isPlaying = !isPlaying;
  });

  /* ===== LƯU THỜI GIAN PHÁT LIÊN TỤC ===== */
  setInterval(() => {
    if (!music.paused) {
      sessionStorage.setItem("musicTime", music.currentTime);
    }
  }, 500);

  /* ===== TRÁNH BỊ CHẶN AUTOPLAY ===== */
  document.addEventListener("click", function autoPlayOnce() {
    if (localStorage.getItem("music") === "on") {
      music.play().catch(() => {});
    }
    document.removeEventListener("click", autoPlayOnce);
  });
});
