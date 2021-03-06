import React from 'react';
import List from '../components/list/list.component';
import ListTitle from '../components/list/listTitle.component';
import styled from 'styled-components'; 
import Toast from '../components/toast/toast.component';
import ErrorBoundary from './errorBoundary.container';
import * as colors from '../styles/colors';

class Tasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clickedTask: '',
            complete: [],
            not_started: [],
            tasks: this.props.tasks,
            toasts: [],
            toggledTodo: false,
            showToast: false,
            toastMounted: false
        }
    }

    componentWillMount() {
        this.state.tasks.filter(task => {
            if (task.status === 'complete') {
                this.state.complete.push(task);
                return this.state.complete;
            } else {
                this.state.not_started.push(task);
                return this.state.not_started;
            }
        })
    }

    handleCompleteStatus = (e) => {
        this.setState(state => {
            state.toggledTodo =  !this.state.toggledTodo;
            state.toastMounted = true;

            const tasks = state.not_started.map((task, index) => {
                if (index === e) {
                    task.status = 'complete'
                    state.complete.unshift(task);
                    state.not_started.splice((index, e), 1)
                    state.clickedTask = `Completed  "${task.description}."`
                    state.showToast = true;
                    return task;
                }
                else return task;
            });
            return tasks;
        });
        this.handleTime();
    }

    handleRevertStatus = (e) => {
        this.setState(state => {
            state.toastMounted = true;
            const tasks = state.complete.map((task, index) => {
                if (index === e) {
                    task.status = 'not_started'
                    state.not_started.unshift(task);
                    state.complete.splice((index, e), 1)
                    state.clickedTask = `Not Started  "${task.description}."`
                    state.showToast = true;
                    return task;
                }
                else return task;
            });
            return tasks;
        });
        this.handleTime();
    }

    handleTime = () => {
        setTimeout(() => {
            this.setState({
                toastMounted: false
            })
        }, 1000);
    }

    render() {
        return (
            <ErrorBoundary>
                <StyledWrapper>
                    { this.state.showToast 
                        ? 
                        <Toast className="toast" 
                            task={this.state.clickedTask} 
                            showToast={this.state.showToast}  
                            toastMounted={this.state.toastMounted}/>
                        : '' 
                    }
                    <List 
                        clicked={this.handleCompleteStatus} 
                        data={this.state.not_started}  
                        status='not_started' >
                        <ListTitle>
                            {`
                                ${this.state.not_started.length !== 0 
                                ? 'To do' 
                                : 'No Todo\'s'}`
                            }
                        </ListTitle>

                    </List>

                    <List 
                        clicked={this.handleRevertStatus}
                        data={this.state.complete} 
                        status='complete'>

                        <ListTitle color='grey'>
                            {` ${this.state.not_started.length > 0 
                                ? this.state.complete.length + ' Tasks Completed'
                                : '🎉 All Tasks Completed!'} 
                            `}
                        </ListTitle>

                    </List>
                </StyledWrapper>
            </ErrorBoundary>
        );
    }
}

const StyledWrapper = styled.div`
    background: ${colors.THEME_LIGHT_GREY};
    max-width: 510px;
    margin: 0 auto;
    width: 100%;
    position: relative;
`;

export default Tasks;