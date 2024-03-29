import React, { Component } from 'react';
import './Taskform.css';


class Taskform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id : '',
            name : '',
            status : '',
        };
    }

    componentDidMount(){
        if(this.props.task){
            this.setState({
                id: this.props.task.id,
                name: this.props.task.name,
                status: this.props.task.status,
            })
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.task){
            this.setState({
                id: nextProps.task.id,
                name: nextProps.task.name,
                status: nextProps.task.status,
            })
        }else if(!nextProps.task){
            this.setState({
                id : '',
                name : '',
                status : '',
            })
        }
    }
    onExit = () => {
        this.props.onExit();
    }
    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        
        if(name === 'status'){
            value = target.value === 'true' ? true : false 
        }
        
        this.setState({
            [name] : value
        });
    }
    onSubmit = (event) => {
        event.preventDefault();
        this.props.onGoio(this.state)
        this.onCancel();
        this.onExit();
    }
    onCancel = () => {
        this.setState({
            name : '',
            status : false
        })
    }
    render() {
        const { id } = this.state;
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                    {id !== '' ? 'Sửa công việc' : 'Thêm công việc'}
                        <span
                            onClick={this.onExit}
                            className="fa fa-times-circle text-right"
                        ></span>
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={this.state.name}
                                onChange={this.onChange}
                            />
                        </div>
                        <label>Trạng Thái :</label>
                        <select
                            className="form-control"
                            required="required"
                            name="status"
                            value={this.state.status}
                            onChange={this.onChange}
                            >
                            
                            <option value={true}>Đã làm</option>
                            <option value={false}>Chưa làm</option>
                        </select>
                        <br />
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">Thêm</button>&nbsp;
                                    <button onClick={this.onCancel} type="submit" className="btn btn-danger">Hủy Bỏ</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
export default Taskform;
