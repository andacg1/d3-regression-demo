import React, { useCallback, useEffect, useMemo, useState } from 'react'
import DataForm from './DataForm'
import logo from './logo.svg';
import * as d3 from 'd3-regression'
import { select } from 'd3-selection'
import { line } from "d3-shape";
import { scaleLinear } from "d3-scale";
import './App.css';
import PredictionForm from './PredictionForm'


const Circle = ({
    cx,
    cy,
    r = 3,
    fill = "#69b3a2"
                }) => <circle
    cx={cx}
    cy={cy}
    r={r}
    fill={fill}
/>

function createRegression({ data, width, height }) {
    const linearRegression = d3.regressionLinear()
                         .x(d => d.x)
                         .y(d => d.y)
                         .domain([0, 20]);
    
    const regression = linearRegression(data)
    
    
    const xSelector = (d) => d.x;
    const ySelector = (d) => d.y;
    
    const xScale = scaleLinear().range([0, width]).domain([0, 20]);
    const yScale = scaleLinear().range([0, height]).domain([0, 20]);
    
    const linePath = line()
        .x((d) => xScale(xSelector(d)))
        .y((d) => yScale(ySelector(d)))
        ([{ x: regression[0][0], y: regression[0][1] }, { x: regression[1][0], y: regression[1][1] }]);
    
    
    const circles = data
        .map(({x, y}) => ({x: xScale(x), y: yScale(y)}))
        .map(({ x, y }) => <Circle cx={x} cy={y}/>)
    
    return {
        linePath,
        circles,
        regression
    }
}

function App() {
    const width = 500;
    const height = 500;
    
    const [data, setData] = useState([
        {x: 8, y: 3},
        {x: 2, y: 10},
        {x: 11, y: 3},
        {x: 6, y: 6},
        {x: 5, y: 8},
        {x: 4, y: 12},
        {x: 12, y: 1},
        {x: 9, y: 4},
        {x: 6, y: 9},
        {x: 1, y: 14},
    ])
    const [prediction, setPrediction] = useState({input: 0, output: 0})
    
    const { linePath, circles, regression } = createRegression( { data, width, height });
    
    const predict = (input) => {
        const newPrediction = { input, output: regression.predict(input) }
        setPrediction( newPrediction)
        return newPrediction
    }
    
    const predictionMemo = useMemo(() => {
        return predict(prediction.input)
    }, [data, prediction.input])
    
/*    const predictCallback = useCallback((input) =>
        setPrediction( { input, output: regression.predict(input) })
    , [data])*/
    
    
    
/*    const PredictionFormMemo = useMemo(() => () => <PredictionForm prediction={predictionMemo} setPrediction={predict} />,
                                       [regression.predict])*/
    
  return (
    <div className="App">
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <svg width={width} height={height}>
                <path d={linePath} stroke="#ff6347" strokeWidth={3} fill="none" />
                {circles}
            </svg>
            <h4>R² = {regression.rSquared}</h4>
            <PredictionForm prediction={predictionMemo} setPrediction={predict}/>
            <DataForm data={data} setData={setData}/>
        </div>
    </div>
  );
}

export default App;
