export default function Banner() {
  return (
    <div className="bg-purple-800">
      <div className="container mx-auto w-full flex flex-col space-y-4 py-8">
        <p className="quote text-white">
          A study conducted at the University of Sussex found that reading can reduce stress by up to 68%, making it one
          of the most effective ways to relax.
        </p>
        <button className="py-2 px-6 inline-flex items-center gap-x-2 text-sm font-semibold bg-black text-white w-1/3 justify-center">
          START READING NOW
        </button>
      </div>
    </div>
  );
}
