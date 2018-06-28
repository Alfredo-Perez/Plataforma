import React, { Component } from "react"
import logo from "../logo.svg"
import "../App.css"
import { Provider } from "react-redux"
//import { Editor } from '@tinymce/tinymce-react';

import Posts from "./Posts"
import PostForm from "./Postform"

import store from "../store"
import TinyEditorComponent from "./Editor"

class ProfesorView extends Component {
  render() {
    return (
      <div id="page-wrapper" class="gray-bg">
        <Provider store={store}>
          <div className="App">
            <h2>Profesor</h2>
            <TinyEditorComponent id="Editor" />
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
    )
  }
}

export default ProfesorView
