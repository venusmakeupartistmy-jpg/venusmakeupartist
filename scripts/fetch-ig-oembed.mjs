const html = await (
  await fetch("https://www.instagram.com/venusss_makeupartist/", {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
  })
).text();

const shortcodes = [
  ...html.matchAll(/"shortcode":"([A-Za-z0-9_-]+)"/g),
].map((match) => match[1]);

console.log("shortcodes", [...new Set(shortcodes)].slice(0, 12));

for (const shortcode of [...new Set(shortcodes)].slice(0, 6)) {
  const oembedUrl = `https://api.instagram.com/oembed?url=https://www.instagram.com/p/${shortcode}/`;
  const res = await fetch(oembedUrl);
  if (!res.ok) {
    console.log(shortcode, res.status);
    continue;
  }
  const data = await res.json();
  console.log(shortcode, data.thumbnail_url?.slice(0, 120));
}
