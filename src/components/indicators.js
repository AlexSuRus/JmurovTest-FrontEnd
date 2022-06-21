import React from "react";

import { Row } from '@sberdevices/plasma-ui/components/Grid';
import { Toast } from '@sberdevices/plasma-ui';
import { setConstantValue } from "typescript";

import './centerIndicators.css'
import './marginIndicators.css'

class Indicators extends React.Component {
    constructor(props) {
      super(props);
    }
//  <div className='indWrapper'> <Toast  text={`: ${this.props.glory}🎺`} /> </div>
    render() {
        return (
            //className="center-ch"
            <Row className = 'centerInd'>
                <div className='indWrapper'> <Toast  text={`Количество баллов: ${this.props.lives}✅`} /> </div>
                <div className='indWrapper'> <Toast  text={`Номер билета  ${this.props.mana} / 45`} /> </div>
            </Row>

);
    }
  }

export default Indicators;