export default function Search() {
  return (
    <input
      type="search"
      className="w-full rounded-none border-2 border-line px-2 py-2 text-primary placeholder:text-sm placeholder:text-primary/50 focus:border-primary focus:outline-none md:py-4 md:placeholder:text-base"
      placeholder="Search something to read"
    />
  );
}
