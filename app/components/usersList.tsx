"use client";
import React, { useState, ChangeEvent } from "react";
import useSWR from "swr";
import CurrentUserDisplay from "./currentUserDisplay";
import Image from "next/image";

export interface Product {
  id: number;
  title: string;
  thumbnail: string;
}

export interface User {
  id: number;
  products: number[];
}

const useProducts = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR<{ products: Product[] }>(
    "https://dummyjson.com/products?limit=6",
    fetcher
  );
  return { data, error };
};

const UsersList: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<null | number>(null);
  const { data, error } = useProducts();

  if (error) return <div>Error loading data</div>;
  if (!data) return <div>Loading...</div>;

  const users: User[] = [
    { id: 1, products: [1, 2] },
    { id: 2, products: [3, 4] },
    { id: 3, products: [1, 4, 5] },
  ];

  const handleUserChange = (event: ChangeEvent<HTMLInputElement>) => {
    const userId = parseInt(event.target.value);
    setCurrentUser(userId);
  };

  const filteredProducts = currentUser
    ? data.products.filter((product) =>
        users
          .find((user) => user.id === currentUser)
          ?.products.includes(product.id)
      )
    : [];
  console.log("🚀 ~ data:", data);

  return (
    <div className="p-4 container">
      <CurrentUserDisplay
        users={users}
        currentUser={currentUser}
        handleUserChange={handleUserChange}
        filteredProducts={filteredProducts}
      />

      <div>
        <h2>All products</h2>
        <ol className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {data.products.map((product) => {
            const isActive = currentUser
              ? users
                  .find((user) => user.id === currentUser)
                  ?.products.includes(product.id)
              : false;
            return (
              <li
                key={product.id}
                className={`border border-solid border-gray-100 p-6 md:p-8 ${
                  isActive ? "bg-gray-700" : ""
                }`}
              >
                <h4>{product.title}</h4>
                <Image
                  src={product.thumbnail}
                  width={500}
                  height={500}
                  alt="Picture of the author"
                />
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default UsersList;
