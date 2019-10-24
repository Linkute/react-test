import React, { Component } from 'react';
import './App.css';
import Taskfrom from './components/Taskform';
import Control from './components/Control';
import List from './components/List';
import _ from 'lodash';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isAddfrom: false,
      taskedit: null,
      keyword: '',
      filter: {
        name: '',
        status: -1,
      }
    }

  }
  componentDidMount() {
    if (localStorage.getItem('tasks')) {
      const tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks
      });
    }
  }
  onTouchadd = () => {
    if (this.state.isAddfrom && this.state.taskedit !== null) {
      this.setState({
        isAddfrom: true,
        taskedit: null
      });
    }
    this.setState({
      isAddfrom: !this.state.isAddfrom,
      taskedit: null
    });
  }
  onExit = () => {
    this.setState({
      isAddfrom: false
    });
  }
  s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  generateID() {
    // return `$(this.s4()-$(this.s4()))`
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-'
  }
  onGoio = (data) => {
    const { tasks } = this.state;
    if (data.id === '') {
      tasks.push({
        ...data,
        id: this.generateID()
      });
    } else {
      const index = this.findindex(data.id);
      tasks[index] = data;
    }
    // data.id = this.generateID()

    this.setState({
      tasks,
      taskedit: null
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }
  onUpdate = (id) => {
    var { tasks } = this.state;
    var index = this.findindex(id);
    // if(index !== 1){
    index !== 1 && (tasks[index].status = !tasks[index].status)
    // }
    this.setState({
      tasks
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  findindex = (id) => {
    var { tasks } = this.state;
    // var result = -1;
    return _.findIndex(tasks, (task) => task.id === id);

    // tasks.map((task, index) => {
    //   if (task.id === id) {
    //     result = index;
    //   }
    // });
    // return result;
  }
  onDelete = (id) => {
    var { tasks } = this.state;
    var index = this.findindex(id)
    if (index !== -1) {
      tasks.splice(index, 1);
      this.setState({
        tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
    this.onExit();
  }
  onEditfrom = (id) => {
    const { tasks } = this.state;
    const index = this.findindex(id)
    const taskedit = tasks[index]
    this.setState({
      taskedit
    })
    this.onShowform()
  }
  onShowform = () => {
    this.setState({
      isAddfrom: true
    });
  }
  onSearch = (keyword) => {
    console.log(keyword)
    this.setState({
      keyword
    })
  }
  onFilter = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus, 10);
    this.setState({
      filter: {
        name: filterName.toLowerCase(),
        status: filterStatus,
      }
    });
  }
  render() {
    var { tasks, isAddfrom, taskedit, filter, keyword } = this.state;
    if (filter) {
      if (filter.name) {
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        });
      }
      tasks = tasks.filter((task) => {
        if (filter.status === -1) {
          return task;
        } else {
          return task.status === (filter.status === 1 ? true : false)
        }
      })
    }
    if(keyword){
      tasks = tasks.filter ((task) => {
          return task.name.toLowerCase().indexOf(keyword) !== -1;;
      });
    }
    const elmTaskform = isAddfrom ?

      <Taskfrom
        onGoio={this.onGoio}
        onExit={this.onExit}
        task={taskedit}
      /> : '';
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className={isAddfrom ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
            {elmTaskform}
          </div>
          <div className={isAddfrom ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
            <button type="button" className="btn btn-primary ml-15" onClick={this.onTouchadd}>
              <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                      </button>
            {/* <button type="button" className="btn btn-danger ml-15" onClick={this.onGenerateData}>
                        Dữ liệu
                      </button> */}
            <Control onSearch={this.onSearch} />
            <List
              tasks={tasks}
              onUpdate={this.onUpdate}
              onDelete={this.onDelete}
              onEditform={this.onEditfrom}
              filterName={this.filterName}
              filterStatus={this.filterStatus}
              onFilter={this.onFilter}
            />
          </div>
        </div>
      </div>

    );
  }
}
export default App;

