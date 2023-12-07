function Button(props) {
  const { text, onClick, variant, className, color } = props;
  return (
    <button
      onClick={onClick}
      className={`btn btn-${
        variant || "lg"
      } btn-primary mx-2 my-2 ${className} btn-${color || "primary"}`}
    >
      {text}
    </button>
  );
}

module.exports = {
  Button,
};
