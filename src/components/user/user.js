import React, { useState, useEffect } from "react";
import axios from "axios";

function User({ user, onStatusChange, setViewToProfilePage }) {
  const [isFollowing, setIsFollowing] = useState(user.isFollowing);

  const toggleFollowStatus = async (action) => {
    console.log(`${action} fonksiyonu çağrıldı`);

    const endpoint = `http://127.0.0.1:3000/auth/${action}/${user.id}`;
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

      console.log(`${action} fonksiyonu çağırıldı 3`);

      console.log("ppppppppp", response.data);
      // İşlem başarılı olduktan sonra state'i güncelleyin

      if (action === "unfollow") {
        setIsFollowing(false);
      } else {
        setIsFollowing(true);
      }

      onStatusChange();
     
      console.log(`${action} fonksiyonu başarılı 3`);

    } catch (error) {

      console.error(`Error during ${action}:`, error);

      /*
      if (error.response && error.response.status === 405) {
        console.log(`${action} fonksiyonu başarısız: Method Not Allowed, ancak güncelleme yapıldı`);

        if (action === "unfollow") {
          setIsFollowing(false);
        } else {
          setIsFollowing(true);
        }
  
        onStatusChange();
      }
      */
    }
  };

  /*
  const toUserDetailPage = async () => {

  }*/

  return (
    <div
      className="profile-top-section"
      style={{
        color: "white",
        padding: "20px 0",
        display: "flex",
        alignItems: "center",
        borderRadius: "10px",
        borderColor: "black",
        borderWidth: "3px", // Piksel birimini kullanın
        borderStyle: "solid", // Border stilini belirtin
      }}
    >
      <div
        className="profile-pic"
        style={{
          background: "gray",
          borderRadius: "50%",
          width: "100px",
          height: "100px",
          marginLeft: "15%",
        }}
      >
        <img
          src={`data:image/jpeg;base64,${user.image}`}
          alt={`${user.name}'s Profile`}
          style={{ maxWidth: "100px", maxHeight: "100px" }}
        />
      </div>

      <div
        className="info-box"
        style={{
          textAlign: "center",
          marginLeft: "15%",
          width: "300px",
          color: "black",
        }}
      >
        <div>{user.name}</div>
        <hr />
        <div>{user.username}</div>
        <br />
        
        {isFollowing ? (
          ((JSON.parse(((window || {}).localStorage || {}).user || "{}").id || "") !== user.id) && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => toggleFollowStatus("unfollow")}
            >
              Unfollow
            </button>
          )
        ) : (
          ((JSON.parse(((window || {}).localStorage || {}).user || "{}").id || "") !== user.id) && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => toggleFollowStatus("follow")}
            >
              Follow
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default User;
