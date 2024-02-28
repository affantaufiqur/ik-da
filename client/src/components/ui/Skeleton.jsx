import { Typography } from "@material-tailwind/react";
import PropTypes from "prop-types";

export default function Skeleton({ length = 4 }) {
  const fill = Array.from({ length }, (_, index) => index);
  return (
    <main className="mx-4 md:mx-12">
      <div className="max-w-full animate-pulse">
        <section className="grid grid-cols-3 gap-12 sm:grid-cols-6 lg:grid-cols-12">
          {fill.map((item) => (
            <div key={item} className="col-span-3 flex max-h-[1200px] min-h-[400px] flex-col space-y-2">
              <div className="h-full rounded-none bg-gray-300" />
              <Typography as="div" variant="h1" className="mb-4 h-3 w-56 rounded-none bg-gray-300">
                &nbsp;
              </Typography>
              <div className="flex flex-row space-x-2">
                <Typography as="div" variant="paragraph" className="mb-2 h-2 w-72 rounded-none bg-gray-300">
                  &nbsp;
                </Typography>
                <Typography as="div" variant="paragraph" className="mb-2 h-2 w-72 rounded-none bg-gray-300">
                  &nbsp;
                </Typography>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}

Skeleton.propTypes = {
  length: PropTypes.number,
};
