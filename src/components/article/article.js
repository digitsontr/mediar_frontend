import React, { useState, useEffect } from "react";
import axios from "axios";

const Article = ({
  article: initialArticle,
  onStatusChange,
  setViewToProfilePage,
  isAuthorFollowing,
}) => {
  const [article, setArticle] = useState(initialArticle);
  const [isFollowing, setIsFollowing] = useState(isAuthorFollowing == false);
  const [editMode, setEditMode] = useState(false); // Edit modu kontrolü ekledik
  const [editedContent, setEditedContent] = useState(article.content); // Düzenlenen içeriği tutmak için state ekledik

  const currentUserID =
    typeof window !== "undefined"
      ? JSON.parse(window.localStorage.getItem("user") || "{}").id
      : null;
  const [isLikedByCurrentUser, setIsLikedByCurrentUser] = useState(
    currentUserID &&
      (article.likedUsers || []).some((user) => user.id === currentUserID)
  );

  useEffect(() => {
    setIsLikedByCurrentUser(
      currentUserID &&
        (article.likedUsers || []).some((user) => user.id === currentUserID)
    );
  }, [article, currentUserID]);

  const handleLikeClick = async () => {
    try {
      if (((window || {}).localStorage || {}).token == undefined) {
        window.location.href = "/login";
      }

      const reqUrl = isLikedByCurrentUser
        ? "http://127.0.0.1:3000/articles/unlikeArticle/" +
          JSON.stringify(article.id)
        : "http://127.0.0.1:3000/articles/likeArticle/" +
          JSON.stringify(article.id);

      const response = await axios.post(reqUrl, {
        headers: {
          Authorization:
            "Bearer " + ((window || {}).localStorage || {}).token || "",
        },
      });

      //console.log("DATA : ", response);
      //console.log("RESPONSE CODE : ", response.status);

      if (response.status === 200) {
        setArticle((prevArticle) => ({
          ...prevArticle,
          likedUsers: isLikedByCurrentUser
            ? prevArticle.likedUsers.filter((user) => user.id !== currentUserID)
            : [...prevArticle.likedUsers, { id: currentUserID }], // Bu sadece bir örnektir
        }));
        setIsLikedByCurrentUser(!isLikedByCurrentUser);
      }
    } catch (error) {
      console.error("beğeni işleminde hata oluştu:", error);

      if (error.response && error.response.status === 401) {
        window.location.href = "/login";
      }
    }
  };

  const handleUpdateClick = async () => {
    try {
      if (((window || {}).localStorage || {}).token == undefined) {
        window.location.href = "/login";
      } else {
        // Makale güncelleme işlemi için axios veya fetch kullanabilirsiniz
        const response = await axios.put(
          `http://127.0.0.1:3000/articles/updateArticle/${article.id}`,
          {
            content: editedContent, // Düzenlenen içeriği güncelleyin
          },
          {
            headers: {
              Authorization:
                "Bearer " + ((window || {}).localStorage || {}).token || "",
            },
          }
        );

        if (response.status === 200) {
          // Güncelleme başarılı olduysa
          //console.log("resp : ", response.data.updatedArticle);
          setArticle(response.data.updatedArticle);
          onStatusChange();
          setEditMode(false); // Edit modunu kapatın
        }
      }
    } catch (error) {
      console.error("güncelleme işleminde hata oluştu:", error);

      if (error.response && error.response.status === 401) {
        window.location.href = "/login";
      }
    }
  };

  const toggleFollowStatus = async (action, authorId) => {
    //console.log(`${action} fonksiyonu çağrıldı 2`);

    const endpoint = `http://127.0.0.1:3000/auth/${action}/${authorId}`;
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

      //console.log(`${action} fonksiyonu başarılı 2`);

      setIsFollowing(action);
    } catch (error) {
      console.error(`Error during ${action}:`, error);
    }
  };

  const handleRemoveClick = async () => {
    try {
      if (((window || {}).localStorage || {}).token == undefined) {
        window.location.href = "/login";
      }

      const reqUrl =
        "http://127.0.0.1:3000/articles/deleteArticle/" +
        JSON.stringify(article.id);

      const response = await axios.delete(reqUrl, {
        headers: {
          Authorization:
            "Bearer " + ((window || {}).localStorage || {}).token || "",
        },
      });

      //console.log("DATA : ", response);
      //console.log("RESPONSE CODE : ", response.status);

      if (response.status == 200) {
        //window.alert("Article Removed Successfully");

        onStatusChange();
      }
    } catch (error) {
      console.error("silme işleminde hata oluştu:", error);

      if (error.response && error.response.status === 401) {
        window.location.href = "/login";
      }
    }
  };

  /*
  <p className="card-text">
  <small className="text-muted">Puan: {article.point}</small>
  </p>
  */

  return (
    <div className="card-body">
      {article.authorName !== undefined &&
        window.location.pathname !== "/profile" && (
          <div style={{ display: "flex", alignItems: "center" }}>
            {article.authorImage !== undefined && (
              <img
                src={
                  article.authorImage.indexOf("http") !== 0
                    ? `data:image/jpeg;base64,${article.authorImage}`
                    : article.authorImage
                }
                style={{
                  maxWidth: "100px",
                  maxHeight: "100px",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
              />
            )}
            <h5
              onClick={() =>
                (window.location.href = "/user/" + article.authorId)
              }
              className="card-title"
            >
              {article.authorName}
            </h5>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              {isFollowing ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => toggleFollowStatus("follow", article.authorId)}
                >
                  Follow
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() =>
                    toggleFollowStatus("unfollow", article.authorId)
                  }
                >
                  Unfollow
                </button>
              )}
            </div>

            <hr />
          </div>
        )}

      <br />

      {editMode ? (
        <input
          type="text"
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="form-control"
        />
      ) : (
        <p className="card-text">{article.content}</p>
      )}

      <hr />

      {!editMode && (
        <div className="d-flex justify-content-between align-items-center">
          <ul className="list-group list-group-flush">
            <>
              {(article.likedUsers || []).length > 0 ? (
                (article.likedUsers || []).length > 1 ? (
                  <>
                    {(article.likedUsers || [])[0].username} and{" "}
                    {(article.likedUsers || []).length - 1} others liked
                  </>
                ) : (
                  <>{(article.likedUsers || [])[0].username} liked</>
                )
              ) : (
                <>
                  {window.location.pathname === "/profile"
                    ? "no likes yet"
                    : "be the first to like"}
                </>
              )}
            </>
          </ul>
          <small>{new Date(article.createdAt).toLocaleDateString()}</small>
        </div>
      )}

      <br />
      {window.location.href.indexOf("profile") === -1 ? (
        <button
          className={`btn ${
            isLikedByCurrentUser ? "btn-warning" : "btn-primary"
          }`}
          onClick={handleLikeClick}
          style={{ width: "100%" }}
        >
          {isLikedByCurrentUser ? "Take Back the Like" : "Like"}
        </button>
      ) : (
        <div>
          {editMode ? ( // Edit modunda değilse güncelleme butonunu göster
            <div>
              <button
                style={{ width: "100%" }}
                className="btn btn-success"
                onClick={handleUpdateClick}
              >
                Complete Update
              </button>

              <br />
              <br />

              <button
                style={{ width: "100%" }}
                className="btn btn-danger"
                onClick={(e) => setEditMode(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              className={`btn btn-primary`}
              onClick={() => setEditMode(true)}
              style={{ width: "100%" }}
            >
              Update
            </button>
          )}

          <br />
          <br />
          <button
            className={`btn`}
            onClick={handleRemoveClick}
            style={{ width: "100%", color: "red" }}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default Article;
