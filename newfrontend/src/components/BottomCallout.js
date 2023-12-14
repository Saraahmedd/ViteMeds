const { Callout } = require("@tremor/react");
const { useEffect } = require("react");

function BottomCallout({ message, visible, setVisible, variant = "error" }) {
  useEffect(() => {
    if (visible) {
      setTimeout(() => setVisible(false), 5000);
    }
  }, [visible]);
  return (
    <Callout
      className={`
            mt-4
            w-full
            lg:w-[550px]
           
            ${
              variant === "error"
                ? "bg-red-500 border-red-700 text-white"
                : "bg-green-500 border-green-700 text-white"
            }
            fixed
            right-0
            bottom-[20px]
            mr-0
            lg:mr-${visible ? "[20px]" : "0"}
            calloutOpacity
            `}
      title={variant === "error" ? "Error" : "Success"}
      id="errmsg"
      style={{
        transform: visible ? "none" : "translateX(100%)",
        marginRight: visible ? "20px" : "0px",
        zIndex: 99,
      }}
      icon={() => (
        <>
          {variant === "error" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>
          )}
          {variant !== "error" && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </>
      )}
      color="rose"
    >
      {message}
    </Callout>
  );
}

module.exports = {
  BottomCallout,
};
