import React, {useState, useCallback, useRef} from "react";
import produce from "immer";
import Button from "./components/button/BtnComponent";
import {operations, GameArea} from './config/GameConfig'
import GameAreaChanger from "./components/GameAreaChanger/GameAreaChanger";
import GameMap from "./components/GameMap/GameMap";


const App = () => {
    const generateEmptyGrid = () => {
        const rows = [];
        for (let i = 0; i < GameArea.numCols; i++) {
            rows.push(Array.from(Array(GameArea.numCols), () => 0));
        }

        return rows;
    };

    const [grid, setGrid] = useState(() => {
        return generateEmptyGrid();
    });

    const [running, setRunning] = useState(false);

    const runningRef = useRef(running);
    runningRef.current = running;

    const runSimulation = useCallback(() => {
        if (!runningRef.current) {
            return;
        }

        setGrid(g => {
            return produce(g, gridCopy => {
                for (let i = 0; i < GameArea.numRows; i++) {
                    for (let k = 0; k < GameArea.numCols; k++) {
                        let neighbors = 0;
                        operations.forEach(([x, y]) => {
                            const newI = i + x;
                            const newK = k + y;
                            if (newI >= 0 && newI < GameArea.numRows && newK >= 0 && newK < GameArea.numCols) {
                                neighbors += g[newI][newK];
                            }
                        });

                        if (neighbors < 2 || neighbors > 3) {
                            gridCopy[i][k] = 0;
                        } else if (g[i][k] === 0 && neighbors === 3) {
                            gridCopy[i][k] = 1;
                        }
                    }
                }
            });
        });

        setTimeout(runSimulation, 100);
    }, []);

    const onStartHandler = () => {
        setRunning(!running);
        if (!running) {
            runningRef.current = true;
            runSimulation();
        }

    }

    const onRandomHandler = () => {
        const rows = [];
        for (let i = 0; i < GameArea.numRows; i++) {
            rows.push(
                Array.from(Array(GameArea.numCols), () => (Math.random() > 0.7 ? 1 : 0))
            );
        }

        setGrid(rows);
    }

    const onClearHandler = () => {
        setGrid(generateEmptyGrid())
    }


    return (
        <div className="container-lg pt-3 pb-3">

            <Button
                BtnName={running ? "Stop" : "Start"}
                onClickHandler={() => onStartHandler}
            />

            <Button
                BtnName='Random'
                onClickHandler={() => onRandomHandler}
            />

            <Button
                BtnName='Reload map'
                onClickHandler={() => onClearHandler}
            />

            <GameAreaChanger />

            <GameMap
                grid={grid}
                setGrid={setGrid}
            />

        </div>
    );
};

export default App;