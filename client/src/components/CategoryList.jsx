export default function CategoryFilter({ categories, onSelectCategory }) {
  return (
    <div>
      <button onClick={() => onSelectCategory(null)}>All</button>
      {categories?.map((category) => (
        <button key={category.id} onClick={() => onSelectCategory(category.id)}>
          {category.name}
        </button>
      ))}
    </div>
  );
}
