export { SHOP_BASE, type SortType, type SortOption, type CategoryConfig, type CategoryProduct } from "../types";
export { knivesConfig } from "./knives";
export { casseroleConfig } from "./casserole";

// Backward-compatible knives exports (default category)
export {
  type KnifeCategoryId,
  type SeriesId,
  type Series,
  type KnifeCategory,
  type ComparisonColumn,
  type Product,
  SERIES,
  SORT_OPTIONS,
  KNIFE_CATEGORIES,
  COMPARISON_COLUMNS,
  RECOMMEND_GGCDS,
  PRODUCTS,
  CATEGORY,
  getRecommendProducts,
  getProductByGgcd,
} from "./knives";
