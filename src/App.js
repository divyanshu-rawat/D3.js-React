

import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import * as d3 from 'd3';
import data from './data_set/data.csv';
import {Batting} from './Components/Batting';
import {Bowling} from './Components/Bowling';


// console.log('bowling', );
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Boolean: true,
      isLoading: true
    };
    this.load_data_driven_document = this.load_data_driven_document.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle(){
    this.setState({ Boolean: !this.state.Boolean })
  }

  load_data_driven_document(){
    d3.csv(data)
    .then((data) => {
      this.setState({ data: data })
    })
    .catch((err) => {
        throw err;
    })
  }

  componentDidMount() {
    this.load_data_driven_document();
    setTimeout(() => this.setState({isLoading: false}), 2000)
  }

  render() {

    if(this.state.isLoading){
     return(
        <div className="container"><img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" className="_loader" /></div>
      )
    }

    return ( 
      <div className = "container App" id = "App"> 
          <button type="button" className="btn btn-default" onClick = {this.toggle}>Toggle Batting/Bowling</button>
          { 
            (this.state.data && this.state.Boolean == true ) ? 
             <div>
               <Batting data = {this.state.data}/>
                  <div id="visualization" className="col-sm-12">
                  </div>
                   <ul class="label-graph">
                    <li><div class="won"></div><span>WON</span></li>
                    <li><div class="lost"></div><span>LOST</span></li>
                    <li><div class="no-result"></div><span>NO RESULT</span></li>
                  </ul>
             </div> : null
          }

          { (this.state.data && this.state.Boolean == false) ? <Bowling data = {this.state.data}/> : null}
          
          
      </div>
    );
  }
}

export default App;