import React, { useEffect, useState } from "react";
import { createCtx } from "@contexts/Context";
import { IUser } from "@interfaces/index";
import { getUsersDataFromExternalAPIEndpoint } from "@api/endpoints/external-api";
import {
  createUserEndpoint,
  getPaginatedUsersEndpoint,
  isUsersExistInDBEndpoint,
} from "@api/endpoints/users";
import { toast } from "react-hot-toast";
import { openDB } from "idb";
import { INDEXED_DB_NAME, OBJECT_STORE_INDEXED_DB } from "@constants/index";

type PropsContextType = {
  loading: boolean;
  users: IUser[];
  loadingText: string;
  insertionStart: boolean;
  insertionProgress: number;
  setLoading: any;
  setUsers: any;
  setLoadingText: any;
};

export const [useProps, CtxProvider] = createCtx<PropsContextType>();

export const PropsProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<IUser[]>([]);
  const [loadingText, setLoadingText] = useState<string>("Loading...");
  const [insertionProgress, setInsertionProgress] = useState<number>(0);
  const [insertionStart, setInsertionStart] = useState<boolean>(false);

  /**
   * Create connection to the IndexedDB
   */
  const dbPromise = openDB(INDEXED_DB_NAME, 1, {
    upgrade(db) {
      db.createObjectStore(OBJECT_STORE_INDEXED_DB);
    },
  });

  /**
   * Insert data to the IndexedDB
   */
  const insertDataToIndexedDB = async (key: string, value: any) => {
    try {
      const db = await dbPromise;
      const tx = db.transaction(OBJECT_STORE_INDEXED_DB, "readwrite");
      const store = tx.objectStore(OBJECT_STORE_INDEXED_DB);
      await store.put(value, key);
      return tx.done;
    } catch (error) {
      toast.error(error.message);
    }
  };

  /**
   * Retrieve data to the IndexedDB
   */
  const retrieveDataFromIndexedDB = async (key: string) => {
    try {
      const db = await dbPromise;
      const value = await db.get(OBJECT_STORE_INDEXED_DB, key);
      return value;
    } catch (error) {
      toast.error(error.message);
    }
  };

  /**
   * Retrieve data from the External API
   */
  const getExternalAPIUsers = async () => {
    try {
      const response: IUser[] = await getUsersDataFromExternalAPIEndpoint();

      if (response && response.length > 0) {
        insertionExternalUsers(response);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  /**
   * Check is data exists in the Cloud Database
   */
  const isUserExistInDB = async () => {
    try {
      const response = await isUsersExistInDBEndpoint();

      if (response && response.status) {
        if (response.exist) {
          getPaginatedUsers();
        } else {
          getExternalAPIUsers();
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  /**
   * Retrieve data from the Cloud Database
   */
  const getPaginatedUsers = async () => {
    try {
      const response = await getPaginatedUsersEndpoint(1);

      if (response && response.status) {
        setUsers(response);

        await insertDataToIndexedDB("users", response.data.data);

        dataExistInIndexedDB();
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  /**
   * Insert collection of data to the Cloud Database
   */
  const insertionExternalUsers = async (users: IUser[]) => {
    try {
      setInsertionStart(true);
      for (let i = 0; i < 100; i++) {
        await createUser(users[i % users.length], () =>
          setInsertionProgress((prevProgress) => prevProgress + 1)
        );
      }

      setInsertionStart(false);
      getPaginatedUsers();
    } catch (error) {
      toast.error(error.message);
    }
  };

  /**
   * Save user to the Cloud Database
   */
  const createUser = async (user: IUser, callback: any) => {
    try {
      const response = await createUserEndpoint(user);

      if (response && response.status) {
        callback();
        return response.data;
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  /**
   * Check is data exists in the IndexedDB
   */
  const dataExistInIndexedDB = async () => {
    try {
      const getUsers = await retrieveDataFromIndexedDB("users");
      if (getUsers) {
        setUsers(getUsers);
        setLoading(false);
      } else {
        isUserExistInDB();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    dataExistInIndexedDB();
  }, []);

  return (
    <CtxProvider
      value={{
        loading,
        users,
        loadingText,
        insertionProgress,
        insertionStart,
        setLoading,
        setUsers,
        setLoadingText,
      }}
    >
      {children}
    </CtxProvider>
  );
};

export default PropsProvider;
