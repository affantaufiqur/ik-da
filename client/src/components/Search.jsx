export default function Search() {
  return (
    <div className="w-full mt-4 flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
      <input
        type="text"
        className="rounded-none focus:outline-primary placeholder:text-primary/50 py-4 px-2 border-2 w-full text-primary"
        placeholder="Search something to read"
      />
    </div>
  );
}
