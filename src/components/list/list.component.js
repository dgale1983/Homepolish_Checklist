import React from 'react';
import Task from '../task/task.component';
import styled from 'styled-components'; 
import PropTypes from 'prop-types';

const List = (props) => {
    
    const { count, children, clicked, data, title, status } = props;

    return (
        <StyledContent>
            { children }
            <StylesUl>
                {
                    data.map((task, arrIndex) => {
                    return (
                        <Task key={task.id} 
                            clicked={ () => clicked(arrIndex) }
                            status={ status }
                            task={ task.description }
                            value={ task.id } />
                    
                        )
                    })
                }
            </StylesUl>    
    </StyledContent>
    )
};

const StyledContent = styled.div`
    padding: 1em 1.3em 0 1.3em;
    &:last-child {
        padding-bottom: 1em;
    }
`;

const StylesUl = styled.ul`
    padding-left: 0;
    padding-top: 0;
    margin-top: 0;
`;


List.propTypes = {
    count: PropTypes.string,
    clicked: PropTypes.func, 
    data: PropTypes.array,
    title: PropTypes.string,
    status: PropTypes.string,
};

export default List;