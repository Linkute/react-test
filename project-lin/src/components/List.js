import React, { Component } from 'react';
import Listit from './Listit';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName : '',
            filterStatus : -1
        };
    }
    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.props.onFilter(name === 'filterName' ? value : this.state.filterName, name === 'filterStatus' ? value : this.state.filterStatus);
        this.setState({
            [name] : value
        });
    }
    render() {
        const { tasks } = this.props;
        const { filterName, filterStatus } = this.state;
        const elmTasks = tasks.map((t, index) => {
            return (<Listit 
                key={t.id} 
                index={index} 
                task={t} 
                onUpdate={this.props.onUpdate}    
                onDelete={this.props.onDelete}
                onEditform={this.props.onEditform}
            />)
            
        });
        return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <table className="table table-bordered table-hover mt-5">
                    <thead>
                        <tr>
                            <th className="text-center">STT</th>
                            <th className="text-center">Tên</th>
                            <th className="text-center">Trạng Thái</th>
                            <th className="text-center">Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>
                                <input type="text" className="form-control" name="filterName" value={ filterName } onChange={ this.onChange }  />
                            </td>
                            <td>
                                <select className="form-control" name="filterStatus" value={ filterStatus } onChange={ this.onChange } >
                                    <option value="-1">Tất Cả</option>
                                    <option value="0">Chưa làm</option>
                                    <option value="1">Đã làm</option>
                                </select>
                            </td>
                            <td></td>
                        </tr>
                        { elmTasks }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default List;