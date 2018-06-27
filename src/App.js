import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
//import { Editor } from '@tinymce/tinymce-react';

import Posts from './components/Posts';
import PostForm from './components/Postform';

import store from './store';
import TinyEditorComponent from './components/Editor';

class App extends Component {
  
  
  render() {
    return (
      <div id="page-wrapper" class="gray-bg">

      <Provider store={store}>
      
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <TinyEditorComponent
            id="Editor"
          />
          <div class="col-lg-7">
            <div class="ibox float-e-margins">

              <PostForm />
            </div>
          </div>
          <hr />
          <Posts />
        </div>
      </Provider>
      </div>
      
    );
  }
}

export default App;
