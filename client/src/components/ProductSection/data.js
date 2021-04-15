import uniqid from "uniqid";

let products = [];
const name = [
  "tent",
  "fire",
  "swimming",
  "lighter",
  "rim",
  "guitar",
  "spoon",
  "fork",
  "music",
  "food",
];

for (let i = 0; i < 10; i++) {
  products.push({
    id: uniqid(),
    img: "https://source.unsplash.com/random",
    name: name[i],
    content: "content",
    like: 45,
    dislike: 10,
    tag: i > 7 ? "land" : "beach",
  });
}

export default products;
