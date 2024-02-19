const dummy = ["Action", "Fantasy", "Horror", "Sci-Fi"];
export default function Category() {
  return (
    <div className="flex space-x-4 font-dm-sans text-primary">
      {dummy.map((item) => (
        <button
          type="button"
          className="border-[#EAEAEA] font-medium hover:bg-black hover:text-white py-2 transition-all duration-100 px-6 inline-flex items-center gap-x-2 text-sm border-2"
          key={item}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
