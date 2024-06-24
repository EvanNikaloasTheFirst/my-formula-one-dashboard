import React, { useState } from 'react'
import DriverAnalysis from "../classes/DriverAnalysis.jsx"
import styles from "@/styles/Home.module.css";

function TopThree(DriversAnalysis) {
    var items = []
        for (let i = 0; i < DriversAnalysis.length ; i++){
        let driver = DriversAnalysis[i];
        items.push(
        <li key={i}>
            <p className={styles.topthree}>
           {i+1}.{driver.name} <br/>{driver.laptime}  
            </p>
        </li>
        )
    }
  return (
    <ul>
    {items}
    </ul>


  )
}

export default TopThree