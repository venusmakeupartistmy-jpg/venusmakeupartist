import { mkdir, writeFile } from "fs/promises";
import path from "path";

const outputDir = path.join(process.cwd(), "public", "portfolio");

const images = [
  {
    filename: "profile.jpg",
    label: "Venus Makeup Artist",
    url: "https://scontent.cdninstagram.com/v/t51.2885-19/472868964_1118153836465233_3308439826492923795_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_cat=107&ccb=7-5&_nc_sid=f7ccc5&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=HaR-8bKkK98Q7kNvwGC1ex7&_nc_oc=Adrc1mLsa6uaZmLkOzGnxuZp8b08noYZlIWPGkeyijHa02q9opE7Gg3sWi6QJ_yzAcNQc3k6xIs_FynHjV5qN0dZ&_nc_zt=24&_nc_ht=scontent.cdninstagram.com&_nc_ss=7860f&oh=00_Af80YAIqEfxc5KCEs2CNUYHypM_k3gcbXbLsLnCefqbkuA&oe=6A4333E9",
  },
  {
    filename: "ig-1.jpg",
    label: "Bridal glow",
    url: "https://scontent.cdninstagram.com/v/t51.71878-15/561380446_857128086656997_4650502516103066768_n.jpg?stp=c0.5x0.5f_dst-jpg_e35_p150x150_tt6_u&_nc_cat=101&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiU1RPUlkuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=B0UZTJzRj3IQ7kNvwEClYrP&_nc_oc=AdqyhZ0HsG-8CEypVWuWjsKiXxdIVbkgJPvtGiM4SkdsJotkrZ4xjvMh4wt_JfCdHs2-iMcYH1TxUostgaxnxDfE&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=bU4dnRtFmZ7Q3ZCXGws1Lg&_nc_ss=7860f&oh=00_Af9S1cEDmW7MpRAkAd0IrdhS7iwc86Kjy2C_1AQUWSVVPA&oe=6A435C31",
  },
  {
    filename: "ig-2.jpg",
    label: "Soft glam",
    url: "https://scontent.cdninstagram.com/v/t51.71878-15/556110645_1333968688251683_3761337970060206600_n.jpg?stp=c0.5x0.5f_dst-jpg_e35_p150x150_tt6_u&_nc_cat=107&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiU1RPUlkuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=lckLVNhVQeIQ7kNvwGQQppM&_nc_oc=AdoymgZ4RRvrNn0IzP1di7f4vQskVg5o08LTAoAbPF985GWV_cd4-fA6BrPR_XfKRxcs5Lh7ncz__p0qIgFToJDV&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=bU4dnRtFmZ7Q3ZCXGws1Lg&_nc_ss=7860f&oh=00_Af_59puVodSZKFL2idFCUO34jAQUVoHSgd5JycD5yMXaZA&oe=6A4346FB",
  },
  {
    filename: "ig-3.jpg",
    label: "Editorial",
    url: "https://scontent.cdninstagram.com/v/t51.75761-15/501785742_18369297715134030_1051724129717904429_n.jpg?stp=c0.5x0.5f_dst-jpg_e35_p150x150_tt6_u&_nc_cat=105&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiU1RPUlkuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=NMQwJHdkx-4Q7kNvwH2PuDX&_nc_oc=AdriEAaKi_gvTyAZ_WEb3qnjgOiJCZw4DpI6o5bpv4EGaN3tajwqgKb_HLWubx7qavx_EUQn4KM9O3kJaGwC_LTW&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=bU4dnRtFmZ7Q3ZCXGws1Lg&_nc_ss=7860f&oh=00_Af-XMxtpvcQIMzJkWES12sSp5mpGd4U4_74Y5VY7pPxKjA&oe=6A435876",
  },
  {
    filename: "ig-4.jpg",
    label: "Creative paint",
    url: "https://scontent.cdninstagram.com/v/t51.82787-15/573634596_18073645394520790_4769144624025027157_n.jpg?stp=c0.5x0.5f_dst-jpg_e35_p150x150_tt6_u&_nc_cat=104&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiU1RPUlkuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=vsqMSVSwW7EQ7kNvwEmapP7&_nc_oc=Adox0ij5TK1__m1QpvzNsxLSjOFATozm6v9a3rIRsSeWxQfUSFGc4m9BzoFdP_1KFajULYKiJMGvOxpcjpDZYG44&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=bU4dnRtFmZ7Q3ZCXGws1Lg&_nc_ss=7860f&oh=00_Af8D3rS4ZPZbutjD_Ffy3uzizEQqa-xnLJHVPpY_6oYMUQ&oe=6A4336F1",
  },
  {
    filename: "ig-5.jpg",
    label: "Photoshoot",
    url: "https://scontent.cdninstagram.com/v/t51.82787-15/534456456_17891310876318849_6615174106928893332_n.heic?stp=c0.5x0.5f_dst-jpg_e35_p150x150_tt6_u&_nc_cat=104&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiU1RPUlkuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=U9WRfKA8J_cQ7kNvwEbnxWp&_nc_oc=AdpJ8uoQpcUABvpTQADVzV2uxkSM2ZIf3ziptFCgIL0ri3OSC3HWoaXedOXfiksDjFYVul0AU2PO-ctRC5nKpwS_&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=bU4dnRtFmZ7Q3ZCXGws1Lg&_nc_ss=7860f&oh=00_Af-wLGeWOEXtvk4HR-IVt2IH_rOKaViutBt1udMcw9WHcA&oe=6A433273",
  },
  {
    filename: "ig-6.jpg",
    label: "Event look",
    url: "https://scontent.cdninstagram.com/v/t51.75761-15/510972436_18176476099333375_5083955945607586200_n.jpg?stp=c0.5x0.5f_dst-jpg_e35_p150x150_tt6_u&_nc_cat=103&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiU1RPUlkuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=9i3ChyW0_YcQ7kNvwHgjw0H&_nc_oc=AdrqpUkhyw9Raa6791vVuE9tkhZvdxVLAtanXiYdyPVQyWOnYP8LoRvkHdLEx2D4Ri0geDAZLVlb_kkJ0utx9kI_&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=bU4dnRtFmZ7Q3ZCXGws1Lg&_nc_ss=7860f&oh=00_Af_FTc3Ya8_hdWfrwS7_FLUusJV3CVgcS2G0dkCDFAj61Q&oe=6A4325E1",
  },
];

await mkdir(outputDir, { recursive: true });

const saved = [];

for (const image of images) {
  const response = await fetch(image.url, {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  if (!response.ok) {
    console.log("failed", image.filename, response.status);
    continue;
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  await writeFile(path.join(outputDir, image.filename), buffer);
  saved.push({
    filename: image.filename,
    label: image.label,
    src: `/portfolio/${image.filename}`,
  });
  console.log("saved", image.filename, buffer.length);
}

const portfolioModule = `export const portfolioImages = ${JSON.stringify(saved, null, 2)} as const;\n`;
await writeFile(path.join(process.cwd(), "lib", "portfolio.ts"), portfolioModule);
