/* =========================================================
   猫宮てと 公式ホームページ　動きの設定
   ・スマホ用メニューの開け閉め
   ・GALLERY / MY ART の画像の拡大表示
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

// ---------- 画像の拡大表示 ----------
// GALLERY：<a class="gallery-item" href="画像"> の形で置いた画像
// MY ART ：<a class="art-image" href="画像"> の形で置いた画像（タイトルとコメントも表示）
const zoomLinks = document.querySelectorAll("a.gallery-item, a.art-image");

if (zoomLinks.length > 0) {
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML =
    '<button class="lightbox-close" type="button" aria-label="閉じる">×</button>' +
    '<figure class="lightbox-figure"><img src="" alt=""><figcaption class="lightbox-caption"></figcaption></figure>';
  document.body.appendChild(lightbox);

  const lightboxImage = lightbox.querySelector("img");
  const lightboxCaption = lightbox.querySelector(".lightbox-caption");

  const closeLightbox = () => lightbox.classList.remove("is-open");

  zoomLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const thumb = link.querySelector("img");
      lightboxImage.src = link.href;
      lightboxImage.alt = thumb ? thumb.alt : "";

      // MY ART の作品なら、タイトルとコメントを画像の下に表示する
      lightboxCaption.textContent = "";
      const card = link.closest(".art-card");
      if (card) {
        const title = card.querySelector(".art-title");
        const comment = card.querySelector(".art-comment");
        if (title) {
          const strong = document.createElement("strong");
          strong.textContent = title.textContent;
          lightboxCaption.appendChild(strong);
        }
        if (comment) {
          const span = document.createElement("span");
          span.textContent = comment.textContent;
          lightboxCaption.appendChild(span);
        }
      }
      lightboxCaption.hidden = !card;

      lightbox.classList.add("is-open");
    });
  });

  lightbox.addEventListener("click", closeLightbox);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });
}
