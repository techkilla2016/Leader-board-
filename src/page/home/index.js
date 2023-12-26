import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";

// const city = [
//     {
//         value: 'ahamedabad',
//         display: 'ahamedabad'
//     },
//     {
//         value: 'Mumbai',
//         display: 'Mumbai'
//     },
//     {
//         value: 'Jaipur',
//         display: 'Jaipur'
//     },
//     {
//         value: 'Kota',
//         display: 'Kota'
//     },
// ]

const cities = ["North East ", "Bihar ", "Punjab & Haryana", "Rajasthan", "Ambala & Panipat", "Delhi", "North Bengal ", "South Bengal ", "Odisha ", "DT Kolkata ", "Ranchi ", "Indore ", "Jabalpur ", "North hills", "Western UP", "Central UP", "Eastern UP", "Ahmedabad", "Surat", "Ambala & Patiala", "Vijayawada", "Tirupathi", "Hyderabad ", "North Karnataka", "BANGALORE", "SOUTH KARNATAKA", "Kerala", "Mumbai 1", "Mumbai 2", "Kolhapur", "Nagpur", "Pune", "Aurangabad", "Madurai", "Trichy", "Chennai", "Coimbatore", "POC West", "POC South", "POC North", "POC East"];



const Home = () => {
    const navigate = useNavigate()
    const [point, setPoint] = useState(0)
    const [area, setArea] = useState("North East")

    // select area 
    const handleSelect = ({ target }) => {
        console.log(target)
        setArea(target.value)
       
    }

    const handleChange = (opt) => {
        if (opt == '-') {
            setPoint(point - 10)
        }else{
            setPoint(point + 10)
        }
    }

    const handleSubmit = () => {
       // navigate('/dashbord')
        // console.log({
        //     point,
        //     area
        // })

        if(window.require)
        {
            const { ipcRenderer } = window.require('electron');
            ipcRenderer.send('update_score', {area,point});

            ipcRenderer.on('on_score_update', (event, arg) => {
                
                 navigate("/dashbord",{state: {
                    data:arg
                  }});
            });

        }

        // navigate("/dashboard");



    }
    return (
        <div className="main-Leaderboard-section">
            <div className="main-area">
                <h3>Select Area</h3>
                <select name="" id="selectOption" value={area} onChange={handleSelect}>
                    {
                        cities?.map((item, keys) => <option value={item} key={keys}>{item}</option>)
                    }
                </select>
                <h3 className="addHeading">ADD POINTS</h3>
                <div className="inputGroup">
                    <button className='act-btn' onClick={() => handleChange('-')}>
                        <FaMinus />
                    </button>
                    <input type="text" id="point" value={point} readOnly placeholder="0" />
                    <button className='act-btn' onClick={() => handleChange('+')}>
                        <FaPlus />
                    </button>
                </div>
                <button id="submitBtn" onClick={handleSubmit}>
                    SUBMIT
                </button>
            </div>
        </div>
    )
}

export default Home
