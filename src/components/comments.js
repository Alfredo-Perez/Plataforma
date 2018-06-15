import React, {Component} from 'react';


export default class Comments extends Component {
  constructor(props) {
    super(props);
  }

  render() {

  	const listItems =  this.props.list.map((d) => <li key={d.id}>{d.text}</li>);


    return (
      <div>
      <h1>Comments</h1>
      <ul>
      {listItems}
      </ul>
      </div>
    );
  }
}