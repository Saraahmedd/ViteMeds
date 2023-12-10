"use client";
const { Card, Badge } = require("@tremor/react");
const { default: Image } = require("next/image");
const { useState, useEffect } = require("react");

function ProductCard({
  id,
  name,
  image,
  price,
  initialQuantity,
  cartHandler,
  stock,
}) {
  const [zoomStyle, setZoomStyle] = useState({
    transform: "scale(1)",
  });
  // console.log(stock);

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    setZoomStyle({
      transform: `scale(3)`,
      transition: "transform 0.1s ease-in-out",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transform: "scale(1)",
      transition: "transform 0.1s ease-in-out",
    });
  };

  const [quantity, setQuantity] = useState(initialQuantity);
  const [btnClicked, setBtnClicked] = useState(false);
  useEffect(() => {
    if (btnClicked == false) setQuantity(initialQuantity);
  }, [initialQuantity]);

  return (
    <div
      role="button"
      onClick={() => {
        window.history.pushState("", {}, `/patient/products/${id}`);
        window.location.reload();
      }}
      className=""
    >
      <Card
        className={`h-[12rem]`}
        style={{
          backgroundColor: "rgb(31,41,55)",
          overflow: "hidden",
        }}
      >
        <div
          className="w-100 h-[9rem] my-auto"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "contain",
            backgroundPosition: "50%",
            backgroundRepeat: "no-repeat",
            backgroundClip: "content-box",
            ...zoomStyle,
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        ></div>
      </Card>
      <div className="flex flex-row mt-3">
        <p className="font-bold colorColor text-xl">{name}</p>
        <div className="grow flex-1" />
        {/* <div className="bgColor w-7 h-7 text-center flex items-center justify-center rounded-[0.875rem] mx-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#D21312" className="w-[0.95rem] h-[0.95rem]">
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                </div> */}
        { JSON.parse(localStorage.getItem("userInfo"))?.data.user.role === "patient" &&
          <div
            role="button"
            onClick={(e) => {
              e.stopPropagation();
              if (stock <= 0) return;
              if (quantity === 0) {
                setBtnClicked(true);
                setQuantity(1);
                cartHandler(e, id, 1);
              }
            }}
            className={`cartbtn w-auto h-7 text-center flex items-center justify-center rounded-[0.875rem] mx-1 px-2 ${quantity > 0 && stock > 0 ? "bg-green-600" : "bgColor"
              }`}
          >
            {stock <= 0 && (
              <Badge className="tw-dark" color="rose">
                Out of Stock
              </Badge>
            )}

            {quantity > 0 && stock > 0 && (
              <svg
                role="button"
                onClick={(e) => {
                  setBtnClicked(true);
                  setQuantity((q) => q - 1);
                  cartHandler(e, id, quantity - 1);
                }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-[0.85rem] h-[0.85rem]"
              >
                <path
                  fillRule="evenodd"
                  d="M3.75 12a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {stock > 0 && (
              <>
                <span
                  className={`mx-2 text-sm ${quantity > 0 ? "text-white" : "text-black"
                    }`}
                >
                  {quantity > 0 ? quantity : "Cart"}
                </span>

                <svg
                  role="button"
                  onClick={(e) => {
                    setBtnClicked(true);
                    setQuantity((q) => q + 1);
                    cartHandler(e, id, quantity + 1);
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={quantity > 0 ? "white" : `rgba(23, 34, 48, 1)`}
                  className="w-[0.85rem] h-[0.85rem]"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                    clipRule="evenodd"
                  />
                </svg>
              </>
            )}
          </div>
        }
      </div>
      <div className="flex flex-row items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#fff"
          className="h-4 w-4"
        >
          <path
            fillRule="evenodd"
            d="M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 005.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 00-2.122-.879H5.25zM6.375 7.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z"
            clipRule="evenodd"
          />
        </svg>
        <span className="ml-2 colorColor text-md font-bold">{price} USD</span>
      </div>
    </div>
  );
}

module.exports = {
  ProductCard,
};
