import { FETCH_POSTS, NEW_POST, DEL_POST } from './types';

export const fetchPosts = () => dispatch => {
    //console.log('http://localhost:3004/Prueba/1')
    fetch('http://localhost:3004/Prueba')
        .then(res => res.json())
        .then(posts => 
            dispatch({
                type: FETCH_POSTS,
                payload: posts
            })
        );
    
}

export const createPost = postData => dispatch => {
    console.log('action called');
    console.log(postData);
    fetch('http://localhost:3004/Prueba', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
        .then(res => res.json())
        .then(post => 
            dispatch({
                type: NEW_POST,
                payload: post
            })
        );
    
}

export const deletePost = id => dispatch => {
    console.log('action called 2');
    console.log(id);
    fetch('http://localhost:3004/Prueba/'+ JSON.stringify(id), {
            method: 'DELETE',
            headers: {
                
            },
            body: JSON.stringify(id)
        });
        
        
    
}