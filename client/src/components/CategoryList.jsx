export default function CategoryFilter({ categories }) {
  return (
    <div>
      {categories?.map((category) => (
        <button key={category.id}>{category.name}</button>
      ))}
    </div>
  );
}
