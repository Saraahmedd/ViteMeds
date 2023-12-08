function ProductImage({ url, style }) {
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
        >
        </div>
    )
}

module.exports = {
    ProductImage
}