import React, { useState } from "react";
import axios from "axios";

const ShareArticleModal = ({ isOpen, onClose }) => {
  const [content, setContent] = useState("");

  /*
  const shareArticle = () => {
    console.log(content);
    setContent(''); 
    onClose(); 
  };
  */

  const shareArticle = async () => {
    //console.log("shareArticle fonksiyonu çağrıldı");

    let data = new FormData();
    data.append("content", content);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://127.0.0.1:3000/articles/shareArticle",
      headers: {
        Authorization:
          "Bearer " + ((window || {}).localStorage || {}).token || "",
      },
      data: data,
    };

    const response = await axios
      .request(config)
      .then((response) => {
        //console.log(JSON.stringify(response.data));
        setContent("");
        onClose();
        //window.alert("Shared Successfully"); // Sayfayı yenilemek için
      })
      .catch((error) => {
        //console.log("error ", error);
      });
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Furkan Yıldız</h5>
            <button type="button" className="close" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>
              What about this article? <br /> Share us..
            </p>
            <textarea
              className="form-control"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share an article.."
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={shareArticle}
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareArticleModal;
