import React, { useState, useEffect } from "react";
import axios from "axios";

function User({ user, onStatusChange, setViewToProfilePage }) {
  // Yeni bir state değişkeni ve güncelleme fonksiyonu tanımlayın
  const [isFollowing, setIsFollowing] = useState(user.isFollowingBack == false);

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
      //console.log(response.data);
      // İşlem başarılı olduktan sonra state'i güncelleyin
      
      onStatusChange();

      setIsFollowing(action);      
    } catch (error) {
      console.error(`Error during ${action}:`, error);
    }
  };

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
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => toggleFollowStatus("follow")}
          >
            Follow
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => toggleFollowStatus("unfollow")}
          >
            Unfollow
          </button>
        )}
      </div>
    </div>
  );
}

export default User;
