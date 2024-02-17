"use client";

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Article from "../../../components/article/article";
import UserList from "../../../components/user/users";
import User from "../../../components/user/user";

const UserPage = () => {
  const [user, setUser] = useState({});
  const [articles, setArticles] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [isFollowing, setIsFollowing] = useState();
  const [mainUserId, setMainUserId] = useState({});

  const getUserData = async (userId) => {
    try {
      if (((window || {}).localStorage || {}).token == undefined) {
        window.location.href = "/login";
      }

      const reqUrl = "http://127.0.0.1:3000/auth/" + userId;

      const response = await axios.get(reqUrl, {
        headers: {
          Authorization:
            "Bearer " + ((window || {}).localStorage || {}).token || "",
        },
      });

      console.log("DATA : ", response.data);

      setUser(response.data);
      setFollowers(response.data["Followers"]);
      setFollowings(response.data["Following"]);
      setArticles(response.data["articles"]);
      setIsFollowing(response.data["isFollowing"]);
    } catch (error) {
      console.log("ERROR : ", error);

      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        window.location.href = "/login";
      }
    }
  };

  const toggleFollowStatus = async (action, userId) => {
    console.log(`${action} fonksiyonu çağrıldı 1`);

    const endpoint = `http://127.0.0.1:3000/auth/${action}/${userId}`;
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: endpoint,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token") || "",
      },
    };

    try {
      const response = await axios.request(config);
      //console.log(response.data);
      // İşlem başarılı olduktan sonra state'i güncelleyin

      onStatusChange();

      console.log(`${action} fonksiyonu başarılı 1`);

      setIsFollowing(action);
    } catch (error) {
      console.error(`Error during ${action}:`, error);
    }
  };

  const onStatusChange = () => {
    // Kullanıcı listesini yeniden yükle
    const userId = window.location.pathname.split("/")[2];

    getUserData(userId);
  };

  useEffect(() => {
    try {
      setMainUserId(
        JSON.parse(((window || {}).localStorage || {}).user || "{}").id || ""
      );

      const userId = window.location.pathname.split("/")[2];

      if (parseInt(userId) === mainUserId) {
        window.location.href = "/";
      }

      getUserData(userId);
    } catch (e) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="container">
      <br />
      <br />

      <div className="row d-flex justify-content-center">
        <div className="col-md-8">
          <div>
            <div
              className="list-group"
              style={{ alignItems: "center", display: "center" }}
            >
              {((user || {}).image || "").indexOf("https:") === 0 ? (
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
              <div style={{ textAlign: "center" }}>{user.email}</div>
              <br />

              {isFollowing ? (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => toggleFollowStatus("unfollow", user.id)}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => toggleFollowStatus("follow", user.id)}
                >
                  Follow
                </button>
              )}
            </div>
          </div>

          <br />
          <div>
            <h2>Articles</h2>
            <hr />

            {articles.length > 0 &&
              articles.map((article) => (
                <div key={article.id} className="card mb-3">
                  <Article article={article} onStatusChange={onStatusChange} />
                </div>
              ))}
          </div>

          <br />
          <br />

          <div>
            <h2>Followers</h2>
            <hr />
            <ul>
              {(followers || []).length > 0 &&
                followers.map((user) => (
                  <div key={user.id}>
                    <User
                      key={user.id}
                      user={user}
                      onStatusChange={onStatusChange}
                    />
                    <br />
                  </div>
                ))}
            </ul>
          </div>

          <br />
          <br />

          <div>
            <h2>Followings</h2>
            <hr />

            <ul>
              {(followings || []).length > 0 &&
                followings.map((user) => (
                  <div key={user.id}>
                    <User
                      key={user.id}
                      user={user}
                      onStatusChange={onStatusChange}
                    />
                    <br />
                  </div>
                ))}
            </ul>
          </div>
        </div>
      </div>

      <br />
      <br />
    </div>
  );
};

export default UserPage;
