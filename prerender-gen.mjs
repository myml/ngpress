import fs from "fs/promises";
import fm from "front-matter";

async function walk(dir, callback) {
  for await (const d of await fs.opendir(dir)) {
    const path = dir + "/" + d.name;
    if (d.isDirectory()) {
      await walk(path, callback);
    } else if (d.name.endsWith(".md")) {
      const data = await fs.readFile(path, "utf8");
      const result = fm(data.toString());
      callback(path, {
        ...result.attributes,
        content: data.split("\n\n").slice(0, 6).join("\n\n"),
      });
    }
  }
}

const postsDir = "src/assets/posts";
const posts = [];
// export interface MarkdownAttr {
//   title: string;
//   date: string;
//   draft: boolean;
//   tags: string[];
//   categories: string[];
// }
await walk(postsDir, (path, attr) => {
  posts.push({ path: path.slice(postsDir.length), ...attr });
});
posts.sort((a, b) => b.date - a.date);

const routes = posts.map(
  (file) => file.path.slice(0, -3) //remove prefix and suffix
);

await fs.writeFile("routers", routes.join("\n"), "utf8");
await fs.writeFile("src/assets/posts.json", JSON.stringify(posts), "utf8");
