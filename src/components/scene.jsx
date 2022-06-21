import {TaskList} from '../pages/TaskList';
import getScene, { API_URL } from '../services/APIHelper.js'
import React, { useEffect, useState } from 'react';
import {
  createSmartappDebugger,
  createAssistant,
} from "@salutejs/client";
import { darkSber } from '@sberdevices/plasma-tokens/themes';
import { Button } from '@sberdevices/ui/components/Button/Button';
import { Container, Row, Col } from '@sberdevices/plasma-ui/components/Grid';
import { Image } from '@sberdevices/ui/components/Image/Image';
import { Spinner } from '@sberdevices/plasma-ui/components/Spinner'
import { Headline1 } from '@sberdevices/plasma-ui';
import Indicators from './indicators'
import './scene.css';
import './centerButtons.css'
import './centerText.css'
import './centerPic.css'
import './sthg.css'
import './startText.css'
import './marginIndicators.css'
import './buttonText.css'
import './lastBut.css'
import './centerSpinner.css'
import { createMethodSignature } from 'typescript';
let characterID;
let firstRepeat = false;
let lives = '0';
let mana = 0;
let counter = 0;
let currentId = 0;
let pictures = [];
const setBackground = {
  backgroundImage: ''
}
const initializeAssistant = (getState/*: any*/) => {
  if (process.env.NODE_ENV === "development") {
    return createSmartappDebugger({
      token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmZjAwMTgwOWU2ZGFkY2VhZjcwNGMxMzQxYjJjNjMyNjFkYTAzNzgzYjBmMmNlOWIyMmY1OWI2YTVhN2I2NmQ5MjdmZmQiLCJhdWQiOiJWUFMiLCJleHAiOjE2NTU5MjMzOTIsImlhdCI6MTY1NTgzNjk4MiwiaXNzIjoiS0VZTUFTVEVSIiwidHlwZSI6IkJlYXJlciIsImp0aSI6IjUyYjUxMjVkLWIzMzMtNGQxYS1iZjBkLTIwNTQ0NjU2ZjZmZSIsInNpZCI6IjI1M2I5NTBiLThjZDAtNDJiMC1hMDczLTgxM2JlY2JhMmY0OSJ9.ZnaF8YicOpxnRTVhEZyBBGXJ8uQzTt3M-_jRvFpzROvWNfGEe3pZh7LSJ4qA4jBLMYxPNq4xEjj-6oNIn2w4hTbuTxgJjbqRgHF415m_Rjf1x_DiqHQ18ddA9w6tX1ZPTpt3tybvgT_ffAevfBVuV2eKbAL0hKTYf0ZiJARFLVzXNm0tXDbil1oy0kN4hOG5peYAOqEjpd2Gt5u7vc50rV9YtFtA8tEs2dUGKewknDMJFL-cdl2_jI5epF8sRurgapJgtsWxey1iG88ZATqXqlR0GayBRI5lmtKEtS0wEZFjPy-wYHSEQhKHEWXfp9pWYFF4_x1tlSvvGeagZmMgAfvVzmi5OeBKsNJF-PDe_rmZvbfk_kCMhTfiB-nomOD9wIKSC_N1dXenaUvyqEJh6POqawTGdkDcJoFcVjng5WYFsA7m8YgG5dPzsbO1HYWFY0tnZp_V7noih8pj92iHvoCi-BSVWt7yOcZaNOeIEyuQAKX59d8qukBMThaHTg4AgxtsHIkJpnJg3DSRcz_ioqkWypuGsuhDXkG9o2D4mPLWWNsXOYbL6kOmiEzKmmiS_jBhsAZ65vMhGu2L81IrsUU6bdIaqW5fQWkmu-6NO1EhERY3h_Hk1nHLGWu4q8HGDBpeJmxgtqrSrszV8hiDRdfw5I33_LJX8r7k6JZgHr0",
      initPhrase: `Запусти Шкала Депрессии Жмурова`,
      getState,
    });
  }
  return createAssistant({ getState });
};
const fetchedData = async (id) => {
  return await getScene(id);
}
export class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
   
    
    this.state = {
      notes: [],
      scene:           null,
      backgroundImage: { background: '' }
    };
    this.assistant = initializeAssistant(() => this.getStateForAssistant() );
    this.assistant.on("start", (event) => {
      console.log(`assistant.on(start)`, event);
    });
    this.assistant.on("data", (event/*: any*/) => {
      switch (event.type) {
        case 'character':
          characterID = event.character.id;
          this.setState({scene: this.state.scene, character: characterID});
      }
      console.log(`assistant.on(data)`, event);
      const { action } = event
      this.dispatchAssistantAction(action);
    });
    this.assistant.on("start", (event) => {
    });
  }
  async componentDidMount() {
    
    const response = await getScene(currentId);
  
    const { data } = response;
   /* if (data.nodesArr) {
      nodesArr = data.nodesArr.slice(0, data.nodesArr.length);
      console.log('nodesArr', nodesArr);
      curNodes = nodesArr.slice(0, nodesArr.length);
    } */
    this.setState({ scene: data , character : characterID});
    this.read();
  }
  getStateForAssistant () {
    console.log('getStateForAssistant: this.state:', this.state);
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; 
    }
    
    
    
    const state = {
      item_selector: {
        items: { 
          text : this.state.scene.text, 
          texts : this.state.scene.texts,
          texta : this.state.scene.texta,
          textj : this.state.scene.textj,
          id: this.state.scene.id
          
          
       
         }
      }
    };
    console.log('getStateForAssistant: state:', state)
    return state;
  }
 
  exit () {
    this.assistant.close();
  }
  read () {
    this.assistant.sendData( { action : { action_id : 'read' } } );
  }
  newScene () {
    this.assistant.sendData( { action : { action_id : 'newScene' } } );
  }
  sendException() {
    this.assistant.sendData( { action : { action_id : 'noMatch' } } );
  }
  add_note (action) {
    let choice = action.choice;
    let isChanged = false;
    let choiceCap = choice;
    choice = choice.toString().toLowerCase();
    console.log('Choice = ',choice);
    console.log('ChoiceCap = ', choiceCap);
   mana++;
    
    this.state.scene.options.forEach((arr, index) => {
      if (index + 1 === choice) {
        this.moveTo(arr.id);
        isChanged = true;
      }
      console.log('ARR = ' + arr.text);
      function numbersOnly(value) {
        if (typeof (value) === 'number') {
            return value;
        }}
        function sumDigitsFromString(str) {
          var sum = 0;
          var numbers = str.match(/\d+/g).map(Number);
          for (var i = 0; i < numbers.length; i++) {
              sum += numbers[i]
          }
          return sum;
      }
      if(!arr.text[0].includes('Начать тест')){
        if (arr.text.includes(choiceCap)) {
          console.log('tetxt', arr.text); 
          lives = parseInt(lives)+parseInt(arr.text[1])
        } else {
          console.log('EROR');
        }
      }
      this.moveTo(arr.id);
      isChanged = true;
      })
    if (!isChanged) {
      this.sendException();
    }
 /*
 if (choice.includes(this.state.scene.ra.toLowerCase())) {lives++;} else {mana++;}
mana++;
console.log('Check ',this.state.scene.id, ' ', mana, ' ', this.state.scene.texts);
    console.log('LOOK AT ME!!! ', this.state.scene.ra.toString().toLowerCase(),' ', choice, ' ', lives);
   
  */ 
  }

  setBackgrounds (curImg) {
  }
  
  
  
  moveTo(nextId) {
      counter++;
      nextId = this.state.scene.id + 1;
      console.log('NextId is ', nextId);
    if(nextId === 46) {
      nextId = 0;
      counter = 0;
      lives = 0;
      mana = 0;
      this.state.scene.id = 0;
    }
    console.log('NextId is ', nextId);
   
    getScene(nextId)
      .then((response) => {
        const { data } = response;
        console.log('DATA =   ', data);
     
        this.setState({ scene: data , character : characterID});
        this.newScene();
      });
  }

  dispatchAssistantAction (action) {
    console.log('dispatchAssistantAction', action);
    if (action) {
      switch (action.type) {
        case 'add_note':
          console.log('add_note', action, 'action.choice = ', action.choice);
          return this.add_note(action);
        
        case 'read':
          return this.read();
          case 'addFirst':
            console.log('addFirst');
            lives = parseInt(lives)+0; 
            mana++;
            //nextId += 1;
            this.moveTo(10);
            console.log(action);
            //this.myRef.current.focus();
         //   if(this.myRef !== null) {
          //  this.myRef.current.click();
        //    }
         //   this.add_note({choice: item.text[0]})
            return ;
  
            case 'addSecond':
              console.log('addSecond');
              lives = parseInt(lives)+1; 
              mana++;
              //nextId += 1;
              this.moveTo(10);
              console.log(action);
              //this.myRef.current.focus();
           //   if(this.myRef !== null) {
            //  this.myRef.current.click();
          //    }
           //   this.add_note({choice: item.text[0]})
              return ;
              case 'addThird':
                console.log('addThird');
                lives = parseInt(lives)+2; 
                mana++;
                //nextId += 1;
                this.moveTo(10);
                console.log(action);
                //this.myRef.current.focus();
             //   if(this.myRef !== null) {
              //  this.myRef.current.click();
            //    }
             //   this.add_note({choice: item.text[0]})
                return ;
                case 'addForth':
                  console.log('addForth');
                  lives = parseInt(lives)+3; 
                  mana++;
                  //nextId += 1;
                  this.moveTo(10);
                  console.log(action);
                  //this.myRef.current.focus();
               //   if(this.myRef !== null) {
                //  this.myRef.current.click();
              //    }
               //   this.add_note({choice: item.text[0]})
                  return ;

        case 'newScene':
          return this.newScene();
      }
    }
  }

  neededText(scene) {
    if (scene.text) {
      return scene.text;
    }
     if (characterID === 'joy'){
      return scene.textj;
    }
    if (characterID === 'eva'){
      return scene.texta;
    } 
    return scene.texts;
  }
  render() {
    const { scene, backgroundImage } = this.state;
    console.log("SCENE ", scene);
    if (scene) {
      if (scene.options) {
        if (counter == 0) {
          return (
            < >
              <Col type="calc" offsetS={1} offsetM={2} offsetL={3} offsetXL={4} sizeS={1} sizeM={2} sizeL={3} sizeXL={4} />
              <h1 className='textWrapper centerText'> { this.neededText(scene) } </h1>
              {
                
                scene.options.map((item) => {
                  return (
                    <Row>
                      <Button ref = {input => this.myRef = input} scaleOnInteraction = {false} scaleOnHover = {false} scaleOnPress = {false} style={{ marginBottom: '5rem', width: '100%' }} stretch={true} size="l" onClick={ () => this.add_note({choice: item.text[0]}) }>
                      <div className='butTextWrapper'> {item.text[0]} </div>
                      </Button>
                    </Row>
                  );
                })
              }
            </>
          );
        }
    
        return(
          <>
              <Row className='rowWrapper'>
               
                <Col className = 'centerBut no-left-margin' type="rel" offsetS={0} offsetM={0} offsetL={1} offsetXL={0} sizeS={4} sizeM={3} sizeL={3} sizeXL={6}>
        
                  <Indicators lives={lives} mana={mana} />
                  {
                    <div>
                      <h1 className='centerText'> { this.neededText(scene) } </h1>
                      {
                      scene.options.map((item) => {
                        return (
                          <Row type="rel" sizeS={4} sizeM={6} sizeL={6} sizeXL={6}>
                            <Button key={item.id} scaleOnInteraction = {false} scaleOnHover = {false} scaleOnPress = {false} style={{ marginBottom: '12px', width: '1500px',height: '80px' }} stretch={true} size="s" onClick={ () => this.add_note({choice: item.text[0]}) }>
                              <div className='butTextWrapper'> {item.text[0]} </div>
                            </Button>
                          </Row>
                        );
                      })}
                    </div>
                  }
                  </Col>
              </Row>
            </>
        );
      }
    } else {
      return (<Spinner className='spinnerWrapper'/>);
    } 
  }
}
export default Scene;