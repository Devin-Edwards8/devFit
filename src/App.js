import { useState, useEffect } from 'react';
import MainScreen from './containers/MainScreen';
import FitnessScreen from './containers/FitnessScreen';
import NutritionScreen from './containers/NutritionScreen';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import EStyleSheet from 'react-native-extended-stylesheet';
import SettingsScreen from './containers/Settings';
 
EStyleSheet.build({});


export default function App() {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [cards, setCards] = useState([{id: 0, title: 'edit'}])
  const { setItem, getItem } = useAsyncStorage('@cards')
  const [rows, setRows] = useState({0: [{id: 0, text: ['', '', '']}]})
  const [progressBars, setProgressBars] = useState([{title: 'calories', value: 0, id: 1, goal: 0},
  {title: 'protein', value: 0, id: 2, goal: 0}])
  const [workoutComplete, completeWorkout] = useState({status: false, weeklyProgress: 0})
  const [split, setSplit] = useState({customRotation: false, splits: Array(7).fill('fill splits in settings!'), 
  currentDay: 0, rotationLength: 7})
  const [toggle1, setToggle1] = useState(false)
  const [toggle2, setToggle2] = useState(false)
  const [toggle3, setToggle3] = useState(false)

  const handleToggle3 = (truth) => {
    setToggle3(truth)
    setSplit({...split, customRotation: truth})
  }

  const switchScreen = (screenNum) => {
    setCurrentScreen(screenNum)
  }

  useEffect(() => {
    loadWorkouts().catch(e => console.error(e))
    loadProgress().catch(e => console.error(e))
    loadRows().catch(e => console.error(e))
    loadLogin().catch(e => console.error(e))
    loadCompletion().catch(e => console.error(e))
    loadSplits().catch(e => console.error(e))
  }, []);

  const handleAddCard = () => {
    const tempCards = [...cards]
    const cardNum = tempCards.length;
    let uniqueID;
    if(cardNum === 0) {
      uniqueID = 1
    } else {
      const ids = tempCards.map(e => e.id)
      uniqueID = Math.max.apply(null, ids) + 1
    }
    tempCards[cardNum] = {id: uniqueID, title: 'edit'}
    const tempRows = {...rows}
    tempRows[uniqueID] = [{ id: 0, text: ['','',''] }, ]
    saveRows(tempRows)
    saveWorkouts(tempCards)
  }

  const handleDeleteCard = (id) => {
    const newCards = cards.filter(c => c.id !== id)
    delete rows.id
    saveRows(rows)
    saveWorkouts(newCards)
  }

  const handleAddRow = (cardID) => {
    const tempRows = {...rows}
    const cardNum = tempRows[cardID].length;
    tempRows[cardID][cardNum] = {id: cardNum, text: ['', '', '']}
    saveRows(tempRows)
  }

  const handleDeleteRow = (cardID) => {
    const tempRows = {...rows}
    tempRows[cardID] = tempRows[cardID].filter(c => c.id !== tempRows[cardID].length - 1)
    saveRows(tempRows)
  }

  const handleTitle = (title, id) => {
    const newCards = [...cards]
    newCards.forEach(element => {
      if(element.id === id) {
        element.title = title
      }
    });
    saveWorkouts(newCards)
  }

  const handleRowText = (string, id, index, cardID) => {
    const tempRows = {...rows}
    tempRows[cardID].forEach(element => {
      if(element.id === id) {
        element.text[index] = string
      }
    });
    saveRows(tempRows)
  }

  const handleGoal = (goal, id) => {
    const tempProgressBars = [...progressBars]
    tempProgressBars.forEach(element => {
      if(element.id === id) {
        element.goal = goal
      }
    });
    saveProgress(tempProgressBars)
  }

  const handleValueChange = (val, id) => {
    const tempProgressBars = [...progressBars]
    tempProgressBars.forEach(element => {
      if(element.id === id) {
        element.value += Number(val)
      }
    });
    saveProgress(tempProgressBars)
  }

  const handleValueReset = () => {
    const tempProgressBars = [...progressBars]
    tempProgressBars.forEach(element => {
      element.value = 0
    });
    saveProgress(tempProgressBars)
  }

  const screens = [
    <MainScreen onSwitch={switchScreen} progressBars={progressBars} workoutComplete={workoutComplete} completeWorkout={saveCompletion}
    split={split}/>,
    <FitnessScreen onSwitch={switchScreen} onDeleteCard={handleDeleteCard} rows={rows} onAddRow={handleAddRow}
    onAddCard={handleAddCard} cards={cards} onTitleChange={handleTitle} onDeleteRow={handleDeleteRow}
    onRowText={handleRowText}/>,
    <NutritionScreen onSwitch={switchScreen} onGoalSet={handleGoal} progressBars={progressBars}
    onValueChange={handleValueChange} onReset={handleValueReset}/>,
    <SettingsScreen onSwitch={switchScreen} onGoalSet={handleGoal} onReset={handleValueReset} progressBars={progressBars} 
    toggle3={toggle3} setToggle3={handleToggle3} toggle1={toggle1} setToggle1={setToggle1} toggle2={toggle2} 
    setToggle2={setToggle2} setSplit={saveSplits} split={split}/>
  ]

  return (
    <>{screens[currentScreen]}</>
  );

  async function saveProgress(value) {
    await AsyncStorage.setItem('@progressBars', JSON.stringify(value))
    setProgressBars(value)
  }

  async function loadProgress() {
    const oldBars = await AsyncStorage.getItem('@progressBars').catch(e => console.error(e))
    if(oldBars !== null) {
      setProgressBars(JSON.parse(oldBars))
    } else {
      setProgressBars(progressBars)
    }
  }

  async function saveRows(value) {
    await AsyncStorage.setItem('@rows', JSON.stringify(value))
    setRows(value)
  }

  async function loadRows() {
    const oldRows = await AsyncStorage.getItem('@rows').catch(e => console.error(e))
    if(oldRows !== null) {
      setRows(JSON.parse(oldRows))
    } else {
      setRows(rows)
    }
  }

  async function saveLogin(value) {
    await AsyncStorage.setItem('@date', JSON.stringify(value))
  }

  async function loadLogin() {
    const d = new Date()
    let date = String(d.getMonth()) + ',' + String(d.getDate()) + ',' + String(d.getFullYear())
    let lastDate = await AsyncStorage.getItem('@date').catch(e => console.error(e))
    // test date
    // date = '5,29,2023'
    if(lastDate !== null) {
      lastDate = JSON.parse(lastDate)
      if (lastDate !== date) {
        saveLogin(date)
        handleValueReset()
        saveCompletion({...workoutComplete, status: false})
        date = date.split(',')
        lastDate = lastDate.split(',')
        if(lastDate.length === 3) {
          const dif = Math.abs(Number(date[1]) - Number(lastDate[1]))
          const cur = (split.currentDay + dif) % Number(split.rotationLength)
          saveSplits({...split, currentDay: cur})
        }
      }
    } else {
      saveLogin(date)
      handleValueReset()
    }
  }

  async function saveSplits(splits) {
    await AsyncStorage.setItem('@splits', JSON.stringify(splits)).catch(e => console.error(e))
    setSplit(splits)
  }

  async function loadSplits() {
    const oldSplits = await AsyncStorage.getItem('@splits').catch(e => console.error(e))
    if(oldSplits !== null) {
      setSplit(JSON.parse(oldSplits))
    } else {
      setSplit(split)
    }
  }

  async function saveCompletion(truth) {
    await AsyncStorage.setItem('@completion', JSON.stringify(truth)).catch(e => console.error(e))
    completeWorkout(truth)
  }

  async function loadCompletion() {
    const status = await AsyncStorage.getItem('@completion').catch(e => console.error(e))
    if(status !== null) {
      completeWorkout(JSON.parse(status))
    } else {
      completeWorkout(false)
    }
  }

  async function saveWorkouts(newCards) {
    await setItem(JSON.stringify(newCards)).catch(e => console.error(e))
    setCards(newCards)
  }

  async function loadWorkouts() {
    const oldCards = await getItem().catch(e => console.error(e))
    if(oldCards !== null) {
      setCards(JSON.parse(oldCards))
    } else {
      setCards(cards)
    }
  }
}
