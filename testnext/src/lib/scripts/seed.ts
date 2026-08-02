import { connectDB } from "@/lib/mongoose";
import Product from "@/models/Product";

async function seed() {
  await connectDB();
  await Product.deleteMany({});
  const sample = Array.from({ length: 12 }).map((_, i) => ({
    name: `Product ${i + 1}`,
    category: ["product1", "product2", "product3", "product4"][i % 4],
    image: `https://picsum.photos/seed/prod${i + 1}/800/600`,
    description:
      `This is a detailed description for Product ${i + 1}. ` +
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(10),
  }));
  await Product.insertMany(sample);
  console.log("seeded");
  process.exit(0);
}

seed().catch(console.error);
