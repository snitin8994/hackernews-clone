import React from "react";
import HackernewsItem from "./"

function HackernewsList(props) {
    return (
        {props.storyItems.map((item,index)=> {
            return (
                <HackernewsItem  key={index}/>
            )

        })}

    )

}

export default HackernewsList;