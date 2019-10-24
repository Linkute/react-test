import React, { Component } from 'react';

class Listit extends Component {
    onUpdate = () => {
        this.props.onUpdate(this.props.task.id)
    }
    onDelete = () => {
        this.props.onDelete(this.props.task.id)
    }
    onEditform = () => {
        this.props.onEditform(this.props.task.id)
    }
    render() {
        var { task, index } = this.props;
        
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td className="text-center">
                    <span className={task.status === false ? "label label-danger" : "label label-success"}
                        onClick={this.onUpdate}
                    >
                        {task.status === false ? "Chưa làm" : "Đã làm"}
                    </span>
                </td>
                <td className="text-center">
                    <button type="button" className="btn btn-warning"
                    onClick={this.onEditform}>
                    <span className="fa fa-pencil mr-5" ></span>
                    Sửa
                    </button>
                    &nbsp;
                    <button 
                    type="button" 
                    className="btn btn-danger"
                    onClick={ this.onDelete }>
                    <span className="fa fa-trash mr-5"></span>
                    Xóa
                    </button>
                </td>
            </tr>
        )
    }
}
export default Listit;