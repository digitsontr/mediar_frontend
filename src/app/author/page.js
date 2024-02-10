// pages/profile.js
"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ProfileTopSection from "../../components/user/profileTopBar";
import ArticleList from "../../components/article/articles";
import UserList from "../../components/user/users";

function Author(authorId) {
  const [articles, setArticles] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [view, setView] = useState([]);
  const [user, setUser] = useState({});

  const setViewToProfilePage = (componentName) => {
    setView(componentName)
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:3000/articles/self/",
        {
          headers: {
            Authorization:
              "Bearer " + ((window || {}).localStorage || {}).token || "",
          },
        }
      );

      console.log("Article List : ", response);

      setArticles(response.data || []);
    } catch (error) {
      console.error("Article listesi alınırken hata oluştu:", error);

      //window.location.href = '/login';
    }

    try {
      const response = await axios.get(
        "http://127.0.0.1:3000/auth/followers",
        {
          headers: {
            Authorization:
              "Bearer " + ((window || {}).localStorage || {}).token || "",
          },
        }
      );

      console.log("Follower List : ", response);

      setFollowers((response.data || {}).followers || []);
    } catch (error) {
      console.error("Article listesi alınırken hata oluştu:", error);

      //window.location.href = '/login';
    }

    try {
      const response = await axios.get(
        "http://127.0.0.1:3000/auth/followings",
        {
          headers: {
            Authorization:
              "Bearer " + ((window || {}).localStorage || {}).token || "",
          },
        }
      );

      console.log("Following List : ", (response.data || {}).followings || []);

      setFollowings((response.data || {}).followings || []);
    } catch (error) {
      console.error("Article listesi alınırken hata oluştu:", error);

      //window.location.href = '/login';
    }

    setViewToProfilePage("articles");
  };
  
  const onStatusChange = () => {
    // Kullanıcı listesini yeniden yükle
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const changeView = (newView) => {
    setView(newView);
  };

  return (
    <div className="container">
      <br />
      <br />

      <ProfileTopSection
        followersCount={followers.length || 0}
        articlesCount={articles.length || 0}
        followingsCount={followings.length || 0}
        user={user}
        onViewChange={changeView}
      />

      <div className="row d-flex justify-content-center">
        <div className="col-md-8">
          <br />

          {view === "articles" && (
            <div>
              <h2>Articles</h2>
              <hr />

              <ArticleList articles={articles} onStatusChange={onStatusChange} setViewToProfilePage={setViewToProfilePage}/>
            </div>
          )}

          {view === "followers" && (
            <div>
              <h2>Followers</h2>
              <hr />
              <ul>
                <UserList users={followers} onStatusChange={onStatusChange} setViewToProfilePage={setViewToProfilePage} />
              </ul>
            </div>
          )}

          {view === "followings" && (
            <div>
              <h2>Followings</h2>
              <hr />

              <ul>
                <UserList users={followings} onStatusChange={onStatusChange} setViewToProfilePage={setViewToProfilePage}/>
              </ul>
            </div>
          )}
        </div>
      </div>

      <br />
      <br />
    </div>
  );
}

export default Author;
