import React from 'react';
import ReactDOM from 'react-dom';
import {Component} from 'react';
import {taluks,cords} from './data.js'
import {callnset} from './load.js'


function DropdownList(props){
  const list = taluks.map((taluk)=>
  <li onClick = {props.click}>
    {taluk}</li>);
     return(
       <div className="Drop">
      <ul className = "dp">
       {list}
        </ul>
        </div>
     );
}
function DropDown(props){
  return(
  
  props.clicked||<DropdownList click = {props.click}/>
 
  );
}
function Taluk(props){
   return(
   <h1 id = "taluk">{props.taluk}</h1>
   );
}

async function load(i){
  var weather = await callnset(cords[i][0],cords[i][1]);
  console.log(weather);
  return weather;
  }

function DesIm(props){
  let url = "./images/wimages/"+props.condition+".jpg";
  return(
    <div className="desim">
      <img src = {url}/>
      </div>
  );
}

function Des(props){
  let des  = props.describe;
  return(
  <h1 id = "wdes"> {des} </h1>
  );
}
function Tpw(props){
  let temp = props.temp;
  let pres = props.pres;
  let wind = props.wind;
  let dir = props.dir;
  let rainy;
  if(props.rain)
     rainy = "amount of rain in last 1h "+props.rain;
  // else
  //    rainy  = "It hasn't been raining";
  

  return(
    <ul className = "tpw">
        <li id = "temp">{temp}
        <br/>
        <span class="dd">Temperature</span></li>
        <li id = "pres">{pres}
        <br/>
        <span class="dd">Pressure</span></li>
        <li id = "wind">{wind}
        <br/>
        <span class="dd">Wind speed</span></li>
        <li id = "dir">{dir}
        <br/>
        <span class="dd">Wind direction</span></li>
        <li id = "rainy">{rainy}</li>
        <li></li>
      
      </ul>
  );
   
}

function Content(props){
    let weather = props.weather;

  
  
  
  
  
   
   return(
    
    <div className = "content">
   
    <Tpw temp = {weather.temp} pres = {weather.pressure} wind = {weather.windspeed} dir = {weather.winddir} rain = {weather.rain}/>
    <Des describe={weather.conditionDes}/>
    <DesIm condition = {weather.icon}/>
    </div>
   );
}
class App extends Component{
    constructor(props){
        super(props);
        this.state = {
          taluk:taluks[1],
          talukIndex:1,
          value:"",
          clicked:true,
          weather: {temp:"",
          // maxTemp:"",
          // minTemp:"",
          condition:"",
          conditionDes:"",
          // clear:"",
          pressure:"",
          windspeed:"",
          winddir:"",
          rain:"",
          icon:""
        }
        };
        this.handleclick.bind(this);
        this.handleSelect.bind(this);
        load(1).then(weather=>{
          this.setState({weather:weather});
       
    });
    var body =document.querySelector('body').style; 
      body.background = 'url("/images/timages/im'+(this.state.talukIndex+1)+'.jpg") fixed center no-repeat';
      body.backgroundSize = "cover";
  }
    // componentDidMount(){
           
    //   });
    // }
    handleclick = ()=>{
         this.setState({clicked:!this.state.clicked});
        
    }
    handleSelect = (event)=>{
      let taluk = event.target.innerHTML;
      var child = event.target;
      var parent = child.parentNode;
      let i = Array.from(parent.children).indexOf(child);
      // console.log(i);
      
      // this.setState({clicked:!this.state.clicked});
      // // callnset(cords[i][0],cords[i][1]);
      
      // this.setState({taluk:taluk,});
      // console.log(load(this.state.talukIndex));
      
      // var weather = await load(this.state.taluk);
      load(i).then(weather=>{
      console.log(weather);
      this.setState((state)=>({weather:weather,
                              //  clicked:!state.clicked,
                               talukIndex:i,
                               taluk:taluk
                              }))
                            });
      // console.log(this.state.weather);
      this.setState({clicked:!this.state.clicked})
      var body =document.querySelector('body').style; 
      body.background = 'url("/images/timages/im'+(i+1)+'.jpg") fixed center no-repeat';
      body.backgroundSize = "cover";
      
    
  
     
   
    
     
    }
    render(){
        return(
        <div className = "App">
          <div className = "header">
        <span onClick = {this.handleclick} id = "dpt">Location</span>
        <DropDown clicked = {this.state.clicked} click ={this.handleSelect}/>
        <Taluk taluk = {this.state.taluk} /> 
        </div>
        <Content weather = {this.state.weather} />
       </div> 
        );
    }
    
}



ReactDOM.render(
  <App/>,
  document.getElementById('root')
);