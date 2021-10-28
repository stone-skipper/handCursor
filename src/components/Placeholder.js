import React from "react";
import styled from "styled-components";

const Placeholder = (props) => {

    const { content } = props;

    return (
        < PlaceholderWrapper >
            {content}
        </PlaceholderWrapper >
    )


};

const PlaceholderWrapper = styled.div`
text-align:center;
width:100%;
color: #0016FF;
font-family: 'Montserrat', sans-serif;
position:fixed;
top: 55%;
`;

export default Placeholder;
