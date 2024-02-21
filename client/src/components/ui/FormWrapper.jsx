import PropTypes from "prop-types";

export default function FormWrapper({ children }) {
  return <div className="flex flex-col space-y-3">{children}</div>;
}

FormWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
