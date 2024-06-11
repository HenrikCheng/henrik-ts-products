"use client";
import React, { useState, ChangeEvent } from "react";
import useSWR from "swr";
import CurrentUserDisplay from "./currentUserDisplay";

export interface Product {
	id: number;
	title: string;
}

export interface User {
	id: number;
	products: number[];
}

const useProducts = () => {
	const fetcher = (url: string) => fetch(url).then((res) => res.json());
	const { data, error } = useSWR<{ products: Product[] }>(
		"https://dummyjson.com/products?limit=5",
		fetcher,
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
					?.products.includes(product.id),
		  )
		: [];
	console.log("🚀 ~ data:", data);

	return (
		<div className="p-4">
			<CurrentUserDisplay
				users={users}
				currentUser={currentUser}
				handleUserChange={handleUserChange}
				filteredProducts={filteredProducts}
			/>

			<div>
				<h2>All products</h2>
				<ol>
					{data.products.map((product) => (
						<li key={product.id}>{product.title}</li>
					))}
				</ol>
			</div>
		</div>
	);
};

export default UsersList;
