import { IUser } from "@interfaces/index";
import React from "react";

const UserBox = ({ id, user }: { id: number; user: IUser }): JSX.Element => {
  return (
    <div className="px-16 py-6 shadow-lg border my-6 relative">
      <p className="absolute top-3 left-3 font-semibold text-xl">{id}</p>
      <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
        <img
          src="https://source.unsplash.com/75x75/?portrait"
          alt=""
          className="self-center flex-shrink-0 w-24 h-24 border rounded-full md:justify-self-start dark:bg-gray-500 dark:border-gray-700"
        />
        <div className="flex flex-col justify-center">
          <p className="text-lg font-semibold text-center md:text-left">
            {user.name} ({user.username.toLowerCase()})
          </p>
          <p className="text-sm text-center md:text-left">{user.email}</p>
          <p className="text-sm text-center md:text-left">+{user.phone}</p>
          <p className="text-sm text-center md:text-left">{user.website}</p>
        </div>
      </div>
    </div>
  );
};

export default UserBox;
