import React, { useState } from "react";
import "./AppTest.css"

import SquareTest from './boardtest/SquareTest';


function AppTest() {

    const [add, setAdd] = useState(0)

    function handleClick() {
        console.log("clicked!")
        setAdd(add + 1)
    }

    const board = [
        [0, 1, 0, 1, 0, 1, 0, 1],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [0, 1, 0, 1, 0, 1, 0, 1],
    ]


    return (

            <div className='grid'>
                <div className='grid2'>
                    <p>Number {add}</p>
                </div>
                {board.map((e, j) => {
                    return (

                        <div> {e, j}
                            {e.map((e) => {
                                let type;
                                e % 2 === 0
                                    ? j % 2 === 0
                                        ? (type = "square light")
                                        : (type = "square dark")
                                    : j % 2 === 1
                                        ? (type = "square light")
                                        : (type = "square dark");

                                return (
                                    <SquareTest type1={type}
                                        onClick1={handleClick}
                                    />
                                )
                            })}
                        </div>
                    )
                })}

            </div>
    )

    // {board.map((row, index1) => (
    //     <Row key={row.id}>
    //       {row.column.map((field, index2) => (
    //         <Field
    //           key={field.id}
    //           isRowEven={index1 % 2 === 0}
    //           size={FIELD_SIZE}
    //         />)
    //       )}
    //     </Row>
    //     )
    //   )}
}

export default AppTest;