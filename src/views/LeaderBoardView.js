import React from 'react';
import PropTypes from 'prop-types';

const LeaderBoardView = (props) => {
    if (!props.highScoreList) return <></>;
    const rows = props.highScoreList.results.map((r, idx) => {
        let className = '';
        if (props.userId && r.id === props.userId) {
            className = 'user-row-in-highscore';
        }
        return <tr className={className} key={idx + 1}>
            <td>#{idx + 1}</td
            ><td>{r.userName}</td>
            <td className='date-column'>{(new Date(r.utcDateTime)).toLocaleDateString()}</td>
            <td>{r.score}</td></tr>;
    });
    return <>
        <div>
            <h3>{props.highScoreList.name}</h3>
            <table className="highscoretable">
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Name</th>
                        <th className='date-column'>Date</th>
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
