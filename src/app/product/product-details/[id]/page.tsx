/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDb from "@/lib/connectdb";
import Product from "@/models/product.model";
import ProductDetailsClient from "./MAinProductDetailsPAge";
import { notFound } from "next/navigation";
import mongoose from "mongoose";

// 👇 FORCE NEXT.JS TO REGISTER THESE SCHEMAS BEFORE THE QUERY RUNS
// Adjust these file paths if your category models live in a slightly different folder!
import "@/models/category.model";
import "@/models/sub-category.model";

// Force Next.js to bypass static generation caches so Facebook Ad traffic always gets real-time data
export const dynamic = "force-dynamic";

type ParamsType = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page(context: ParamsType) {
  const { id } = await context.params;

  // 1. Instantly capture clipped/malformed IDs before querying the database
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    console.error(`⚠️ Invalid MongoDB ObjectId format received from route: "${id}"`);
    return notFound();
  }

  let productData = null;

  try {
    // 2. Establish database connection pool on the server
    await connectDb();

    // 3. Query MongoDB directly with Mongoose relations populated
    // (Now Mongoose will safely find the registered schemas)
    const product = await Product.findById(id)
      .populate("category")
      .populate("subCategory")
      .lean();

    if (!product) {
      return notFound();
    }

    // Explicitly stringify and re-parse to clean MongoDB ObjectIds and Dates safely for client handoff
    productData = JSON.parse(JSON.stringify(product));
  } catch (error: any) {
    // Log the exact internal system trace directly to your Vercel logs console
    console.error("Critical server-side e-commerce rendering error:", error.message || error);

    return (
      <div className="container mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Something went wrong loading this product.</h2>
        <p className="text-gray-500 max-w-md mx-auto">
          Please check your network connection or refresh the page to try again.
        </p>
      </div>
    );
  }

  // 4. Render the client wrapper with server data pre-loaded
  return <ProductDetailsClient product={productData} />;
}