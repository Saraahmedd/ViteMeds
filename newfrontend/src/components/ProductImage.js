function ProductImage({ url, style, className }) {
    return (
        <div
            style={{
                backgroundImage: `url("${url}")`,
                backgroundSize: 'contain',
                backgroundPosition: '50%',
                backgroundRepeat: 'no-repeat',
                flexGrow: 1,
                width: '100%',
                ...style
            }}

            className={className}
        >
        </div>
    )
}

module.exports = {
    ProductImage
}