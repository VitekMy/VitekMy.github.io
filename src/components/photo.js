import React from 'react';
import { NavLink} from "react-router";
import { Link } from 'react-router-dom';

const Photo = (props) => {

    const { photo, index } = props;
    const divStyle = {
      backgroundImage: 'url(' + photo.urls.small + ')',
    };

    let amountLikes = photo.likes;
    function declOfNum(number, titles) {
        var cases = [2, 0, 1, 1, 1, 2];
        return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
    }
    let likes = declOfNum(amountLikes, ['отметка', 'отметки', 'отметок']);

    return (
      <div className="authorBlock col s12">
        <div className="card-panel grey lighten-5 z-depth-1">
          <div className="row valign-wrapper">
            <div className="authorBlock_left_img">
              <a href={photo.user.links.html} target="_blank">
                <img src={photo.user.profile_image.medium} alt="" className="circle responsive-img"/>
                <div className="user_name">{photo.user.name}</div>
              </a>
            </div>
            <div className="profile_img_likes">
            <span className="black-text right">{photo.user.bio}
              <div className="Likes_text">{amountLikes} {likes} "Нравится"</div>
              <Link to={`/photo/${index}`} className="link-to">Посмотреть</Link>
            </span>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Photo;
