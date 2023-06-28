import React from "react";
import { Oval } from "react-loader-spinner";

const Loader = ({ text = "Loading..." }: { text?: string }) => {
  return (
    <div className="w-full h-[100vh] z-[99999] overflow-hidden bg-white flex flex-col justify-center items-center bg-loader fixed top-0">
      <Oval
        height={80}
        width={80}
        color="#000"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#666"
        strokeWidth={3}
        strokeWidthSecondary={3}
      />
      <p className="my-3 font-normal text-lg">{text}</p>
    </div>
  );
};

export default Loader;
