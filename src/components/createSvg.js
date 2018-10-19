/*eslint-disable*/
import React from 'react';

export default getMarkup => props => {
    const markup = getMarkup(props);

    return (
        <div {...props} style={{lineHeight: 0, ...props.style}} dangerouslySetInnerHTML={{__html: markup}}/>
    );
};
