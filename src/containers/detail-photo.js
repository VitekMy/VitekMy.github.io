import React, { Component } from 'react';
import { connect } from 'react-redux';
import { likePhoto, unLikePhoto } from '../unsplash';
import { like, unlike } from "../actions/";
import { history } from '../storeConfig/configureStore';

import "../styles/detail-photo.css";

class DetailPhoto extends Component {

    constructor(props) {
        super(props);

        console.log("Detail Photo:", props);
        const { params } = props;

        this.state = {
            id_photo: '',
        }
    }

    componentDidMount() {
        const photos = this.props.photos;
        const id = this.props.match.params.id;
        const id_photo = photos[+id].id;
        const backgr_img = this.props.photos[+id].urls.regular;

        const divStyle = {

        };

        this.setState(
            {
                id_photo,
                divStyle,
                backgr_img
            }
        )
    }

    goBack() {

        this.props.history.goBack()
    }

    changeLikePhotoStatus() {
        const id = this.props.match.params.id;
        let status = this.props.photos[+id].liked_by_user;
        console.log(this.props.history);


        if (!status) {
            likePhoto(this.state.id_photo, localStorage.getItem('token'));
            this.props.likePhotoAction(this.state.id_photo);
        } else {
            unLikePhoto(this.state.id_photo, localStorage.getItem('token'));
            this.props.unlikePhotoAction(this.state.id_photo);
        }
    }

    render() {
        console.log(this.props)
        const id = this.props.match.params.id;

        return (
            <div className="container-fluid">
            <header>
              <nav className="nav-wrapper red lighten-1">
              <div className="container">
                <a className="brand-logo">Skillbox Unsplash App</a>
              </div>
              </nav>
            </header>
              <div className="container">
                <div className="row">
                    <div className="main-card card-panel grey lighten-5 z-depth-1">
                    <div className="backgr_img">
                      <img className="backgr_img_container" src={this.state.backgr_img} />
                    </div>
                        <div className="card-bottom">
                            <p className="card-text"> <span>Автор:</span> {this.props.photos[+id].user.name}<br/> <a href={this.props.photos[+id].user.links.html}>{this.props.photos[+id].user.links.html}</a></p>
                            <p className="card-text">Лайков: {this.props.photos[+id].likes}</p>
                            <button className={this.props.photos[+id].liked_by_user ? 'unlike_btn' : 'like_btn'} onClick={this.changeLikePhotoStatus.bind(this)}>
                                {this.props.photos[+id].liked_by_user ? 'Unlike' : 'Like'}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row">
                  <button type="button" className="but_go_back" onClick={history.goBack}>&#8592; back</button>
                </div>
            </div>
          </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        photos: state.photoReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        likePhotoAction: (id) => dispatch(like(id)),
        unlikePhotoAction: (id) => dispatch(unlike(id))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailPhoto);
