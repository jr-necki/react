import React, {Component} from 'react';
import './App.css';
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";
import Subject from "./components/Subject";
import Control from "./components/Control";

//리액트의 컴포넌트 클래스를 상속하여 새로운 클래스를 만드는 것!
//즉 컴포넌트를 만드는 코드임!
class App extends Component {
  constructor(props){
    super(props);
    this.max_content_id=3;
    this.state={
      mode:'create',
      selected_content_id:2,
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
  getReadContent(){
     var i=0;
      while(i<this.state.contents.length){
        var data=this.state.contents[i];
        if(data.id===this.state.selected_content_id){
            return data;
        }
        i=i+1;
      }
  }
  getContent(){
    var _title,_desc,_article=null;
    if(this.state.mode==='welcome'){
      _title=this.state.welcome.title;
      _desc=this.state.welcome.desc;
      _article=<ReadContent title={_title} desc={_desc}></ReadContent>
    }else if(this.state.mode==='read'){
      var _content=this.getReadContent();
      _article=<ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    }else if(this.state.mode==='create'){
     _article=<CreateContent onSubmit={function(_title,_desc){
      this.max_content_id=this.max_content_id+1;
      var _contents=this.state.contents.concat(
        {id:this.max_content_id,title:_title,desc:_desc}
        );
      this.setState({
        contents:_contents
        })
     }.bind(this)}></CreateContent>
    }else if(this.state.mode==='update'){
      _content =this.getReadContent();
     _article=<UpdateContent data={_content} onSubmit={
       function(_id,_title,_desc){
         var _contents=Array.from(this.state.contents);//괄호안의 것을 복사한 새로운 배열 생성
        //id값이 우리가 선택한 것과 같은 걸 고른다.
        var i=0;
        while(i<_contents.length){
          if(_contents[i].id===_id){
            _contents[i]={id:_id,title:_title,desc:_desc};
            break;
          }
          i=i+1;
        }
       this.setState({
        contents:_contents
        });
     }.bind(this)}></UpdateContent>
    }
    return _article;
  }
  render() {
    
    return (
      <div className="App">
        <Subject 
        title={this.state.subject.title} 
        sub={this.state.subject.sub}
        onChangePage={function(){
         this.setState({mode:'welcome'});
        }.bind(this)}>
        </Subject>
        <TOC 
        data={this.state.contents}
        onChangePage={function(id){
        this.setState({
          mode:'read',
          selected_content_id:Number(id)
        });
      }.bind(this)}
        ></TOC>
        <Control onChangeMode={function(_mode){
          this.setState({
            mode:_mode
          })
        }.bind(this)}></Control>
        {this.getContent()}
      </div>
    );
  }
}

export default App;
