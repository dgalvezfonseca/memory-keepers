import process from "node:process";

import { eq, inArray, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { createPool } from "mysql2/promise";

import {
  CATALOG_CATEGORY_SEEDS,
  CATALOG_PRODUCT_SEEDS,
  CATALOG_VARIANT_SEEDS,
} from "../src/db/catalog-seed-data";
import { categories, products, productVariants } from "../src/db/schema";

const databaseUrl = process.env["DATABASE_URL"]?.trim();
if (!databaseUrl) throw new Error("DATABASE_URL is required to seed the catalog.");

const pool = createPool({ uri: databaseUrl, connectionLimit: 2 });
const db = drizzle(pool);

try {
  for (const category of CATALOG_CATEGORY_SEEDS) {
    await db
      .insert(categories)
      .values({ ...category, isActive: true })
      .onDuplicateKeyUpdate({
        set: {
          name: category.name,
          description: category.description,
          sortOrder: category.sortOrder,
          isActive: true,
          updatedAt: sql`CURRENT_TIMESTAMP(3)`,
        },
      });
  }

  for (const product of CATALOG_PRODUCT_SEEDS) {
    const [category] = await db
      .select({ id: categories.id })
      .from(categories)
      .where(eq(categories.slug, product.categorySlug))
      .limit(1);
    if (!category) throw new Error(`Category ${product.categorySlug} was not found after upsert.`);

    await db
      .insert(products)
      .values({
        categoryId: category.id,
        slug: product.slug,
        name: product.name,
        shortDescription: product.shortDescription,
        description: product.description,
        basePrice: product.basePriceCents,
        currency: "MXN",
        isActive: true,
      })
      .onDuplicateKeyUpdate({
        set: {
          categoryId: category.id,
          name: product.name,
          shortDescription: product.shortDescription,
          description: product.description,
          basePrice: product.basePriceCents,
          currency: "MXN",
          isActive: true,
          updatedAt: sql`CURRENT_TIMESTAMP(3)`,
        },
      });
  }

  for (const variant of CATALOG_VARIANT_SEEDS) {
    const [product] = await db
      .select({ id: products.id })
      .from(products)
      .where(eq(products.slug, variant.productSlug))
      .limit(1);
    if (!product) throw new Error(`Product ${variant.productSlug} was not found after upsert.`);

    await db
      .insert(productVariants)
      .values({
        productId: product.id,
        code: variant.code,
        name: variant.name,
        price: variant.priceCents,
        metadata: variant.metadata,
        isActive: true,
        sortOrder: variant.sortOrder,
      })
      .onDuplicateKeyUpdate({
        set: {
          productId: product.id,
          name: variant.name,
          price: variant.priceCents,
          metadata: variant.metadata,
          isActive: true,
          sortOrder: variant.sortOrder,
          updatedAt: sql`CURRENT_TIMESTAMP(3)`,
        },
      });
  }

  const [seededCategories, seededProducts, seededVariants] = await Promise.all([
    db
      .select({ slug: categories.slug })
      .from(categories)
      .where(
        inArray(
          categories.slug,
          CATALOG_CATEGORY_SEEDS.map((category) => category.slug),
        ),
      ),
    db
      .select({ slug: products.slug })
      .from(products)
      .where(
        inArray(
          products.slug,
          CATALOG_PRODUCT_SEEDS.map((product) => product.slug),
        ),
      ),
    db
      .select({ code: productVariants.code, price: productVariants.price })
      .from(productVariants)
      .where(
        inArray(
          productVariants.code,
          CATALOG_VARIANT_SEEDS.map((variant) => variant.code),
        ),
      ),
  ]);

  const storedPrices = new Map(seededVariants.map((variant) => [variant.code, variant.price]));
  const pricesMatch = CATALOG_VARIANT_SEEDS.every(
    (variant) => storedPrices.get(variant.code) === variant.priceCents,
  );
  if (
    seededCategories.length !== CATALOG_CATEGORY_SEEDS.length ||
    seededProducts.length !== CATALOG_PRODUCT_SEEDS.length ||
    seededVariants.length !== CATALOG_VARIANT_SEEDS.length ||
    !pricesMatch
  ) {
    throw new Error("Catalog verification failed after synchronization.");
  }

  console.info("[catalog-seed] catalog synchronized", {
    categories: seededCategories.length,
    products: seededProducts.length,
    variants: seededVariants.length,
    prices: "verified in cents",
  });
} finally {
  await pool.end();
}
