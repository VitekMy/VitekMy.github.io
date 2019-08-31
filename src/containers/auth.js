import React from 'react';

import { loadPhoto } from '../actions';
import { setAccessTokenUnplash, listPhoto } from '../unsplash';
import { connect } from 'react-redux';

import Photo from '../components/photo';
import "../styles/auth.css";

var isResizeble = false;

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.loadPhotos = this.loadPhotos.bind(this);

        if (localStorage.getItem('token') === 'undefined' || localStorage.getItem('token') === '' || !localStorage.getItem('token'))
            this.setAccessToken();
    }


    loadPhotos() {
        let start = window.localStorage.getItem('start');
        let end = window.localStorage.getItem('end');


        const data = listPhoto(start, end, localStorage.getItem('token'))
        // console.log("listPhoto:", data);
        console.log("loadPhoto_thisprops:", this.props);
        data.then(data => this.props.loadPhoto(data));
        window.localStorage.setItem('start', +start + 10);
    }


    setAccessToken() {
        const code = location.search.split('code=')[1];

        if (code) {
            setAccessTokenUnplash(code);
        }
    }

    componentDidMount() {
        //var isResizeble = false;


        if(!isResizeble) {
            this.loadPhotos();
            isResizeble = true;
        }
    }

    render() {

        return (
            <main className="main-wrapper">
              <header>
                <nav className="nav-wrapper red lighten-1">
                <div className="container">
                  <a className="brand-logo">Skillbox Unsplash App</a>
                </div>
                </nav>
              </header>
                <div className="container">
                    <div className="row">
                        <div className="container-my">
                            <div className="card-items grid" >
                            {
                                this.props.photos.map((photo, index) => {
                                    return <Photo key={index} photo={photo} index={index} />
                                })
                            }
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <button type="button" className="btn btn-success btn-lg btn-block" onClick={this.loadPhotos}>Загрузить изображения</button>
                    </div>
                </div>
            </main>
        )

    }
}

function mapStateToProps(state) {
    return {
        photos: state.photoReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadPhoto: (photos) => dispatch(loadPhoto(photos))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Auth);
