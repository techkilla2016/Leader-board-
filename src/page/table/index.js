import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'



var data = [
   
]
const Table = () => {
    const { state } = useLocation();
    const router = useNavigate()

    let points = JSON.parse(state.data);

    // console.log(data)

    let sortable = [];
    let index = 1;
     for (var pnt in points) {
       sortable.push({position:index,area:pnt,point:points[pnt]});
       index++;
      }

sortable.sort(function(a, b) {
    return b.point - a.point;
});

data = sortable;

    const handleAddPoint = () => {
        router('/')
    }

    return (
        <div className="main-Leaderboard-section">
            <div className="main-area">
                <div className="head">
                    <img src="/assets/logo.png" alt="" />
                    <h2>LEADERBOARD</h2>
                </div>

                <div className="table">
                    <div className="headings">
                        <div className="th">POSITION</div>
                        <div className="th">AREA</div>
                        <div className="th">POINT</div>
                    </div>
                    <div className="rows">
                    <div className="rowsinner">
                    {
                        data?.map((item, keys) => {
                            return (
                                <div className="tr" key={keys}>
                                    <div className="f-td td">
                                        <img src="/assets/play.png" alt="" />
                                        <span>{item?.position}</span>
                                    </div>
                                    <div className="td">{item?.area}</div>
                                    <div className="td">{item?.point}</div>
                                </div>
                            )
                        })
                    }
                       </div>
                    </div>
                </div>
                <button id="submitBtn" onClick={handleAddPoint}>
                    ADD POINTS
                </button>
            </div>
        </div>
    )
}

export default Table