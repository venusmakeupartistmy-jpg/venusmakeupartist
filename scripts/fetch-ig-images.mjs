const username = "venusss_makeupartist";
const url = `https://www.instagram.com/${username}/`;

const response = await fetch(url, {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    Accept: "text/html,application/xhtml+xml",
  },
});

const html = await response.text();
const urls = [
  ...html.matchAll(/https:\/\/scontent[^"'\\]+?\.(?:jpg|webp)/g),
].map((match) => match[0].replace(/\\u0026/g, "&").replace(/&amp;/g, "&"));

const unique = [...new Set(urls)].filter(
  (item) => !item.includes("s100x100") && !item.includes("s150x150"),
);

console.log(JSON.stringify(unique.slice(0, 12), null, 2));
