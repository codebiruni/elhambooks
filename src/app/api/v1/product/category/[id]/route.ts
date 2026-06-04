/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDb from "@/lib/connectdb";
import Product from "@/models/product.model";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose"; // 1. IMPORT MONGOOSE HERE

type ParamsType = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(request: NextRequest, context: ParamsType) {
  const { id } = await context.params;
  console.log("Incoming Category String ID:", id);

  // 2. VALIDATE IF IT'S A VALID OBJECTID FORMAT FIRST
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { status: "error", message: "Invalid Category ID format" },
      { status: 400 }
    );
  }

  try {
    await connectDb();

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "24");
    const skip = (page - 1) * limit;

    // 3. CONVERT THE STRING INTO A GENUINE MONGO OBJECTID
    const searchQuery: any = {
      isDeleted: false,
      category: new mongoose.Types.ObjectId(id)
    };

    // Get total count for pagination info
    const totalCount = await Product.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    // Aggregation pipeline will now match perfectly!
    const products = await Product.aggregate([
      { $match: searchQuery },
      {
        $project: {
          name: 1,
          images: {
            $cond: [
              { $gte: [{ $size: "$images" }, 2] },
              { $slice: ["$images", 2] },
              "$images",
            ],
          },
          generalPrice: 1,
          brand: 1,
          tags: 1,
          specifications: 1,
          averageRating: 1,
          totalReviewCount: 1,
          createdAt: 1,
          randomField: { $rand: {} },
        },
      },
      { $sort: { randomField: 1 } },
      { $skip: skip },
      { $limit: limit },
      { $project: { randomField: 0 } },
    ]);

    return NextResponse.json(
      {
        status: "success",
        products,
        pagination: {
          currentPage: page,
          totalPages,
          totalCount,
          hasNextPage,
          hasPrevPage,
          limit,
        },
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("GET products error:", err);
    return NextResponse.json(
      {
        status: "error",
        message: err.message || "Failed to fetch products",
      },
      { status: 400 }
    );
  }
}