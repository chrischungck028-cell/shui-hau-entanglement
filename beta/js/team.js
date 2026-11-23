/* 項目團隊頁：依 data/team.js 生成各組與成員。只用 textContent，不插入 HTML。 */
(function () {
  "use strict";

  var GROUPS = window.TEAM || [];
  var root = document.getElementById("teamGroups");

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  GROUPS.forEach(function (g) {
    var sec = el("section", "team-group");
    sec.appendChild(el("h2", "team-group-title", g.group));
    var list = el("ul", "team-list");
    (g.members || []).forEach(function (m) {
      var li = el("li", "team-member");
      var image = el("img", "team-image");
      image.src = "assets/team/" + m.image;
      image.alt = "";
      li.appendChild(image);
      /* 英文欄位（name_en、title_en 等）留作日後英文版，中文版暫不顯示 */
      li.appendChild(el("h3", "team-name", m.name));
      if (m.title) li.appendChild(el("p", "team-title", m.title));
      var biography = m.bio;
      if (m.same_as) {
        var group = GROUPS.find(function (entry) { return entry.group === m.same_as; });
        var profile = group && group.members.find(function (member) { return member.name === m.name; });
        if (profile) biography = profile.bio;
      }
      if (biography) li.appendChild(el("p", "team-bio", biography));
      list.appendChild(li);
    });
    sec.appendChild(list);
    root.appendChild(sec);
  });
})();
