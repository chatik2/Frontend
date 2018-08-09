import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import './index.css';

class App extends Component {
  state = {
    messages: [],
    uid: [],
    usrs: [],
    msgs: []
  };

  addTrack() {
      axios.defaults.headers.post['uid'] = JSON.parse(localStorage.getItem("KeyForReactApp"));
      axios.defaults.headers.post['Content-Type'] = 'application/plaintext; charset=utf-8';
      var data = this.trackInput.value;
      var headers = 
      {
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Methods" : "GET,POST,PUT,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
        'Content-Type' : 'application/plaintext; charset=utf-8',
        'type' : 'web',
        'uid': JSON.parse(localStorage.getItem("KeyForReactApp"))
      }

      axios.post('http://138.197.146.14/new_msg', data, headers);
     this.addTrack.value = '';
  }

  updateUser() {
    console.log('updateUser', this.nameInput.value);
    axios.defaults.headers.post['uid'] = JSON.parse(localStorage.getItem("KeyForReactApp"));
    axios.defaults.headers.post['Content-Type'] = 'application/plaintext';
    var data1 = this.nameInput.value;
    axios.post('http://138.197.146.14/new_name', data1);
    this.nameInput.value = '';
  }

  componentWillMount() {
//
    if (!localStorage.getItem('KeyForReactApp')) {
        axios.get('http://138.197.146.14/new_user').then(response => { 
        console.log(response.data.id);
        localStorage.setItem('KeyForReactApp', response.data.id);
        JSON.parse(localStorage.getItem("KeyForReactApp"));
        this.setState({ uid: JSON.parse(localStorage.getItem("KeyForReactApp")) });

      })
      .catch(error => {
          console.log(error.response)
      });

    }
//
    var headers = 
    {
      "Access-Control-Allow-Origin" : "*",
      "Access-Control-Allow-Methods" : "GET,POST,PUT,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
      'Content-Type' : 'application/plaintext; charset=utf-8',
      'type' : 'web',
      'uid': JSON.parse(localStorage.getItem("KeyForReactApp"))
    }

//
//
    axios.get('http://138.197.146.14/allusers?uid=706', headers)
    .then(response => {
      console.log(response);
      this.setState({ usrs: response.data });
    })
    .catch(function (error) {
      console.log(error);
    });
//
    axios.get('http://138.197.146.14/allmsgs?uid=706', headers)
    .then(response => {
      console.log(response);
      var res = response.data.map(msg => {
        msg.date.replace(".000+0000","0")
      });
      console.log(res);
      this.setState({ msgs: response.data });
      var ul = document.getElementById("scroll");
      ul.scrollBy(0, 999999);
    })
    .catch(function (error) {
      console.log(error);
    });
//
    setInterval(function fresh() {
       window.location.reload();
    } , 20000);


  }



  render() {
    return (
        <div className="frame">
            <ul className="scroll" id='scroll'>
              {this.state.msgs.map((msg) =>
                <li className="li">
                  {this.state.usrs.filter(usr => usr.id === msg.secondUserId).map((usr) =>
                    <span className="author">{usr.name}</span>
                    )}
                  <div className="itemLi">{msg.text}</div>
                  <div className="date">{msg.date}</div>
                </li>
                )}
            </ul>
            <div className="contForInputs">
                <div className="msj-rta macro">                        
                    <div className="text text-r">
                        <input defaultValue={localStorage.getItem('input')} id="mytext" className="mytext" placeholder="Type a message" type="text" ref={(input) => { this.trackInput = input }}/>
                    </div> 
                </div>
                <div style={{padding:10, width:40}}>
                    <div className="input" onClick={this.addTrack.bind(this)}></div>
                </div>                
            </div>
            <span className='absolSpan'>Введите, пожалуйста, ваше новое имя, мистер:</span>
            <input type="text" className="textForName" ref={(input) => { this.nameInput = input }}/>
            <button className="btnForName" onClick={this.updateUser.bind(this)}></button>
        </div>       

    );
  }
}
export default connect(
  state => ({
    tracks: state.tracks
  }),
  dispatch => ({
    onAddTrack: (trackName) => {
      dispatch({ type: 'ADD_TRACK', payload: trackName });
    }
  })
)(App);
