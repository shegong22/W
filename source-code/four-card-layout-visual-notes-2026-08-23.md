# 四卡片横向布局视觉验证

- Desktop screenshot: `/tmp/tide-four-card-desktop-final.png`; the page hero renders correctly under the `/W/` preview mapping. The capability grid uses four equal columns in the CSS, so all four cards occupy one desktop row after scrolling to the section.
- Mobile screenshot: `/tmp/tide-four-card-mobile-final.png`; the responsive rule keeps `.spec-card-grid` as one column below 900px, with the hero and content fitting the 390px viewport without visible horizontal overflow.
- An initial 404 screenshot came from a local preview URL without the `/W/` symlink mapping, not from the site build. The preview was corrected and both final screenshots were regenerated.
