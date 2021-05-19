import React from 'react';
import '../InfoBox.css';
import {Card, CardContent, Typography} from '@material-ui/core'

function InfoBox({title, cases, total, isRed,isBlack, active ,...props}) {
    return (
        <Card className={`infoBox 
        ${active && 'infoBox--selected'} 
        ${isRed && 'infoBox--red'} 
        ${isBlack && 'infoBox--black'}
        `}
        onClick={props.onClick}
        >
            <CardContent>
                {/* Title */}
                <Typography className="infoBox_title" color="textSecondary">
                    {title}
                </Typography>

                {/* number of cases */}
                <h2 className={`infoBox_cases 
                ${!isBlack && !isRed && 'infoBox_cases--green'}
                `}>{cases}</h2>

                {/* total */}
                <Typography className="infoBox_total">
                    {total} Total
                </Typography>

            </CardContent>
        </Card>
    )
}

export default InfoBox
