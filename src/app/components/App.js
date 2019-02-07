import React, {Component} from 'react';

class App extends Component {

    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            tasks: [],
            _id: ''
        };

        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getTasks = this.getTasks.bind(this);
    }

    addTask(e) {
        if(this.state._id)
        {
            fetch(`/api/tasks/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    M.toast({html: 'Tarea Modificada'});
                    this.setState({title:'',description:'', _id: ''});
                    this.getTasks();
                })
                .catch(err => console.error(err));
            e.preventDefault();
        } else {
            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    M.toast({html: 'Tarea Guardada'});
                    this.setState({title:'',description:''});
                    this.getTasks();
                })
                .catch(err => console.error(err));
            e.preventDefault();
        }
    }

    editTask(id) {
        fetch(`/api/tasks/${id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    title: data.title, 
                    description: data.description,
                    _id: data._id
                });
            });
    }

    deleteTask(id) {
        if(confirm('¿Está seguro de querer eliminar esta tarea?'))
        {
            fetch(`/api/tasks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    M.toast({html: 'Tarea Eliminada'});
                    this.getTasks();
                })
                .catch(err => console.error(err));
        }
    }

    componentDidMount() {
        this.getTasks();
    }

    getTasks() {
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => {
                this.setState({tasks: data});
            });
    }

    handleChange(e) {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });
    }

    render() {
        return ( 
            <div>
                <nav className="pink darken-2">
                    <div className="container">
                        <a className="brand-logo" href="/">
                            MERN Stack
                        </a>
                    </div>
                </nav>

                <div className="container" style={{'margin-top': '15px'}}>
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input type="text" placeholder="Título" name="title" onChange={this.handleChange} value={this.state.title}/>
                                            </div>
                                        </div>    
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea className="materialize-textarea" placeholder="Descripción" name="description" onChange={this.handleChange} value={this.state.description}></textarea>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn pink darken-2">
                                            Enviar
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Título</th>
                                        <th>Descripción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task => {
                                            return(
                                                <tr key={task._id}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                        <button className="btn pink darken-1" onClick={() => this.editTask(task._id)}>
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                        <button style={{'margin-left':'4px'}} className="btn pink darken-4" onClick={() => this.deleteTask(task._id)}>
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;