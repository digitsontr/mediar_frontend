"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import ArticleList from "../components/article/articles";
import TopicList from "../components/topic/topics";
import ArticleShareStarter from "../components/article/shareArticle";


function MainPage() {
  const [articlesOfFollowings, setArticlesOfFollowings] = useState([]);
  const [articlesOfNonFollowings, setArticlesOfNonFollowings] = useState([]);

  const [activeTab, setActiveTab] = useState('followed');

  const fetchData = async () => {
    /*
    try {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://7897-46-197-140-92.ngrok-free.app/api/beogs_devices',
        headers: { 
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning" : true
        }
      };
      
      axios.request(config)
      .then((response) => {
        console.log("DATA PAPIL: ", response);
      })
      .catch((error) => {
        console.log("ERROR PAPIL1: ", error);
      });
    } catch (e) {
      console.log("ERROR PAPIL2: ", e);
    }
    */

    if (((window || {}).localStorage || {}).token == undefined) {
      window.location.href = "/login";
    }

    try {
      const response = await axios.get("http://127.0.0.1:3000/articles/myfollowings", {
        headers: {
          Authorization:
            "Bearer " + ((window || {}).localStorage || {}).token || "",
        },
      });

      console.log("DATA myfollowings: ", response);
      setArticlesOfFollowings(response.data || []);
    } catch (error) {
      console.error('Article listesi alınırken hata oluştu:', error);

      window.location.href = "/login";
    }

    try {
      const response = await axios.get("http://127.0.0.1:3000/articles/mynonfollowings", {
        headers: {
          Authorization:
            "Bearer " + ((window || {}).localStorage || {}).token || "",
        },
      });

      console.log("DATA mynonfollowings : ", response);
      setArticlesOfNonFollowings(response.data || []);
    } catch (error) {
      console.error('Article listesi alınırken hata oluştu:', error);

      window.location.href = "/login";
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const tabsStyle = {
    display: 'flex',
    justifyContent: 'center', // İçerikleri yatay eksende ortalar
    marginBottom: '20px', // İsteğe bağlı olarak biraz boşluk ekleyebilirsiniz
  };
  
  // Tab butonları için genel stil
  const tabStyle = {
    padding: '10px 20px',
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    fontSize: '16px',
    margin: '0 10px', // Butonlar arasında boşluk bırakmak için
    borderBottom: '3px solid transparent',
  };
  
  // Aktif tab butonu için stil
  const activeTabStyle = {
    ...tabStyle,
    borderBottom: '3px solid blue',
  };
  

  return (
    <div className="container">
      <br /><br />
      <div className="row">
        <div className="col-md-2 card">
          <br />
          <h5 className="text-center">Topics</h5>
          <hr />
          <TopicList />
          {/* Topics listesi */}
        </div>

        <div className="col-md-1"></div>

        <div className="col-md-8">
          <ArticleShareStarter />
          <br /><br />

          <div style={tabsStyle} className="tabs">
            <button
              style={activeTab === 'followed' ? activeTabStyle : tabStyle}
              onClick={() => handleTabChange('followed')}
            >
              Followed
            </button>
            <button
              style={activeTab === 'nonFollowed' ? activeTabStyle : tabStyle}
              onClick={() => handleTabChange('nonFollowed')}
            >
              Recommended
            </button>
          </div>

          <br />

          {activeTab === 'followed' && (
            <ArticleList articles={articlesOfFollowings} />
          )}
          {activeTab === 'nonFollowed' && (
            <ArticleList articles={articlesOfNonFollowings} />
          )}
        </div>
      </div>
      <br /><br />
    </div>
  );
}

export default MainPage;
