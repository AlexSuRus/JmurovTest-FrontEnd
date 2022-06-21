import React from "react";
import {
  createSmartappDebugger,
  createAssistant,
} from "@sberdevices/assistant-client";
import { Container } from '@sberdevices/plasma-ui/components/Grid';

import "./App.css";
import Scene from './components/scene';
import { TaskList } from './pages/TaskList';



export class App extends React.Component {

  render() {
    console.log('render');
    return (
      <Container>

        <Scene />

      </Container>
    )
  }


}

