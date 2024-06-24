import React, { useState, useEffect} from 'react'
import styles from "@/styles/Home.module.css";

function ContructorsTable(DriversAnalysis) {

    var [DriversTable, setDriversTable] = useState([])
    var [points,setPoints] = useState([])

    const setTable = (tempArray) => {
        var tempArr = []
        for (let i =0; i < tempArray.length; i++){
            tempArr.push(tempArray[i])
        }

        return tempArr;
    }
    
    useEffect(() =>{
        fetch("http://localhost:8080/api/home").then(
            response => response.json()).then(
                data => {
                    setDriversTable(setTable(data.DRIVERS))
                    // setPoints(setTable(data.points))
                }
            )
    },[])

    var items = []
        for (let i = 0; i < DriversTable.length; i++){
        let driver = DriversTable[i];
        // let pointsVal = points[i]
        items.push(
        <li key={i}>

            <div className={styles.constructorBlock}>

           <p>
            {i+1} {driver} {}
            </p>
            </div>

        </li>
        )
    }
  return (
    <ul className={styles.constructors}>
    {items}
    </ul>


  )
}


export default ContructorsTable