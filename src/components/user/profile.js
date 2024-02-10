// src/components/ArticleList.js
import React from "react";
import useStore from "../../store/store";

function Profile() {
  const { user } = useStore.getState();
  //console.log("user 33: ", user);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="list-group">
        {user || {}.image || "".indexOf("http") === 0 ? (
          <img
            src={user.image}
            style={{
              maxWidth: "200px",
              maxHeight: "200px",
              borderRadius: "50%",
            }}
          />
        ) : (
          <img
            src={`data:image/jpeg;base64,${user.image}`}
            style={{
              maxWidth: "200px",
              maxHeight: "200px",
              borderRadius: "50%",
            }}
          />
        )}

        <div style={{ textAlign: "center" }}>{user.username}</div>
        <div style={{ textAlign: "center" }}>{user.name}</div>
        <div style={{ textAlign: "center" }}>{user.email}</div>
        <br />
      </div>
    </div>
  );
}

export default Profile;
