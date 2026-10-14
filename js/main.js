/* =========================================================
   猫宮てと 公式ホームページ　動きの設定
   ・スマホ用メニューの開け閉め
   ・ギャラリー画像の拡大表示
   ※ このファイルは基本的に書き換えなくて大丈夫です
   ========================================================= */

// ---------- スマホ用メニュー ----------
const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");

if (header && menuButton) {
  menuButton.addEventListener("click", () => {
    const isOpen = header.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");
  });
}

// ---------- ギャラリーの拡大表示 ----------
// <a class="gallery-item" href="画像"> の形で置いた画像だけが拡大されます
const galleryLinks = document.querySelectorAll("a.gallery-item");

if (galleryLinks.length > 0) {
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML =
    '<button class="lightbox-close" type="button" aria-label="閉じる">×</button><img src="" alt="">';
  document.body.appendChild(lightbox);

  const lightboxImage = lightbox.querySelector("img");

  const closeLightbox = () => lightbox.classList.remove("is-open");

  galleryLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const thumb = link.querySelector("img");
      lightboxImage.src = link.href;
      lightboxImage.alt = thumb ? thumb.alt : "";
      lightbox.classList.add("is-open");
    });
  });

  lightbox.addEventListener("click", closeLightbox);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });
}
