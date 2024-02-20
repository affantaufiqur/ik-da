export default function Banner() {
  return (
    <div className="bg-[#E2C6E5] xl:h-[600px]">
      <div className="flex h-full w-full flex-col justify-around space-y-8 p-8 xl:p-12">
        <p className="quote font-dm-display text-2xl font-medium text-primary sm:text-3xl lg:text-5xl xl:text-7xl">
          `A study conducted at the University of Sussex found that reading can reduce stress by up to 68%.`
        </p>
        <button className="inline-flex w-full items-center justify-center gap-x-2 bg-black p-4 font-dm-display text-base font-semibold tracking-wide text-white transition-all duration-100 hover:bg-black/80 xl:w-1/3 xl:p-10 xl:text-2xl">
          START READING NOW
        </button>
      </div>
    </div>
  );
}
