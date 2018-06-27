import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts, deletePost } from '../actions/postActions';
import { DEL_POST } from '../actions/types';
import '../App.css';


class Posts extends Component {
    constructor(props){
        super(props);
        

        
        this.onDelete = this.onDelete.bind(this);
    }

    componentWillMount(){
        this.props.fetchPosts();
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.newPost){
            this.props.posts.push(nextProps.newPost);
        }

    }
/*
    deleteItem(id){
        console.log(id);
        //call action
        this.props.deletePost(id);
    }
    */
    onDelete(post){
        //e.preventDefault();

        const poste = {
            id: post.id,
            title: post.title,
            body: post.body,
            status: post.status
        }
        console.log(poste);

        //call action
        this.props.deletePost(poste.id);
        //this.props.fetchPosts();
        this.componentWillMount();
        console.log("No puede ser");

    }
    
    render() {
        const postItems = this.props.posts.map(post => (
            
        <div class="panel panel-default b-r-md">
            <div class="panel-heading p-xs" key={post.id}>
                {post.title}
            </div>
            <div class="panel-body p-xs" key={post.id}>
                <p>{post.body} - <b>{JSON.stringify(post.status)}</b></p>
            </div>
            <button type="delete" onClick={this.onDelete.bind(this, post)} >Delete</button>

        </div>
        ));
        return (
        <div>
            <div class="ibox">
                <div class="ibox-title">
                    <h5>Rubrix</h5>
                </div>
                <div class="ibox-content">
                    <div class="row">
                        {postItems}    
                    </div>
                </div>       
            </div>
        </div>
        )
    }
}

Posts.propTypes = {
    fetchPosts: PropTypes.func.isRequired,
    //deletePost: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired,
    newPost: PropTypes.object
}

const mapSateToProps = state => ({
    posts: state.posts.items,
    newPost: state.posts.item,
    //delPost: state.posts.it
    
});

export default connect (mapSateToProps, {fetchPosts, deletePost})(Posts);

/*
<div key={post.id} >
                <h3>{post.id} {post.title}</h3>
                <p>{post.body} - <b>{ JSON.stringify(post.status)}</b></p>
                
                 
                <button type="delete" onClick={this.onDelete.bind(this, post)} >Delete</button>
                
            </div>
            */