import { getCategories } from "../api";
import CategoryFilter from "../components/CategoryList";
import { useEffect, useState } from "react";

export default function PublicPage() {
  const [categories, setCategories] = useState([]);

   async function loadCategories() {
      const data = await getCategories();
      setCategories(data);
    }

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <>
      <h1>Landing Page</h1>
      <div>
        <CategoryFilter categories={categories} />
      </div>
    </>
  );
}
