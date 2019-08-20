import Unsplash, { toJson } from 'unsplash-js';

  export const unsplash = new Unsplash({
    applicationId: "36b62b015efc76ea8d1f5675d426f9bf7962b250e6faafff25556b9aa1e2a49c",
    secret: "a662c4dbb84f8ef70842a5ad00c9f0f46e699b8d5371062d791048a04fd9cfc2",
    callbackUrl: "http://localhost:8080/auth"
  });

  export const authenticationUrl = unsplash.auth.getAuthenticationUrl([
    "public",
    "write_likes"
  ]);

  export const setAccessTokenUnplash = (code) => {
    unsplash.auth.userAuthentication(code)
        .then(res => res.json())
        .then(json =>
            localStorage.setItem('token', json.access_token)
        );
};

export const listPhoto = (start, end, access_token) => {

    unsplash.auth.setBearerToken(access_token);

    return unsplash.photos.listPhotos(start, end, "latest")
        .then(res => res.json());
};

export const likePhoto = (id, token) => {
    unsplash.auth.setBearerToken(token);

    unsplash.photos.likePhoto(id)
        .then(toJson)
        .then(json => {
            console.log(json);
        });
};

export const unLikePhoto = (id, token) => {
    unsplash.auth.setBearerToken(token);

    unsplash.photos.unlikePhoto(id)
        .then(toJson)
        .then(json => {
            console.log(json);
        });
};
