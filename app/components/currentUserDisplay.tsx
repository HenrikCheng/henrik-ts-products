import React, { ChangeEvent } from "react";
import { Product, User } from "./usersList";

interface CurrentUserDisplayProps {
  users: User[];
  currentUser: number | null;
  handleUserChange: (event: ChangeEvent<HTMLInputElement>) => void;
  filteredProducts: Product[];
}

const CurrentUserDisplay = ({
  users,
  currentUser,
  handleUserChange,
  filteredProducts,
}: CurrentUserDisplayProps) => {
  return (
    <div className="gap-4 flex">
      <div>
        <h2>Select a user</h2>

		<div className="flex gap-2">
        {users.map((user: User) => (
          <div key={user.id} className="flex flex-col">
            <input
              type="radio"
              value={user.id}
              name="id"
              onChange={handleUserChange}
            />
            user: {user.id}
          </div>
        ))}
		</div>
      </div>

      {/* <div>
        <div>Current user: {currentUser}</div>
        <ul>
          {filteredProducts.map((product: Product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default CurrentUserDisplay;
