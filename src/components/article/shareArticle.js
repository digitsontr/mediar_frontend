import React, { useState } from "react";
import ShareArticleModal from "../customModal/shareArticleModal"; // ChatModal bileşeninizin yolunu doğru bir şekilde belirtin.
import useStore from "../../store/store";

const ArticleShareStarter = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const { user } = useStore.getState();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div
        className="post-starter"
        style={{
          display: "flex",
          alignItems: "center",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          marginBottom: "5px",
        }}

        onClick={openModal}
        >
      
        {((user || {}).image || "").indexOf("https:") === 0 ? (
          <>
          <img
            src={user.image}
            style={{
              maxWidth: "100px",
              maxHeight: "100px",
              borderRadius: "50%",
            }}
          />

          <h3 style={{margin: "5%"}}>Share an article..</h3>
          </>
        ) : (
          <>
          <img
            src={`data:image/jpeg;base64,${user.image}`}
            style={{
              maxWidth: "100px",
              maxHeight: "100px",
              borderRadius: "50%",
            }}
          />

          <h3 style={{margin: "5%"}}>Share an article..</h3>
          </>
          
        )}
      </div>

      <ShareArticleModal isOpen={modalOpen} onClose={closeModal} />
    </>
  );
};

export default ArticleShareStarter;
