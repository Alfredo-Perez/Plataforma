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
      
      <Provider store={store}>
      
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <TinyEditorComponent
            id="Editor"
          />
                <PostForm />
                <hr />
                <Posts />
              </div>
      </Provider>
    );
  }
}

export default App;
