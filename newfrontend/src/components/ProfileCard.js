import React from "react";

const PorfileCard = () => {
  return (
    <div className="m-10 max-w-2xl mx-auto border rounded-lg overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        <div className="order-2 lg:order-1 w-full lg:w-2/3">
          <h1 className="text-xl font-bold text-gray-900 mt-4 lg:mt-0">
            Michael Simbal
          </h1>
          <h3 className="text-semibold text-gray-600">
            Marketing Exec. at Denva Corp
          </h3>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-sm text-gray-500">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Architecto, placeat!
              </p>
            </div>
            <div>
              <ul className="text-sm text-gray-600">
                <li className="flex items-center mb-2">
                  <span className="mr-2">Status:</span>
                  <span className="rounded-full bg-green-200 py-1 px-2 text-xs font-medium text-green-700">
                    Open for side gigs
                  </span>
                </li>
                <li className="flex items-center mb-2">
                  <span className="mr-2">Joined On:</span>
                  <span>Apr 08, 2022</span>
                </li>
                {/* Add more fields as needed */}
                <li className="flex items-center mb-2">
                  <span className="mr-2">Field 1:</span>
                  <span>Value 1</span>
                </li>
                <li className="flex items-center mb-2">
                  <span className="mr-2">Field 2:</span>
                  <span>Value 2</span>
                </li>
                <li className="flex items-center mb-2">
                  <span className="mr-2">Field 3:</span>
                  <span>Value 3</span>
                </li>
                <li className="flex items-center mb-2">
                  <span className="mr-2">Field 4:</span>
                  <span>Value 4</span>
                </li>
                <li className="flex items-center mb-2">
                  <span className="mr-2">Field 5:</span>
                  <span>Value 5</span>
                </li>
                <li className="flex items-center mb-2">
                  <span className="mr-2">Field 6:</span>
                  <span>Value 6</span>
                </li>
                <li className="flex items-center mb-2">
                  <span className="mr-2">Field 7:</span>
                  <span>Value 7</span>
                </li>
                <li className="flex items-center mb-2">
                  <span className="mr-2">Field 8:</span>
                  <span>Value 8</span>
                </li>
                <li className="flex items-center mb-2">
                  <span className="mr-2">Field 9:</span>
                  <span>Value 9</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2 w-full lg:w-1/3">
          <div className="relative h-40 lg:h-full overflow-hidden">
            <span className="absolute right-0 m-3 h-3 w-3 rounded-full bg-green-500 ring-2 ring-green-300 ring-offset-2"></span>
            <img
              className="object-cover w-full h-full rounded-lg"
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PorfileCard;
