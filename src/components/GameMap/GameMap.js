import React from 'react'
import {GameArea} from "../../config/GameConfig";
import produce from "immer";

const GameMap = props =>{
    return(
        <div
            style={{
                display: "grid",
                gridTemplateColumns: `repeat(${GameArea.numCols}, 20px)`
            }}
        >
            {props.grid.map((rows, i) =>
                rows.map((col, k) => (
                    <div
                        key={`${i}-${k}`}
                        onClick={() => {
                            const newGrid = produce(props.grid, gridCopy => {
                                gridCopy[i][k] = props.grid[i][k] ? 0 : 1;
                            });
                            props.setGrid(newGrid);
                        }}
                        style={{
                            width: 20,
                            height: 20,
                            backgroundColor: props.grid[i][k] ? "white" : undefined,
                            border: "solid 1px gray"
                        }}
                    />
                ))
            )}
        </div>
    )
}

export default GameMap