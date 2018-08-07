import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import './index.css';

class App extends Component {
  state = {
    messages: [],
    uid: []
  };
  addTrack() {
      console.log('addTrack', this.trackInput.value);
      this.props.onAddTrack(this.trackInput.value);
      this.trackInput.value = '';

      //  axios.post('http://159.89.21.133/new_msg',
      // {
      //   text: this.trackInput.value
      // },
      // {
      //   headers: { 'uid':  }
      // });                                 

  }

  componentWillMount() {

    if (!localStorage.getItem('KeyForReactApp')) {

        axios.get('http://138.197.146.14/new_user').then(response => { 
        console.log(response);
        this.setState({ uid: response.data.id });
        console.log(this.state.uid);

        if ( !localStorage.getItem('KeyForReactApp' ) ) {

          localStorage.setItem('KeyForReactApp', this.state.uid);
          var i = JSON.parse(localStorage.getItem("KeyForReactApp"));
          this.setState({ uid: i });
          console.log(this.state.uid);

        } 
        else {
          var e = JSON.parse(localStorage.getItem("KeyForReactApp"));
          this.setState({ uid: e});

        }

        console.log(this.state.uid);

      })
      .catch(error => {
          console.log(error.response)
      });

    } 


    console.log(this.state.uid)

    console.log(this.props.tracks);
  //   var list = axios.post('http://138.197.146.14/new_msg'
  //     ).then(response => { 
  //     console.log(response);
  //     this.setState({ messages: response.data });
  //   })
  //   .catch(error => {
  //       console.log(error.response)
  //   });
  //   console.log(JSON.parse(localStorage.getItem("KeyForReactApp")));

  var list = axios.post('http://138.197.146.14/new_msg');
  console.log(list);

  }

  render() {
    return (
        <div className="frame">
            <ul className="scroll">
             
              {this.props.tracks.map((track, index) =>
                <li>
                  <span>Аноним</span>
                  <div className="itemLi" key={index}>{track}</div>
                </li>
              )}
            </ul>
            <div className="contForInputs">
                <div className="msj-rta macro">                        
                    <div className="text text-r">
                        <input className="mytext" placeholder="Type a message" type="text" ref={(input) => { this.trackInput = input }}/>
                    </div> 

                </div>
                <div style={{padding:10, width:40}}>
                    <div className="input" onClick={this.addTrack.bind(this)}></div>
                </div>                
            </div>
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
