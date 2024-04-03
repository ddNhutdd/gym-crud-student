import React from 'react';
import Form from './components/form';
import List from './components/list';

class App extends React.Component  {
    constructor(props) {
        super(props);
        this.state = {
           listStudent: []
        };
    }

    generateId = () => {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 100);
        return timestamp + random;
    }

    addStudent = (student) => {
        student.id = this.generateId();
        const newList = [student, ...this.state.listStudent]
        this.setState({
            listStudent: newList
        });
    }

    removeStudent = (id) => {
        const newArray = this.state.listStudent.filter(item => item.id !== id);
        this.setState({
            listStudent: newArray
        });
    }

    updateStudent = (student) => {
        const newList  = [...this.state.listStudent];
        let findStudent = newList.find(item => item.id === student.id);
        if(!findStudent) return;
        findStudent.name = student.name;
        findStudent.phone = student.phone;
        findStudent.email = student.email;
        this.setState(state => ({
            listStudent: newList
        }) )
    }

    render() {
        return (
            <div className='container mt-5'>
                <Form addStudent={this.addStudent} />
                <List 
                    list={this.state.listStudent}
                    remove={this.removeStudent} 
                    update={this.updateStudent}
                />
        </div>
        );
    }
}

export default App;