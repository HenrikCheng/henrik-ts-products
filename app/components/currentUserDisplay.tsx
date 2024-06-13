import React, { ChangeEvent } from "react";
import { Product, User } from "./usersList";

interface CurrentUserDisplayProps {
  users: User[];
  currentUser: string | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<string | null>>;
}

const CurrentUserDisplay = ({
  users,
  currentUser,
  setCurrentUser,
}: CurrentUserDisplayProps) => {
  return (
    <div className="gap-4 flex">
      <label>
        Select a user
        <select
          onChange={(e) => setCurrentUser(e.target.value)}
          value={currentUser ?? ""}
          className="text-black"
        >
          <option value="" disabled>
            Select a user
          </option>
          {users.map((user: User) => (
            <option value={user.id} key={user.id}>
              {user.id}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default CurrentUserDisplay;
