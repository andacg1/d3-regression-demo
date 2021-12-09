import React, { useEffect, useMemo, useState } from 'react'

interface PredictionFormProps {
    className?: string
    prediction
    setPrediction
    data?
}

export function PredictionForm ({ className, prediction, setPrediction }: PredictionFormProps) {
    
    return (
        <div className={className} style={{
            padding: 24
        }}>
            <label htmlFor={`prediction-input`} style={{marginRight: 8}}>Predict</label>
            <input type={'number'} id={'prediction-input'}
                   value={prediction.input}
                   onChange={e => {
                setPrediction(e.target.value)
            }}/>
            <h4>Prediction: {prediction.output}</h4>
        </div>
    )
}

export default PredictionForm
