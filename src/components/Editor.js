import React, { Component } from 'react';
import tinymce from 'tinymce';
import 'tinymce/themes/modern';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/table';
import Comments from './comments'



class TinyEditorComponent extends Component {
  constructor() {
    super();
    this.state = { editor: null , comments :[] };
  }

  onEditorChange(e){
    console.log(e)
  }

  componentDidMount() {

   
    tinymce.init({
      selector: `#${this.props.id}`,
      skin_url: `${process.env.PUBLIC_URL}/skins/lightgray`,
      // plugins: 'tma_annotate',
      external_plugins: {
        'tma_annotate': `${process.env.PUBLIC_URL}/tma_annotate.js`,
      },
      toolbar1: 'tma_annotate tma_annotatedelete tma_annotatehide ',
      comments : [],


      setup: editor => {
        this.setState({ editor : editor });

        function addComment(id,text){
            var comments = this.state.comments.slice();    
            comments.push({id: id, text: text});   
            this.setState({comments:comments})
        }

        function removeComment(id){
            var comments = this.state.comments.slice();    
            comments = comments.filter(item =>{
                return item.id != id;
            })
            this.setState({comments:comments})
        }

        editor.addComment = addComment.bind(this);
        editor.removeComment = removeComment.bind(this);

      
      }
    });
  }

  componentWillUnmount() {
    tinymce.remove(this.state.editor);
  }

  render() {
    return (
      <div>
      <textarea
        id={this.props.id}
        value={this.props.content}
        onChange={e => console.log(e)}
      />
      <Comments list={this.state.comments} />
      </div>
    );
  }
}

export default TinyEditorComponent;