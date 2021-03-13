import React, {Component} from 'react';
import './App.css';
import TOC from "./components/TOC";
import Content from "./components/Content";
import Subject from "./components/Subject";


//리액트의 컴포넌트 클래스를 상속하여 새로운 클래스를 만드는 것!
//즉 컴포넌트를 만드는 코드임!
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      mode:'welcome',
      subject:{title:'WEB', sub:'World Wide Web'},
      welcome:{title:'welcome',desc:'Hello React!!'},
      toc:{title:'HTML',desc:'HyperTextMarkup Language'},
      contents:[//여러개이기 때문에 배열을 만든다.
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive'}
      ]
    }
  }
  render() {
    var _title=null;
    var _desc=null;

    if(this.state.mode==='welcome'){
      _title=this.state.welcome.title;
      _desc=this.state.welcome.desc;
    }else if(this.state.mode==='read'){
      _title=this.state.contents[0].title;
      _desc=this.state.contents[0].desc;
    }
    return (
      <div className="App">
        <Subject 
        title={this.state.subject.title} 
        sub={this.state.subject.sub}
        onChangePage={function(){
         this.setState({mode:'welcome'});
        }.bind(this)}>
        </Subject>
        <TOC data={this.state.contents}></TOC>
        <Content title={_title} desc={_desc}></Content>
      </div>
    );
  }
}

export default App;
