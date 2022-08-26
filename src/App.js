import './App.css';
import Particooles from './Components/Particooles/Particooles';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Clarifai from 'clarifai';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Rank from './Components/Rank/Rank';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import { Component } from 'react';


const app = new Clarifai.App({
  apiKey: 'b362b100722d41688391ff34255a9785'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
    // console.log(event.target.value);
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    // console.log('click');
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        // '53e1df302c079b3db8a0a36033ed2d15'
        // 'https://samples.clarifai.com/face-det.jpg'
        this.state.input)
      .then(
      function(response){
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
          // response.outputs[0].data.regions[0].region_info.bounding_box
      },
      function(err){
        // there was an error
      }
    );
  }

  render(){
  return (
    <div className="App">
      <Particooles/>
      <Navigation />
      <Logo />
      <Rank/>
      <ImageLinkForm 
        onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}/>
      <FaceRecognition 
      imageUrl={this.state.imageUrl}
      />
    </div>
  );
 }
}
export default App;
