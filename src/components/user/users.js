// src/components/ArticleList.js
import React from "react";
import User from "./user";

function UserList({ users, onStatusChange, setViewToProfilePage }) {
  //console.log("users on userlist :", users);
  return (
    <div>
      {(users || []).length > 0 &&
        users.map((user) => (
          <div key={user.id}>
            <User key={user.id} user={user} onStatusChange={onStatusChange} setViewToProfilePage={setViewToProfilePage}/>
            <br />
          </div>
        ))}
    </div>
  );
}

export default UserList;
