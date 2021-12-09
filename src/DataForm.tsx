import React, { useEffect, useState } from "react";

interface DataFormProps {
    data: {
        x: number,
        y: number,
    }[]
    setData
    className?: string
    children?
}

export function DataForm ({ data, setData, className }: DataFormProps) {
    
    const updateData = ({row, update}) => {
        setData(data => {
            const newData = [...data]
            newData.splice( row, 1, { ...data[row], ...update } )
            return newData
        })
    }

    return (
        <form className={className} style={{
            display: 'flex',
            flexDirection: 'column',
            width: '200px',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {data.map(({ x, y }, i) =>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-apart',
                    flex: '1 1 auto',
                }}>
                    <label htmlFor={`${i}-x`}>X</label>
                    <input
                        value={x}
                        type={'number'}
                        id={`${i}-x`}
                        onChange={e => {updateData( { row: i, update: {x: Number(e.target.value)} })}}
                    />
                    
                    <label htmlFor={`${i}-x`}>Y</label>
                    <input
                        value={y}
                        type={'number'}
                        id={`${i}-y`}
                        onChange={e => {updateData( { row: i, update: {y: Number(e.target.value)} })}}
                    />
                </div>
            )}
            
        </form>
    )
}

export default DataForm
