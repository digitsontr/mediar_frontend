"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import ArticleList from "../../components/article/articles";

function Favorites() {
  const [articles, setArticles] = useState([]);

  const fetchData = async () => {
    if (((window || {}).localStorage || {}).token == undefined) {
      window.location.href = "/login";
    }

    try {
      const response = await axios.get("http://127.0.0.1:3000/auth/likedArticles/1", {
        headers: {
          Authorization:
            "Bearer " + ((window || {}).localStorage || {}).token || "",
        },
      });

      //console.log("likedArticles response data : ", response.data);
      setArticles((response.data || {}).likedArticles || []);
    } catch (error) {
      //console.error('Article listesi alınırken hata oluştu:', error);

      window.location.href = "/login";
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="container">
        <br />
        <br />
        <div className="row">
          <div className="col-md-1"></div>

          <div className="col-md-8">
            {
              <div>
                <br />
                <ArticleList articles={articles} />
              </div>
            }
          </div>
        </div>

        <br />
        <br />
      </div>
    </div>
  );
}

export default Favorites;
