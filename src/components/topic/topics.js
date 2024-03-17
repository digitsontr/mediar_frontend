// src/components/ArticleList.js
import React from "react";
import useStore from "../../store/store";

function TopicList() {
  const { user } = useStore.getState();
  //console.log("user 33: ", user);

  if (!user) {
    return <div>Loading...</div>;
  }

  const topics = ["Trends", "Sport", "World", "Academic", "Software"];

  return (
    <div>
      <div>
        <div className="list-group">
          {user.image.indexOf("http") === 0 ? (
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

          <br />
          <div style={{ textAlign: "center" }}>{user.username}</div>
          <div style={{ textAlign: "center" }}>{user.name}</div>
          <div style={{ textAlign: "center" }}>{user.email}</div>
          <br />
        </div>
      </div>

      <br />
      <div>
        <div className="list-group">
          {topics.map((topic, index) => (
            <li key={index} className="list-group-item topic-item">
              {" "}
              # {topic}
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopicList;
