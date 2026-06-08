/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDb from "@/lib/connectdb";
import Product from "@/models/product.model";
import ProductDetailsClient from "./MAinProductDetailsPAge";
import { notFound } from "next/navigation";

// Force Next.js to bypass static generation caches so Facebook Ad traffic always gets real-time data
export const dynamic = "force-dynamic";

type ParamsType = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page(context: ParamsType) {
  const { id } = await context.params;
  let productData = null;

  try {
    // 1. Establish database connection pool on the server
    await connectDb();

    // 2. Query MongoDB directly with Mongoose relations populated
    const product = await Product.findById(id)
      .populate("category")
      .populate("subCategory")
      .lean(); // Converts Mongoose documents to raw JSON objects instantly

    if (!product) {
      return notFound(); // Immediately handles missing entries using Next's 404 handler
    }

    // Explicitly stringify and re-parse to clean MongoDB ObjectIds and Dates safely for client handoff
    productData = JSON.parse(JSON.stringify(product));
  } catch (error) {
    console.error("Server-side e-commerce rendering error:", error);
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-500 font-semibold">
        Something went wrong loading this product. Please try again.
      </div>
    );
  }

  // 3. Render the client wrapper with server data pre-loaded
  return <ProductDetailsClient product={productData} />;
}