import React from 'react';
import PropTypes from 'prop-types';

const LeaderBoardView = (props) => {
    if (!props.highScoreList) return <></>;
    let pos = 1;
    let rows = props.highScoreList.results.map(r => {
        let className = '';
        if (props.userId && r.id === props.userId) {
            className = 'user-row-in-highscore';
        }
        let res = <tr className={className} key={pos}>
            <td>#{pos}</td
            ><td>{r.userName}</td>
            <td>{(new Date(r.utcDateTime)).toLocaleDateString()}</td>
            <td>{r.score}</td></tr>;
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
                        <th>Date</th>
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

LeaderBoardView.propTypes = {
    highScoreList: PropTypes.object,
    name: PropTypes.string,
    unit: PropTypes.string,
    userId: PropTypes.string
};

export default LeaderBoardView;
