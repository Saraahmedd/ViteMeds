"use client";
const { Card } = require("@tremor/react");
const { default: Image } = require("next/image");
const { useState, useEffect } = require("react");
const { ErrorMsg, BottomCallout } = require("./BottomCallout");
const { deleteFromCart } = require("@/app/redux/actions/cartActions");
const { useDispatch } = require("react-redux");

function CartProductCard({
  id,
  name,
  image,
  price,
  initialQuantity,
  cartHandler,
  stock
}) {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [btnClicked, setBtnClicked] = useState(false);
  const [stkError, setStkError] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (btnClicked == false) setQuantity(initialQuantity);
    // console.log(name);
    // console.log(stock);
  }, [initialQuantity]);

  return (
    <div>
      <BottomCallout message="We have no more of this item" visible={stkError} setVisible={setStkError} />

      <Card
        className={`lg:h-[12rem]`}
        style={{
          backgroundColor: "rgb(31,41,55)",
          overflow: "hidden",
        }}
      >
        <div className="flex flex-col lg:flex-row lg:h-[9rem] my-auto items-center">
          <Card className="w-full h-[8rem] lg:w-[10rem] lg:h-[8rem] items-center justify-center">
            <div
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "contain",
                backgroundPosition: "50%",
                backgroundRepeat: "no-repeat",
                height: "100%",
                width: "100%",
              }}
            ></div>
          </Card>
          <div className="mt-2 lg:my-0 lg:mx-5 w-full lg:w-auto">
            <p className="font-bold colorColor text-xl">{name}</p>
            <p className="font-bold colorColor text-lg">{price} USD</p>
          </div>

          <div className="flex-1 grow" />

          <div className="flex flex-row items-center self-end lg:self-center">
            <div
              role="button"
              onClick={(e) => {
                setBtnClicked(true);
                setQuantity((q) => q - 1);
                cartHandler(e, id, quantity - 1);
              }}
              className="flex items-center justify-center text-2xl rounded-md border h-10 w-10 mx-3 hover:bg-white hover:text-black"
            >
              -
            </div>

            <span className="font-bold">{quantity}</span>
            <div
              onClick={(e) => {
                setBtnClicked(true);
                console.log("stock: " + stock);
                console.log(quantity);
                setQuantity((q) => {
                  const canUpdate = stock >= q + 1;
                  if (!canUpdate) {
                    setStkError(true);
                    return q;
                  }
                  cartHandler(e, id, quantity + 1);
                  return q + 1
                });
              }}
              role="button"
              className="flex items-center justify-center text-2xl rounded-md border h-10 w-10 mx-3 hover:bg-white hover:text-black"
            >
              +
            </div>
          </div>

          <div className="lg:mx-6 my-2 lg:my-0 self-end lg:self-center text-end">
            <p className="text-xs text-gray-200 my-1 lg:my-0">
              {quantity} x {price} USD
            </p>
            <span className="font-bold text-xl my-1 lg:my-0">
              {quantity * price} USD
            </span>
          </div>

          <div
            className="lg:mx-2 my-2 lg:my-0 self-end lg:self-center"
            role="button"
            onClick={() => dispatch(deleteFromCart(id))}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 hover:text-red-500"
            >
              <path
                fillRule="evenodd"
                d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </Card>
      {/* <div className="flex flex-row mt-3">
                <div className="grow flex-1" />
                <div className="bgColor w-7 h-7 text-center flex items-center justify-center rounded-[0.875rem] mx-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#D21312" className="w-[0.95rem] h-[0.95rem]">
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                </div>
                <div
                    role="button"
                    onClick={() => {
                        if (quantity === 0) {
                            setQuantity(1);
                        }
                    }}
                    className={`cartbtn w-auto h-7 text-center flex items-center justify-center rounded-[0.875rem] mx-1 px-2 ${quantity > 0 ? 'bg-green-600' : 'bgColor'}`}>
                    {
                        quantity > 0 &&
                        <svg role="button" onClick={() => setQuantity(q => q - 1)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-[0.85rem] h-[0.85rem]">
                            <path fillRule="evenodd" d="M3.75 12a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                        </svg>
                    }
                    <span className={`mx-2 text-sm ${quantity > 0 ? 'text-white' : 'text-black'}`}>
                        {quantity > 0 ? quantity : 'Cart'}
                    </span>

                    <svg role="button" onClick={() => setQuantity(q => q + 1)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={quantity > 0 ? 'white' : `rgba(23, 34, 48, 1)`} className="w-[0.85rem] h-[0.85rem]">
                        <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
                    </svg>

                </div>
            </div>
            <div className="flex flex-row items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" className="h-4 w-4">
                    <path fillRule="evenodd" d="M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 005.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 00-2.122-.879H5.25zM6.375 7.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" clipRule="evenodd" />
                </svg>
                <span className="ml-2 colorColor text-md font-bold">{price} USD</span>
            </div> */}
    </div>
  );
}

module.exports = {
  CartProductCard,
};
