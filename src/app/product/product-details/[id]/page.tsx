/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDb from "@/lib/connectdb";
import Product from "@/models/product.model";
import ProductDetailsClient from "./MAinProductDetailsPAge";
import { notFound } from "next/navigation";
import mongoose from "mongoose";

import "@/models/category.model";
import "@/models/sub-category.model";

// Pages are generated once, then served from cache instantly forever —
// until you explicitly invalidate them via revalidatePath() on product update.
export const revalidate = false;

type ParamsType = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page(context: ParamsType) {
  const { id } = await context.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    console.error(`⚠️ Invalid MongoDB ObjectId format received from route: "${id}"`);
    return notFound();
  }

  let productData = null;

  try {
    await connectDb();

    const product = await Product.findById(id)
      .populate("category")
      .populate("subCategory")
      .lean();

    if (!product) {
      return notFound();
    }

    productData = JSON.parse(JSON.stringify(product));
  } catch (error: any) {
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

  return <ProductDetailsClient product={productData} />;
}