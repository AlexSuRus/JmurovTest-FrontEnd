import {TaskList} from '../pages/TaskList';
//import getScene, { API_URL } from '../services/APIHelper.js'
import React, { useEffect, useState } from 'react';

import {
  createSmartappDebugger,
  createAssistant,
} from "@sberdevices/assistant-client";

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
import { throws } from 'assert';


let characterID;

let firstRepeat = false;

let lives = '0';
let mana = 0;


let counter = 0;
let currentId = 0;
let pictures = [];

const node0 = {id: 0, texts: 'Тест для диагностики депрессивных состояний. Методика Жмурова состоит из 44 вопросов и предназначена для выявления тяжести депрессивного состояния на момент обследования у взрослых. Прочтите каждую группу показаний и выберите подходящий вариант ответа — 0, 1, 2 или 3. Внимательно прочитайте каждую группу утверждений. Затем определите в каждой группе одно утверждение, которое лучше всего соответствует тому, как Вы себя чувствовали на этой неделе и сегодня.', options: [{text: ['Мне есть 18. Начать тест', '1']}]}

const node1 = {id: 1, texts: 'Мое настроение сейчас не более подавлено (печально), чем обычно.', options: [{text: ['1) Да, не подавлено.', '0']}, {text: ['2) Пожалуй, оно более подавлено (печально), чем обычно.', '1']}, {text: ['3) Да, оно более подавлено (печально), чем обычно.', '2']}, {text: ['4) Мое настроение намного более подавлено (печально), чем обычно.', '3']}]}

const node2 = {id: 2, texts: 'Я чувствую, что у меня нет тоскливого (траурного) настроения.', options: [{text: ['1) Да, нет такого настроения.', '0']},{text: ['2) У меня иногда бывает такое настроение.', '1']}, {text: ['3) У меня часто бывает такое настроение.', '2']}, {text: ['4) Такое настроение бывает у меня постоянно.', '3']}]}

const node3 = {id: 3, texts: 'Я не чувствую себя так, будто я остался(лась) без чего-то очень важного для меня.', options: [{text: ['1) У меня нет такого чувства.', '0']},{text: ['2) У меня иногда бывает такое чувство.', '1']}, {text: ['3) У меня часто бывает такое чувство.', '2']}, {text: ['4) Я постоянно чувствую себя так, будто я остался(лась) без чего-то очень важного для меня.', '3']}]}

const node4 = {id: 4, texts: 'У меня не бывает чувства, будто моя жизнь зашла в тупик.', options: [{text: ['1) Да, у меня не бывает такого чувства.', '0']},{text: ['2) У меня иногда бывает такое чувство.', '1']}, {text: ['3) У меня часто бывает такое чувство.', '2']}, {text: ['4) Я постоянно чувствую себя так, будто моя жизнь зашла в тупик.', '3']}]}

const node5 = {id: 5, texts: 'У меня не бывает чувства, будто я состарился(лась).', options: [{text: ['1) Да, у меня не бывает такого чувства.', '0']},{text: ['2) У меня иногда бывает такое чувство.', '1']}, {text: ['3) У меня часто бывает такое чувство.', '2']}, {text: ['4) Я постоянно чувствую, будто я состарился(лась).', '3']}]}

const node6 = {id: 6, texts: 'У меня не бывает состояний, когда на душе очень тяжело.', options: [{text: ['1) Да, у меня не бывает таких состояний.', '0']},{text: ['2) У меня иногда бывает такое состояние.', '1']}, {text: ['3) У меня часто бывает такое состояние.', '2']}, {text: ['4) Я постоянно нахожусь в таком состоянии.', '3']}]}

const node7 = {id: 7, texts: 'Я чувствую себя спокойно за свое будущее, как обычно.', options: [{text: ['1) Да, я чувствую себя спокойно.', '0']},{text: ['2) Пожалуй, будущее беспокоит меня несколько больше, чем обычно.', '1']}, {text: ['3) Будущее беспокоит меня значительно больше, чем обычно.', '2']}, {text: ['4) Будущее беспокоит меня намного больше, чем обычно.', '3']}]}

const node8 = {id: 8, texts: 'В своем прошлом я вижу плохого не больше, чем обычно.', options: [{text: ['1) Да, в моем прошлом плохого не больше.', '0']},{text: ['2) В своем прошлом я вижу плохого несколько больше, чем обычно.', '1']}, {text: ['3) В своем прошлом я вижу плохого значительно больше, чем обычно.', '2']}, {text: ['4) В своем прошлом я вижу намного больше плохого, чем обычно.', '3']}]}

const node9 = {id: 9, texts: 'Надежд на лучшее у меня не меньше, чем обычно.', options: [{text: ['1) Да, не меньше.', '0']},{text: ['2) Таких надежд у меня несколько меньше, чем обычно.', '1']}, {text: ['3) Таких надежд у меня значительно меньше, чем обычно.', '2']}, {text: ['4) Надежд на лучшее у меня намного меньше, чем обычно.', '3']}]}

const node10 = {id: 10, texts: 'Я боязлив(а) не более обычного.', options: [{text: ['1) Да, я боязлив(а) не более обычного.', '0']},{text: ['2) Я боязлив(а) несколько более обычного.', '1']}, {text: ['3) Я боязлив(а) значительно более обычного.', '2']}, {text: ['4) Я боязлив(а) намного более обычного.', '3']}]}

const node11 = {id: 11, texts: 'Хорошее меня радует, как и прежде.', options: [{text: ['1) Да, радует.', '0']},{text: ['2) Я чувствую, что оно радует меня несколько меньше прежнего.', '1']}, {text: ['3) Оно радует меня значительно меньше прежнего.', '2']}, {text: ['4) Я чувствую, что оно радует меня намного меньше прежнего.', '3']}]}

const node12 = {id: 12, texts: 'У меня нет чувства, что моя жизнь бессмысленна.', options: [{text: ['1) Да, у меня нет такого чувства.', '0']},{text: ['2) У меня иногда бывает такое чувство.', '1']}, {text: ['3) У меня часто бывает такое чувство.', '2']}, {text: ['4) Я постоянно чувствую себя так, будто моя жизнь бессмысленна.', '3']}]}

const node13 = {id: 13, texts: 'Я обидчив(а) не больше, чем обычно.', options: [{text: ['1) Да, я обидчив(а) не больше, чем обычно.', '0']},{text: ['2) Пожалуй, я несколько более обидчив(а), чем обычно.', '1']}, {text: ['3) Я обидчив(а) значительно больше, чем обычно.', '2']}, {text: ['4) Я обидчив(а) намного больше, чем обычно.', '3']}]}

const node14 = {id: 14, texts: 'Я получаю удовольствие от приятного, как и раньше.', options: [{text: ['1) Да, я получаю удовольствие, как и раньше.', '0']},{text: ['2) Я получаю такого удовольствия несколько меньше, чем раньше.', '1']}, {text: ['3) Я получаю такого удовольствие значительно меньше, чем раньше.', '2']}, {text: ['4) Я не получаю теперь удовольствие от приятного.', '3']}]}

const node15 = {id: 15, texts: 'Обычно я не чувствую вины, если нет на это причины.', options: [{text: ['1) Да, я не чувствую вины без причины.', '0']},{text: ['2) Иногда я чувствую себя так, будто в чем-то я виноват(а).', '1']}, {text: ['3) Я часто чувствую себя так, будто в чем-то я виноват(а).', '2']}, {text: ['4) Я постоянно чувствую себя так, будто в чем-то я виноват(а).', '3']}]}

const node16 = {id: 16, texts: 'Если что-то у меня не так, я виню себя не больше обычного.', options: [{text: ['1) Да, я не виню себя больше обычного.', '0']},{text: ['2) Я виню себя за это несколько больше обычного.', '1']}, {text: ['3) Я виню себя за это значительно больше обычного.', '2']}, {text: ['4) Если что-то у меня не так, я виню себя намного больше обычного.', '3']}]}

const node17 = {id: 17, texts: 'Обычно у меня не бывает ненависти к себе.', options: [{text: ['1) Да, у меня не бывает ненависти к себе.', '0']},{text: ['2) Иногда бывает, что я ненавижу себя.', '1']}, {text: ['3) Часто бывает так, что я себя ненавижу.', '2']}, {text: ['4) Я постоянно чувствую, что ненавижу себя.', '3']}]}

const node18 = {id: 18, texts: 'У меня не бывает чувства, будто я погряз(ла) в грехах.', options: [{text: ['1) Да, у меня не бывает такого чувства.', '0']},{text: ['2) У меня иногда теперь бывает это чувство.', '1']}, {text: ['3) У меня часто бывает теперь это чувство.', '2']}, {text: ['4) Это чувство у меня теперь не проходит.', '3']}]}

const node19 = {id: 19, texts: 'Я виню себя за проступки других не больше обычного.', options: [{text: ['1) Да, я виню себя не больше обычного.', '0']},{text: ['2) Я виню себя за них несколько больше обычного.', '1']}, {text: ['3) Я виню себя за них значительно больше обычного.', '2']}, {text: ['4) За проступки других я виню себя намного больше обычного.', '3']}]}

const node20 = {id: 20, texts: 'Состояние, когда все кажется бессмысленным, у меня обычно не бывает.', options: [{text: ['1) Да, не бывает такого состояния.', '0']},{text: ['2) Иногда у меня бывает такое состояние.', '1']}, {text: ['3) У меня часто бывает теперь такое состояние.', '2']}, {text: ['4) Это состояние у меня теперь не проходит.', '3']}]}

const node21 = {id: 21, texts: 'Чувства, что я заслужил(а) кару, у меня не бывает.', options: [{text: ['1) Да, у меня не бывает такого чувства.', '0']},{text: ['2) Теперь иногда бывает.', '1']}, {text: ['3) Оно часто бывает у меня.', '2']}, {text: ['4) Это чувство у меня теперь практически не проходит.', '3']}]}

const node22 = {id: 22, texts: 'Я вижу в себе не меньше хорошего, чем прежде.', options: [{text: ['1) Да, я вижу в себе не меньше хорошего.', '0']},{text: ['2) Я вижу в себе несколько меньше хорошего, чем прежде.', '1']}, {text: ['3) Я вижу в себе значительно меньше хорошего, чем прежде.', '2']}, {text: ['4) Я вижу в себе намного меньше хорошего, чем прежде.', '3']}]}

const node23 = {id: 23, texts: 'Обычно я думаю, что во мне плохого не больше, чем у других.', options: [{text: ['1) Да, я думаю, что во мне плохого не больше.', '0']},{text: ['2) Иногда я думаю, что во мне плохого больше, чем у других.', '1']}, {text: ['3) Я часто так думаю.', '2']}, {text: ['4) Я постоянно думаю, что плохого во мне больше, чем у других.', '3']}]}

const node24 = {id: 24, texts: 'Желания умереть у меня не бывает.', options: [{text: ['1) Да, нет желания умереть.', '0']},{text: ['2) Это желание у меня иногда бывает.', '1']}, {text: ['3) Это желание у меня бывает теперь часто.', '2']}, {text: ['4) Это теперь постоянное мое желание.', '3']}]}

const node25 = {id: 25, texts: 'Я не плачу.', options: [{text: ['1) Да, я не плачу.', '0']},{text: ['2) Я иногда плачу.', '1']}, {text: ['3) Я плачу часто.', '2']}, {text: ['4) Я хочу плакать, но слез у меня уже нет.', '3']}]}

const node26 = {id: 26, texts: 'Я не чувствую, что я раздражителен(на).', options: [{text: ['1) Да, у меня нет такого чувства.', '0']},{text: ['2) Я раздражителен(на) несколько больше обычного.', '1']}, {text: ['3) Я раздражителен(на) значительно больше обычного.', '2']}, {text: ['4) Я раздражителен(на) намного больше обычного.', '3']}]}

const node27 = {id: 27, texts: 'У меня не бывает состояний, когда я не чувствую своих эмоций.', options: [{text: ['1) Да, не бывает таких состояний.', '0']},{text: ['2) Иногда у меня бывает такое состояние.', '1']}, {text: ['3) У меня часто бывает такое состояние.', '2']}, {text: ['4) Это состояние у меня теперь не проходит.', '3']}]}

const node28 = {id: 28, texts: 'Моя умственная активность никак не изменилась.', options: [{text: ['1) Да, моя умственная активность не изменилась.', '0']},{text: ['2) Я чувствую теперь какую-то «неясность» в своих мыслях.', '1']}, {text: ['3) Я чувствую теперь, что я сильно отупел(а)», «в голове мало мыслей».', '2']}, {text: ['4) Я совсем ни о чем теперь не думаю («голова пустая»).', '3']}]}

const node29 = {id: 29, texts: 'Я не потерял(а) интерес к другим людям.', options: [{text: ['1) Да, интерес не потерян.', '0']},{text: ['2) Я чувствую, что прежний интерес к людям несколько уменьшился.', '1']}, {text: ['3) Я чувствую, что мой интерес к людям намного уменьшился.', '2']}, {text: ['4) У меня совсем пропал интерес к людям («я никого не хочу видеть»).', '3']}]}

const node30 = {id: 30, texts: 'Я принимаю решения, как и обычно.', options: [{text: ['1) Да, принимаю решения как обычно.', '0']},{text: ['2) Мне труднее принимать решения, чем обычно.', '1']}, {text: ['3) Мне намного труднее принимать решения, чем обычно.', '2']}, {text: ['4) Я уже не могу сам(а) принять никаких решений.', '3']}]}

const node31 = {id: 31, texts: 'Я не менее привлекателен, чем обычно.', options: [{text: ['1) Да, я не менее привлекателен.', '0']},{text: ['2) Пожалуй, я несколько менее привлекателен, чем обычно.', '1']}, {text: ['3) Я значительно менее привлекателен(на), чем обычно.', '2']}, {text: ['4) Я чувствую, что я выгляжу теперь просто безобразно.', '3']}]}

const node32 = {id: 32, texts: 'Я могу работать, как обычно.', options: [{text: ['1) Да, могу работать.', '0']},{text: ['2) Мне несколько труднее работать, чем обычно.', '1']}, {text: ['3) Мне значительно труднее работать, чем обычно.', '2']}, {text: ['4) Я совсем не могу теперь работать («все валится из рук»).', '3']}]}

const node33 = {id: 33, texts: 'Я сплю не хуже, чем обычно.', options: [{text: ['1) Да, сплю не хуже.', '0']},{text: ['2) Я сплю несколько хуже, чем обычно.', '1']}, {text: ['3) Я сплю значительно хуже, чем обычно.', '2']}, {text: ['4) Теперь я почти совсем не сплю.', '3']}]}

const node34 = {id: 34, texts: 'Я устаю не больше, чем обычно.', options: [{text: ['1) Да, устаю не больше.', '0']},{text: ['2) Я устаю несколько больше, чем обычно.', '1']}, {text: ['3) Я устаю значительно больше, чем обычно.', '2']}, {text: ['4) У меня уже нет никаких сил что-то делать.', '3']}]}

const node35 = {id: 35, texts: 'Мой аппетит не хуже обычного.', options: [{text: ['1) Да, аппетит не хуже.', '0']},{text: ['2) Мой аппетит несколько хуже обычного.', '1']}, {text: ['3) Мой аппетит значительно хуже обычного.', '2']}, {text: ['4) Аппетита у меня теперь совсем нет.', '3']}]}

const node36 = {id: 36, texts: 'Мой вес остается неизменным.', options: [{text: ['1) Да, мой вес не изменяется.', '0']},{text: ['2) Я немного похудел(а) в последнее время.', '1']}, {text: ['3) Я заметно похудел(а) в последнее время.', '2']}, {text: ['4) В последнее время я очень похудел(а).', '3']}]}

const node37 = {id: 37, texts: 'Я дорожу своим здоровьем, как и обычно.', options: [{text: ['1) Да, дорожу своим здоровьем.', '0']},{text: ['2) Я дорожу своим здоровьем меньше, чем обычно.', '1']}, {text: ['3) Я дорожу своим здоровьем значительно меньше, чем обычно.', '2']}, {text: ['4) Я совсем не дорожу теперь своим здоровьем.', '3']}]}

const node38 = {id: 38, texts: 'Я интересуюсь сексом, как и прежде.', options: [{text: ['1) Да, интересуюсь сексом.', '0']},{text: ['2) Я несколько меньше интересуюсь сексом, чем прежде.', '1']}, {text: ['3) Я интересуюсь сексом значительно меньше, чем прежде.', '2']}, {text: ['4) Я полностью потерял(а) интерес к сексу.', '3']}]}

const node39 = {id: 39, texts: 'Я не чувствую, что мое «Я» как-то изменилось.', options: [{text: ['1) Да, у меня нет такого чувства.', '0']},{text: ['2) Теперь я чувствую, что мое «Я» несколько изменилось.', '1']}, {text: ['3) Теперь я чувствую, что мое «Я» значительно изменилось.', '2']}, {text: ['4) Мое «Я» так изменилось, что теперь я не узнаю себя сам(а).', '3']}]}

const node40 = {id: 40, texts: 'Я чувствую боль, как и обычно.', options: [{text: ['1) Да, чувствую боль, как и обычно.', '0']},{text: ['2) Я чувствую боль сильнее, чем обычно.', '1']}, {text: ['3) Я чувствую боль слабее, чем обычно.', '2']}, {text: ['4) Я почти не чувствую теперь боли.', '3']}]}

const node41 = {id: 41, texts: 'Некоторые расстройства (сухость во рту, сердцебиение, запоры, удушье) у меня бывают не чаще, чем обычно.', options: [{text: ['1) Да, бывают не чаще.', '0']},{text: ['2) Эти расстройства бывают у меня несколько чаще обычного.', '1']}, {text: ['3) Некоторые из этих расстройств бывают у меня значительно чаще обычного.', '2']}, {text: ['4) Эти расстройства бывают у меня намного чаще обычного.', '3']}]}

const node42 = {id: 42, texts: 'Утром мое настроение обычно не хуже, чем к ночи.', options: [{text: ['1) Да, не хуже.', '0']},{text: ['2) Утром оно у меня несколько хуже, чем к ночи.', '1']}, {text: ['3) Утром оно у меня значительно хуже, чем к ночи.', '2']}, {text: ['4) Утром мое настроение намного хуже, чем к ночи.', '3']}]}

const node43 = {id: 43, texts: 'У меня не бывает спадов настроения весной (осенью).', options: [{text: ['1) Да, не бывает.', '0']},{text: ['2) Такое однажды со мной было.', '1']}, {text: ['3) Со мной такое было два или три раза.', '2']}, {text: ['4) Со мной было такое много раз.', '3']}]}

const node44 = {id: 44, texts: 'Плохое настроение у меня бывает, но это длится недолго.', options: [{text: ['1) Да, бывает, но не долго.', '0']},{text: ['2) Подавленное настроение у меня может длиться по неделе, до месяца.', '1']}, {text: ['3) Подавленное настроение у меня может длиться месяцами.', '2']}, {text: ['4) Подавленное настроение у меня может длиться до года и больше.', '3']}]}
const node45 = {id: 45, texts: 'Интерпретация данных: 1—9 — депрессия отсутствует либо незначительна 10—24 — депрессия минимальна 25—44 — легкая депрессия 45—67 — умеренная депрессия 68—87 — выраженная депрессия 88 и более — глубокая депрессия.', options: [{text: ['Начать заново.', '1']}]}

const mapIdToMap = {
    0: node0,
    1: node1,
    2: node2,
    3: node3,
    4: node4,
    5: node5,
    6: node6,
    7: node7,
    8: node8,
    9: node9,
    10: node10,
    11: node11,
    12: node12,
    13: node13,
    14: node14,
    15: node15,
    16: node16,
    17: node17,
    18: node18,
    19: node19,
    20: node20,
    21: node21,
    22: node22,
    23: node23,
    24: node24,
    25: node25,
    26: node26,
    27: node27,
    28: node28,
    29: node29,
    30: node30,
    31: node31,
    32: node32,
    33: node33,
    34: node34,
    35: node35,
    36: node36,
    37: node37,
    38: node38,
    39: node39,
    40: node40,
    41: node41,
    42: node42,
    43: node43,
    44: node44,
    45: node45
  }

module.exports = mapIdToMap;

const setBackground = {
  backgroundImage: ''
}

const initializeAssistant = (getState/*: any*/) => {
  if (process.env.NODE_ENV === "development") {
    return createSmartappDebugger({
      //REACT_APP_SMARTAPP = "Шкала Депрессии Жмурова",
      token: process.env.REACT_APP_TOKEN ?? "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MTI4MGM1MDVjZTk0MGI5MWM4Njk4YmY2MGI2MzJjNzVhYzMyYmM4N2Q2MWEwYzdhZmNkMzZkMWMzMjU3MDRlNTM5YmU5MjcwMDQyNjI5OCIsImF1ZCI6IlZQUyIsImV4cCI6MTY1NDg2MzE0OSwiaWF0IjoxNjU0Nzc2NzM5LCJpc3MiOiJLRVlNQVNURVIiLCJ0eXBlIjoiQmVhcmVyIiwianRpIjoiMDhiYzIwN2MtNjI3Ny00ZTI4LWJjYzUtOGQwMDdkNzY2Y2I5Iiwic2lkIjoiZjIxMzk1NWItYjBlNC00OGJiLWFlOGMtNWM2ZWI5MjkyOGZjIn0.qh0JS28Ddl92EJUgUzyOg7Osxc0MoB6UoXRqVjpVvYK6uxbRfsSnwXA-FHd7O857veB0FDJvRzjzq-lhPqyOhg1XyHNAzizY4Yp-cuCXLIv3wplR9uGmFBKGUQHTbPr1D9R40KZhfTqji09cO_BNTpTejuW8TEwYOuRY7J4ULhwO3LUZeMG5kDQ-7Lqr7KtZgYCUNr81q0mykC8Saa0I328HWrtuyX_YsEejQ0u834Ru-XmUbeMVNSKDr7ybd8WYRulpGY2plA7nARMEHMdKGQaY5Ph9UBUJM6jhZE7-RE_18zvJ9DhqHtO2qLjHIv9MLDMR3Ffkqak8Ns4rHVKw8i-GJcHD1YjLhVIvo5KnxgzIRuGDUs58n5XuuiFo9pRj1tIX-0EX9t2VY1Pdb5WJtltZBscTgA9a4_Ii09a6WMzmqSfe_YrF_9JhTWko9r1-nkKeNMIEILsWOvM9b4zY0VGH6A_EOu9RRfEkpznXSIpJq96nqEcvy7CqRPuxFLvZJfo9D3hXkwUIFNmKm6a5w2OcnP6qg2JiqrRy5isLoIGsqJWmZKSXqJVHoXjfPIUr9wp-taugroK5lgsW8_P_4YLeS26L27_4O4OiHoE6BIv90H2egaI9oPCq8dqUlWbyPYm_tAGLwVH0YIph9z8GqWEzmoODfjX5lqKlQlidao8",
      initPhrase: `Запусти ${process.env.REACT_APP_SMARTAPP}`,
    //    initPhrase: `Шкала Депрессии Жмурова`,
      getState,
    });
  }
  return createAssistant({ getState });
};

/*
const fetchedData = async (id) => {
  return await getScene(id);
}
*/

export class Scene extends React.Component {
  constructor(props) {
    super(props);
   // console.log('constructor');

    //this.value = 0;

    this.state = {
      notes: [],
      scene:           null,
      backgroundImage: { background: '' }
    };

    this.assistant = initializeAssistant(() => this.getStateForAssistant() );
    this.assistant.on("data", (event/*: any*/) => {
      switch (event.type) {
        case 'character':
          characterID = event.character.id;
          this.setState({scene: this.state.scene, character: characterID});
     //     console.log("CHARACTER= ", characterID);
         case 'action':
           console.log(`assistant.on(data)`, event);
           const { action } = event
           this.dispatchAssistantAction(action);
      }
      console.log(`assistant.on(data)`, event);
      const { action } = event
      this.dispatchAssistantAction(action);
    });
    this.assistant.on("start", (event) => {
    //  console.log(`assistant.on(start)`, event);
    });

  }

  async componentDidMount() {
    //console.log('componentDidMount');
    console.log("!!!!!!!!!!!!! componentDidMount 2");
    //const response = await getScene(currentId);
  //  console.log(response);
    const { data } = mapIdToMap[currentId];//response;

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
      return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
    }
    
    // const rand =  Math.floor(Math.random() * this.state.scene.options.length);
    // const rand = this.state.scene.options.length == 1 ? 0 :  Math.floor(Math.random() * this.state.scene.options.length);

    const state = {
      item_selector: {
        items: { 
          text : this.state.scene.text, 
          texts : this.state.scene.texts,
          texta : this.state.scene.texta,
          textj : this.state.scene.textj,
          id: this.state.scene.id
          // userSuggest: this.state.scene.options[rand].text[0]
          // RKSP_ERROR_1
       //  userSuggest: this.state.scene.options[getRandomInt(0, this.state.scene.options.length)].text[0]
         }
      }
    };

    console.log('getStateForAssistant: state:', state)
    return state;
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
            console.log('LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOL');
            return mana = 20;
  

        case 'newScene':
          return this.newScene();

        /*
        case 'delete_note':
          return this.delete_note(action);
        default:
          throw new Error();
        */
      }
    }
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
    choice = choice.toLowerCase();
   
    
    console.log('Choice = ',choice);
    console.log('ChoiceCap = ', choiceCap);
//console.log("VERY IMPORTANT TEST ",this.state.scene.options[1].text);
  /*  if (this.state.scene.options[1]) {
      if (this.state.scene.options[1].text.includes('выход') && this.state.scene.options[1].text.includes(choice.toLowerCase())) {
     //   console.log("EXIT")
        this.exit();

        
      } //choice exit

      // console.log("FINDING A WAY OUT ", this.state.scene.options[1].text.includes('выйти'));
      // console.log("THE CHOICE ", choice);
      // console.log("PROBABLY ANOTHER WAY ", this.state.scene.options[1].text.includes(choice.toLowerCase()));
      } */
/*
    if (choice == 'один' || choice == 'первый' || choice == 'первое' || choice == 'первую') {
      choice = 1;
    }
    if (action.choice == 'два' || choice == 'второй'|| choice == 'второе' || choice == 'вторую') {
      choice = 2;
    }
    if (action.choice == 'три' || choice == 'третий'|| choice == 'третье' || choice == 'третью') {
      choice = 3;
    }
    if (action.choice == 'четыре' || choice == 'четвертый'|| choice == 'четвертое' || choice == 'четвертую') {
      choice = 4;
    }
    */

   // if (this.state.scene.ra === choice) { lives++;}
   //lives += 10;
   mana++;
    //console.log("SECOND CHOICE = ", choice);

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
 //   if (this.state.scene.ra.toLowerCase().includes === choice) {lives++;} else {mana++;}
 if (choice.includes(this.state.scene.ra.toLowerCase())) {lives++;} else {mana++;}
mana++;
//lives++;
console.log('Check ',this.state.scene.id, ' ', mana, ' ', this.state.scene.texts);
 /*if (this.state.scene.id = 20)
 { 
   if (mana >= 2) 
  { this.state.scene.texts = 'Вы не прошли'}
}; */

    console.log('LOOK AT ME!!! ', this.state.scene.ra.toLowerCase(),' ', choice, ' ', lives);
    //return this.state;
  }

  /*add_note (action) {
    console.log('add_note', action);
    this.setState({
      notes: [
        ...this.state.notes,
        {
          id:        Math.random().toString(36).substring(7),
          title:     action.note,
          completed: false,
        },
      ],
    })
  }*/

  setBackgrounds (curImg) {
   // pictures.push(curImg);
    //debugger;
    /*let string = ``;
    pictures.reverse();
    pictures.forEach((pic, index) => {
      string = string + `url(${API_URL}/${pic}.png) center no-repeat`;
      if (index < pictures.length - 1){
        string = string + ',';
      }
    });
    //setBackgroundImage({background : string});
    this.setState({ backgroundImage: {background : string}, character: characterID})
    pictures.reverse(); */
  }
  
  //nextId = this.state.scene.id + 1;

  //nextId = 5;
  moveTo(nextId) {
    //fetchedData(nextId)

   // сonsole.log("Counter is ",counter);
    
      counter++;
      //nextId = counter;
      nextId = this.state.scene.id + 1;
      console.log('NextId is ', nextId);
    // console.log('ARRAY = ', curNodes);
      /* 
      if (true){ //nextId) {

        if (true) {
        //  console.log('NODES ARR = ', nodesArr);
          if (!firstRepeat) {
        //   nextId = this.state.id + 1;
            firstRepeat = true;
            
        //    console.log('REPEAT POINT NODES ARR' ,nodesArr);
          //  curNodes = nodesArr.slice(0, nodesArr.length);
        //   console.log('REPEAT POINT CUR NODS' ,curNodes);
          }
          else{
        //   console.log('REPEAT POINT NODES ARR' ,nodesArr);
          //  curNodes = nodesArr.slice(0, nodesArr.length);
        //   console.log('REPEAT POINT CUR NODS' ,curNodes);
            
        //   nextId =  6;//Math.floor(Math.random() * curNodes.length);
            let tmp = nextId;
        //    nextId = curNodes[nextId];
          //  curNodes.splice(tmp, 1);
          //  console.log('NEXT ID = ', nextId);
          }
        }
        else {
      //    nextId =  5;//Math.floor(curNodes.length);
          let tmp = nextId;
      //   nextId = curNodes[nextId];
      //   curNodes.splice(tmp, 1);
      //   console.log(curNodes);
        } 
      }
      */
    if(nextId === 46) {
      nextId = 0;
      counter = 0;
      lives = 0;
      mana = 0;
      this.state.scene.id = 0;
    }
    console.log('NextId is ', nextId);

   

  //    curNodes = nodesArr.slice(0, nodesArr.length); 
  /*
      counter = 1;
      lives = 3;
      mana = 50;
      glory = 50; 
    } */
    //nextId = this.state.scene.id + 1;
  //  if (this.state.scene.ra === choice) { lives++;}
   
    getScene(nextId)
      .then((response) => {
        const { data } = response;
        //setScene(data);
      //  if (data.ra === '1') {
     //   console.log('Scene id =   ', this.state.scene.id);

        console.log('DATA =   ', data);
     //   if (this.state.scene.ra == this.state.scene.options[1].text[1])
    // console.log("FIRST CHOICE = ", choice);
    //    this.assistant.sendData( { action : {action_id : 'NewScene'}});
   
       //   lives += 1; 
       //   mana += 1;
      //    glory += data.bonus.glory;
     //   }

        this.setState({ scene: data , character : characterID});
        this.newScene();
        // this.read();
        // counter++;
     //   console.log('COUNTER = ', counter);
        /*
        if (counter > 0 && data.img) {
          this.setBackgrounds(data.img);
        } 
        */
      });
  }

  neededText(scene) {
    if (scene.text) {
      return scene.text;
    }
 /*   if (characterID === 'joy'){
      return scene.textj;
    }
    if (characterID === 'eva'){
      return scene.texta;
    } */
    return scene.texts;
  }

  render() {

    /*
    const [scene, setScene] = useState(null);
    const [scene, setScene] = useState(null);

    const [backgroundImage, setBackgroundImage] = useState({background : ''});

    const fetchedData = async (id) => {
       return await getScene(id);
    }
    
    useEffect(() => {
       fetchedData(currentId).then((response) => {
           console.log(response);
           const { data } = response;
           setScene(data);
       })
    }, []);
    */
    
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
                      <Button scaleOnInteraction = {false} scaleOnHover = {false} scaleOnPress = {false} style={{ marginBottom: '5rem', width: '100%' }} stretch={true} size="l" onClick={ () => this.add_note({choice: item.text[0]}) }>
                      <div className='butTextWrapper'> {item.text[0]} </div>
                      </Button>
                    </Row>
                  );
                })
              }
            </>
          );
        }

     /*   if (counter < 1) {
          return(
                <Row className='rowWrapper'>
                  <Col sizeS={4} sizeM={3} sizeL={4} sizeXL={6} className='centerPic'>
                    <div style={backgroundImage} className = 'img-Wrapper'>
                    </div>
                   
                  </Col>
                  <Col className = 'centerBut' type="rel" offsetS={0} offsetM={0} offsetL={1} offsetXL={0} sizeS={4} sizeM={3} sizeL={3} sizeXL={6}>
                    <h1 className='centerText'> { this.neededText(scene) } </h1>
                    {
                      scene.options.map((item) => {
                        return (
                          <Row>
                            <Button key={item.id} scaleOnInteraction = {false} scaleOnHover = {false} scaleOnPress = {false} style={{ marginBottom: '12px', width: '1500px' ,height: '80px'}} stretch={true} size="s" onClick={ () => this.add_note({choice: item.text[0]}) }>
                            <div className='butTextWrapper'> {item.text[0]} </div>
                            </Button>
                          </Row>
                        );
                      })
                    }
                  </Col>
            </Row>
          );
        } */


        /*
         <Col sizeS={4} sizeM={3} sizeL={4} sizeXL={6} className='centerPic'>
                  <div style={backgroundImage} className = 'img-Wrapper'>
                  </div>
                </Col>
                */ //после Row в следующем Return
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