const dummy = ["Action", "Fantasy", "Horror", "Sci-Fi", "Thriller"];
export default function Category() {
  return (
    <div className="flex space-x-4 overflow-x-hidden font-dm-sans text-primary md:overflow-hidden">
      {dummy.map((item) => (
        <button
          type="button"
          className="inline-flex items-center gap-x-2 text-nowrap border-2 border-line px-6 py-2 text-sm font-medium transition-all duration-100 hover:bg-black hover:text-white md:text-base"
          key={item}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
