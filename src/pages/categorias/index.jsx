import React, { Component } from 'react';
import Menu from '../../components/menu';
import Jumbotron from '../../components/jumbotron';

class Categorias extends Component {

    constructor(){
        super();

        this.state = {
            url : 'https://5f7f4f9bd6aabe00166f0238.mockapi.io/api/categorias',
            id : '',
            nome : '',
            categorias : []
        }
    }

    componentDidMount(){
        this.listar();
    }

    listar(){
        fetch(this.state.url)
            .then(response => response.json())
            .then(dados => {
                
                this.setState({categorias : dados});

                this.novaCategoria();
                console.log(this.state.categorias);

                
            })
            .catch(err => console.error(err));
    }

    remover(event){
        event.preventDefault();
        
        console.log(event.target.value);

            fetch(this.state.url + '/' + event.target.value,{
                method : 'DELETE'
            })
            .then(response => response.json())
            .then(dados => {
                alert('Categoria removida');
    
                this.listar();
            })
    }

    editar(event){
        event.preventDefault();

        fetch(this.state.url + '/' + event.target.value, {
            method : 'GET'
        })
        .then(response => response.json())
        .then(dado => {
            console.log(dado);
            this.setState({id : dado.id});
            this.setState({nome : dado.nome});

        })
    }

    salvar(event) {
        event.preventDefault();

            const categoria = {
                nome : this.state.nome,
            }

            let method = (this.state.id === "" ? 'POST' : 'PUT');
            let urlRequest = (this.state.id === "" ? this.state.url :  this.state.url + '/' + this.state.id);

            fetch(urlRequest, {
                method : method,
                body : JSON.stringify(categoria),
                headers : {
                    'content-type' : 'application/json'
                }
            })
            .then(response => response.json())
            .then(dados => {
                alert('Categoria salva');

                this.listar();
            })
            .catch(err => console.error(err))
    }

    setNome(event){
        console.log(event.target.value);
        this.setState({nome : event.target.value});
    }

    novaCategoria(){

        this.setState({id : '', nome : ''})
    }

    render() {
        return (
            <div>
                <Menu />
                <Jumbotron titulo='Categorias' descricao='Gerencie suas categorias' />
                <div className="container">
                    <div className="bd-example">
                        <form id="formCategoria" onSubmit={this.salvar.bind(this)}>
                            <div className="form-group">
                                <label htmlFor="nome">Nome</label>
                                <input type="text" className="form-control" value={this.state.nome} onChange={this.setNome.bind(this)} id="nome" aria-describedby="nome" placeholder="Informe o Nome" />
                            </div>
                            <button type="button" onClick={this.novaCategoria.bind(this)} className="btn btn-secondary">Cancelar</button>
                            <button type="submit" className="btn btn-success">Salvar</button>
                        </form>

                        <table className="table" style={{marginTop : '40px'}}>
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Ações</th>
                                <th scope="col"><button type="reset" className="btn btn-primary" onClick={this.novaCategoria.bind(this)}>Nova Categoria</button></th>
                            </tr>
                            </thead>
                            <tbody id="tabela-lista-corpo">
                                {
                                    this.state.categorias.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.id}</td>
                                                <td>{item.nome}</td>
                                                <td>
                                                    <button type='button' value={item.id} onClick={this.remover.bind(this)} className='btn btn-danger'>Remover</button>
                                                    <button type='button' value={item.id} onClick={this.editar.bind(this)} className='btn btn-warning'>Editar</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default Categorias;