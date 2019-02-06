import React, {Component} from 'react';

class App extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        };

        this.login = this.login.bind(this);
    }

    login(e) {
        e.preventDefault
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
                        <div className="col s6 offset-s3">
                            <div class="card blue-grey darken-1">
                                <div class="card-content white-text">
                                    <span class="card-title">Iniciar Sesión</span>
                                    <form onSubmit={this.login}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <i class="material-icons prefix">email</i>
                                                <input id="icon_prefix" type="text" class="validate" onChange={this.handleChange}/>
                                                <label for="icon_prefix">E-mail</label>
                                            </div>
                                        </div>    
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <i class="material-icons prefix">lock</i>
                                                <input id="icon_prefix" type="password" class="validate" onChange={this.handleChange}/>
                                                <label for="icon_prefix">Password</label>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn pink darken-2">
                                            Enviar
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;