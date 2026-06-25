const html = await (
  await fetch("https://www.instagram.com/venusss_makeupartist/", {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
  })
).text();

const markers = [
  "edge_owner_to_timeline_media",
  "ProfilePage",
  "xdt_api__v1__feed",
  "shortcode",
];
console.log("markers", markers.filter((m) => html.includes(m)));

const hd = html.match(/profile_pic_url_hd\\":\\"([^\\"]+)/);
console.log("hd", hd?.[1]?.slice(0, 120));

const shortcodes = [
  ...html.matchAll(/shortcode\\":\\"([A-Za-z0-9_-]+)/g),
].map((m) => m[1]);
console.log("shortcodes", [...new Set(shortcodes)].slice(0, 12));

const images = [
  ...html.matchAll(/https:\\\/\\\/scontent[^\\"]+/g),
].map((m) => m[0].replace(/\\\/\//g, "//"));
console.log("images", [...new Set(images)].slice(0, 12));
