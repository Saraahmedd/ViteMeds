import React from "react";
import { Dna } from "react-loader-spinner";

const Spinner = ({}) => {
  return (
    <Dna
      visible={true}
      height="120"
      width="120"
      ariaLabel="dna-loading"
      wrapperStyle={{
        textAlign: "center",
        width: "100%",
      }}
      wrapperClass="dna-wrapper primary"
    />
  );
};

export default Spinner;
