/* 首頁動畫封面：滑鼠移到或鍵盤聚焦 memo 紙時，對應物種加上 is-active（預留給日後的選取動作）。 */
(function () {
  "use strict";
  document.querySelectorAll(".home-cover .memo[data-species]").forEach(function (memo) {
    var sp = document.querySelector(".sp--" + memo.getAttribute("data-species"));
    if (!sp) return;
    function on() { sp.classList.add("is-active"); }
    function off() { sp.classList.remove("is-active"); }
    memo.addEventListener("mouseenter", on);
    memo.addEventListener("mouseleave", off);
    memo.addEventListener("focus", on);
    memo.addEventListener("blur", off);
  });
})();
