import CategoryPage from "@/components/CategoryPage";
import { knivesConfig } from "@/data/categories/knives";

export default function Home() {
  return <CategoryPage config={knivesConfig} />;
}
