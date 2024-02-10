import React from "react";
import Article from "./article";

function ArticleList({ articles, onStatusChange, setViewToProfilePage }) {
  return (
    <div>
      {articles.length > 0 &&
        articles.map((article) => (
          <div key={article.id} className="card mb-3">
            <Article article={article} onStatusChange={onStatusChange} setViewToProfilePage={setViewToProfilePage}/>
          </div>
        ))}
    </div>
  );
}

export default ArticleList;
