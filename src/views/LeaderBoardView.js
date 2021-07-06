import React from "react";

const LeaderBoardView = (props) => {
    let pos = 1;
    let rows = props.highScoreList.results.map(r => {
        let className = '';
        if (r.id === props.userId) {
            className = 'user-row-in-highscore';
        }
        let res = <tr className={className} key={pos}><td>#{pos}</td><td>{r.userName}</td><td>{r.score}</td></tr>;
        pos++;
        return res;
    });
    return <>
        <div>
            <h3>{props.highScoreList.name}</h3>
            <table className="highscoretable">
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Name</th>
                        <th>{props.highScoreList.unit}</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    </>;
}

export default LeaderBoardView;
