import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPost } from '../actions/postActions';
import '../App.css';

class PostForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            body:'',
            status: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(e) {
        this.setState({[e.target.name]: e.target.value });
    }

    onSubmit(e){
        e.preventDefault();

        const post = {
            title: this.state.title,
            body: this.state.body,
            status: this.state.status
        }

        //call action
        this.props.createPost(post);

    }
    render() {
        return (
        <div>

            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h5>Agregar rubrix</h5>
                    
                </div>
                <div class="ibox-content">
                        <div class="col-sm-6">
                            
                            <form onSubmit={this.onSubmit} role="form">
                                <div >
                                    <label>Puntos: </label><br />
                                    <input type="text" name="title" onChange={this.onChange} value={this.state.title} class="form-control"/>
                                </div>
                                <div >
                                    <label>Descripción: </label><br />
                                    <textarea name="body" onChange={this.onChange} value={this.state.body} class="form-control"/>
                                </div>
                                <div>
                                    <button type="submit">Submit</button>
                                </div>
                            </form>
                        </div>
                </div>
            </div>

        </div>
        )
    }
}
PostForm.propTypes = {
    createPost: PropTypes.func.isRequired
};

export default connect(null, {createPost})(PostForm);

/*<form onSubmit={this.onSubmit}>
                    <div>
                        <label>Puntos: </label><br />
                        <input type="text" name="title" onChange={this.onChange} value={this.state.title}/>
                    </div>
                    <br />
                    <div>
                        <label>Descripción: </label><br />
                        <textarea name="body" onChange={this.onChange} value={this.state.body}/>
                    </div>
                    <br />
                    <button type="submit">Submit</button>
                </form>
*/