import React from 'react';
import {getMergeSortAnimations} from '../algo/merge';
import {getQuickSortAnimations} from '../algo/quick';
import { getHeapSortAnimations } from '../algo/heap';
import { getBubbleSortAnimations } from '../algo/bubble';
import './SortingVisualizer.css';


const ANIMATION_SPEED_MS = 1;


const NUMBER_OF_ARRAY_BARS = 310;


const PRIMARY_COLOR = 'turquoise';


const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 700));
    }
    this.setState({array});
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  quickSort() {
    const animations = getQuickSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = animations[i][0] === 'compare';
      if (isColorChange) {
        const [ , barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = animations[i][3] ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [ , barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }
  
  heapSort() {
    const animations = getHeapSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [operation, barOneIdx, barTwoIdxOrHeight] = animations[i];
      
      if (operation === 'compare') {
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdxOrHeight].style;
        const color = animations[i][3] ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else if (operation === 'swap') {
        setTimeout(() => {
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${barTwoIdxOrHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }
  

  bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const [operation, barOneIdx, barTwoIdxOrHeight] = animations[i];
  
      if (operation === 'compare') {
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdxOrHeight].style;
        const color = animations[i][3] ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else if (operation === 'swap') {
        setTimeout(() => {
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${barTwoIdxOrHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }
  


  render() {
    const {array} = this.state;

    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}></div>
        ))}
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.quickSort()}>Quick Sort</button>
        <button onClick={() => this.heapSort()}>Heap Sort</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
        
      </div>
    );
  }
}


function randomIntFromInterval(min, max) {
 
  return Math.floor(Math.random() * (max - min + 1) + min);
}
