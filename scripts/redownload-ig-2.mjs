import { writeFile } from "fs/promises";
import path from "path";

const outputPath = path.join(process.cwd(), "public", "portfolio", "ig-2.jpg");

const sources = [
  "https://www.instagram.com/p/DDkEvd8zfjM/media/?size=l",
  "https://scontent.cdninstagram.com/v/t51.71878-15/556110645_1333968688251683_3761337970060206600_n.jpg?se=8&stp=dst-jpg_e35&_nc_cat=107&ccb=7-5&_nc_sid=18de74&_nc_ohc=lckLVNhVQeIQ7kNvwGQQppM&_nc_oc=AdoymgZ4RRvrNn0IzP1di7f4vQskVg5o08LTAoAbPF985GWV_cd4-fA6BrPR_XfKRxcs5Lh7ncz__p0qIgFToJDV&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&oh=00_Af_59puVodSZKFL2idFCUO34jAQUVoHSgd5JycD5yMXaZA&oe=6A4346FB",
];

async function tryDownload(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Referer: "https://www.instagram.com/",
    },
    redirect: "follow",
  });
  if (!response.ok) return null;
  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.length < 8000) return null;
  return buffer;
}

let buffer = null;
let source = "";

for (const url of sources) {
  buffer = await tryDownload(url);
  if (buffer) {
    source = url;
    break;
  }
}

if (!buffer) {
  throw new Error("Could not download clean ig-2 image");
}

await writeFile(outputPath, buffer);
console.log(`Saved ig-2.jpg from ${source.slice(0, 60)}... (${Math.round(buffer.length / 1024)} KB)`);
