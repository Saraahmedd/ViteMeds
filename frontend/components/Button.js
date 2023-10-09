function Button (props) {
    const { text, onClick, variant, className } = props;
    return (
        <button
            onClick={onClick}
            className={`btn btn-${variant || 'lg'} btn-primary mx-2 my-2 ${className}`}
        >
            {text}
        </button>
    );
};

module.exports = {
    Button
}