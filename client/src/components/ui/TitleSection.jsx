import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function TitleSection({ title, subtitle, href }) {
  return (
    <section className="flex flex-row items-center justify-between">
      <div className="flex flex-col space-y-1 text-primary">
        <h3 className="font-dm-display text-lg font-medium tracking-wide md:text-2xl">{title}</h3>
        <p className="font-dm-sans text-xs tracking-wide md:text-base">{subtitle}</p>
      </div>
      <Link
        to={href}
        className="whitespace-nowrap font-dm-sans text-base font-medium tracking-wide underline underline-offset-2"
      >
        view all
      </Link>
    </section>
  );
}

TitleSection.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  href: PropTypes.string,
};
