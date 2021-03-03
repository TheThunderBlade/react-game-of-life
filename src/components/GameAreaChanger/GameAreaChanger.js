import React from 'react'
import Button from "../button/BtnComponent";
import {GameArea} from '../../config/GameConfig'


const GameAreaChanger = () => {

    const onChangeArea = () => {
        const areaNum = document.getElementById('AreaNum').value


        GameArea.numRows = +areaNum
        GameArea.numCols = +areaNum
        GameArea.isChange = true
    }

    return (
        <div>
            <input id="AreaNum"
                   placeholder="Enter row/cols number"
                   className="w-25"
                   type="number"
                   min='10' max='100'
            />


            <Button
                BtnName="Change game area"
                onClickHandler={() => onChangeArea}
            />
        </div>
    )
}

export default GameAreaChanger