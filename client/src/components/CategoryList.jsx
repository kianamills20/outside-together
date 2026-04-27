export default function CategoryFilter({
  categories,
  selectedCategoryId,
  onSelectCategory,
}) {
  return (
    <div className="filter-box">
      <label htmlFor="category-filter">Pick an activity</label>
      <select
        id="category-filter"
        value={selectedCategoryId || ""}
        onChange={(e) => {
          const value = e.target.value;

          if (value === "") {
            onSelectCategory(null);
          } else {
            onSelectCategory(Number(value));
          }
        }}
      >
        <option value="">All categories</option>
        {categories?.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}
