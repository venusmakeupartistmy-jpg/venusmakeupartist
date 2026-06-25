const html = await (
  await fetch("https://www.instagram.com/venusss_makeupartist/embed/", {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
  })
).text();

const urls = [
  ...html.matchAll(/https:\/\/scontent[^"'\\]+?\.(?:jpg|webp)/g),
].map((m) => m[0].replace(/\\u0026/g, "&").replace(/&amp;/g, "&"));

console.log(JSON.stringify([...new Set(urls)].slice(0, 15), null, 2));

const shortcodes = [
  ...html.matchAll(/instagram\.com\/p\/([A-Za-z0-9_-]+)/g),
].map((m) => m[1]);

console.log("shortcodes", [...new Set(shortcodes)].slice(0, 12));
