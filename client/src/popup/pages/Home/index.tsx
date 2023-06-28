import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import UserBox from "./components/UserBox";
import { getPaginatedUsersEndpoint } from "@api/endpoints/users";
import Loader from "@components/Loader";
import { useProps } from "@contexts/UserContext";
import { IUser } from "@interfaces/index";
import { toast } from "react-hot-toast";
import { removeDuplicateData } from "../../utils/removeDuplicateData";

const Home = (): JSX.Element => {
  /**
   * Get data from the Context API
   */
  const { loading, users, setUsers } = useProps();

  const [page, setPage] = useState<number>(2);
  const [hasMore, setHasMore] = useState<boolean>(true);

  /**
   * Retrieve data from the Cloud Database for onScroll event
   */
  const loadMoreUsers = async () => {
    try {
      const response = await getPaginatedUsersEndpoint(page);

      if (response && response.status) {
        const newData = [...users, ...response.data.data];
        setUsers(removeDuplicateData(newData));

        if (response.data.nextPage) {
          setPage((prevPage) => prevPage + 1);
        } else {
          setHasMore(false);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full min-h-screen text-lg">
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="w-fit mt-6 mx-auto font-semibold text-3xl">
            Display Users
          </h1>
          <div className="px-12 py-6 text-center">
            {users.length > 0 && (
              <InfiniteScroll
                dataLength={users.length}
                next={loadMoreUsers}
                hasMore={hasMore}
                loader={<Loader key={0} text="Loading more users..." />}
              >
                {users.map((user: IUser, index: number) => (
                  <UserBox key={user.id} id={index + 1} user={user} />
                ))}
              </InfiniteScroll>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
