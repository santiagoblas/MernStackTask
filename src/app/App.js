import React, {Component} from 'react';

class App extends Component {
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

                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit="">
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input type="text" placeholder="Título"/>
                                            </div>
                                        </div>    
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea className="materialize-textarea" placeholder="Descripción"></textarea>
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

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;