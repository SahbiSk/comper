import uniqid from "uniqid";

let products = [];

for (let i = 0; i < 10; i++) {
  products.push({
    id: uniqid(),
    img: "https://source.unsplash.com/random",
    name: "card",
    content: "content",
    like: 45,
    dislike: 10,
  });
}

export default products;
