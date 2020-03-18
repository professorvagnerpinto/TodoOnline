/**
 * Vídeo #3, #4, #5 e #6: App TodoOnline (API REST) - Módulo 12 - Requisições, Web Services e Banco de Dados - B7Web
 * Obs.: Verbos GET, POST, PUT e DELETE de uma API na web (api fornecida pela B7Web).
 * API em: 'https://b7web.com.br/todo/create'
 * by: Vagner Pinto
 */

import React, {Component} from 'react';
import {StyleSheet, View, FlatList, Text, TextInput, Button} from 'react-native';
import Item from './src/Item'

export default class TodoOnline extends Component{

    URL_BASE = 'https://b7web.com.br/todo/61988';

    constructor(props){
        super(props);
        this.state={
            lista:[],
            input:''
        };
        this.addButton = this.addButton.bind(this);
        this.loadLista = this.loadLista.bind(this);

        this.loadLista();
    }

    loadLista(){
        //GET
        fetch(this.URL_BASE)
            .then((r)=>r.json())
            .then((json)=>{
                let s = this.state;
                s.lista = json.todo;
                this.setState(s);
                console.log(json.todo);
            });
    }

    addButton(){
        let texto = this.state.input;
        let s = this.state;
        s.input = '';
        this.setState(s);
        console.log("POST " + this.URL_BASE);
        fetch(this.URL_BASE, {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                item:texto
            })
        })
            .then((r)=>r.json())
            .then((json)=>{
                alert('Item inserido com sucesso');
                this.loadLista();
            });
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.addArea}>
                    <Text style={styles.addTxt}>Adicione uma nova tarefa</Text>
                    <TextInput style={styles.input} onChangeText={(text)=>{
                        let s = this.state;
                        s.input = text;
                        this.setState(s);
                    }} value={this.state.input} />
                    <Button title="Adcionar" onPress={this.addButton} />
                </View>
                <FlatList
                    data={this.state.lista}
                    renderItem={({item})=><Item data={item} url={this.URL_BASE} loadFunction={this.loadLista} />}
                    keyExtractor={(item, index)=>item.id}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:20
    },
    addArea:{
        marginBottom:20,
        backgroundColor:'#DDDDDD'
    },
    addTxt:{
        fontSize:16,
        textAlign:'center',
        marginBottom:10,
        marginTop:10
    },
    input:{
        height:40,
        backgroundColor: '#CCCCCC',
        marginLeft:20,
        marginRight:20,
        marginBottom:10,
        paddingLeft:10,
        paddingRight:10
    }
});
