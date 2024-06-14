"use client";
import React, { useState, ChangeEvent } from "react";
import useSWR from "swr";

export interface Insurance {
  id: number;
  title: string;
  preamble: string;
  body: string;
  url: string;
}

export interface Users {
  [key: string]: number[];
}

const useProducts = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(
    "https://my-json-server.typicode.com/proactivehealth/work-test-sample/insurances",
    fetcher
  );
  return { data, error };
};

const UsersList: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<null | string>(null);

  const { data, error } = useProducts();

  if (error) return <div>Error loading data</div>;
  if (!data) return <div>Loading...</div>;

  const users: Users = {
    "1": [1, 2],
    "2": [3, 4],
    "3": [1, 3, 4],
  };

  const filteredInsurances = currentUser
    ? data.filter((insurance: Insurance) =>
        users[currentUser].includes(insurance.id)
      )
    : data;

  return (
    <div className="p-4 container">
      <div className="p-4 flex flex-row justify-between">
        <select
          onChange={(e) => setCurrentUser(e.target.value)}
          value={currentUser ?? ""}
          className="text-black"
        >
          <option value="" disabled>
            Select a user
          </option>
          {Object.entries(users).map(([userId, userValues]) => (
            <option value={userId} key={userId}>
              User: {userId}
            </option>
          ))}
        </select>

        <button
          className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setCurrentUser(null)}
          disabled={!currentUser}
        >
          Reset
        </button>
      </div>

      {filteredInsurances.map((insurance: Insurance) => {
        return (
          <div
            key={insurance.id}
            className="border border-solid border-black m-4 p-4"
          >
            <h3 className="text-lg text-pink-700">{insurance.title}</h3>
            <p className="font-semibold">{insurance.preamble}</p>
            <p>{insurance.body}</p>
            <a
              className="underline hover:text-pink-700"
              href={insurance.url}
              rel="noreferrer"
              target="_blank"
            >
              Läs mer
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default UsersList;
