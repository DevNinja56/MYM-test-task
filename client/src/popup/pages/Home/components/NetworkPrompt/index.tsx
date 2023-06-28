import React from "react";
import useNetworkStatus from "../../../../hooks/useNetworkStatus";

const NetworkPrompt = () => {
  const isOnline = useNetworkStatus();

  return (
    <div
      className={`${
        isOnline ? "bg-green-700" : "bg-red-700"
      } w-fit h-fit fixed bottom-5 right-5 text-white text-sm font-bold px-4 py-3 flex justify-center items-center gap-3 rounded-lg transition-all`}
      role="alert"
    >
      {isOnline ? (
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          className="w-[24px] h-[24px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="none" d="M0 0h24v24H0V0z"></path>
          <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98A16.88 16.88 0 0012 4z"></path>
        </svg>
      ) : (
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          className="w-[24px] h-[24px]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="none" d="M0 0h24v24H0z"></path>
          <path d="M23.64 7c-.45-.34-4.93-4-11.64-4-1.5 0-2.89.19-4.15.48L18.18 13.8 23.64 7zm-6.6 8.22L3.27 1.44 2 2.72l2.05 2.06C1.91 5.76.59 6.82.36 7l11.63 14.49.01.01.01-.01 3.9-4.86 3.32 3.32 1.27-1.27-3.46-3.46z"></path>
        </svg>
      )}
      <p>{isOnline ? "Internet Connected" : "Internet Disconnected"}</p>
    </div>
  );
};

export default NetworkPrompt;
