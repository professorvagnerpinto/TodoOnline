import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableHighlight, Button} from 'react-native';

export default class Item extends Component{

    constructor(props){
        super(props);
        this.state = {
            done:(this.props.data.done=='1') ? styles.done : styles.undone
        };
        this.marcar = this.marcar.bind(this);
        this.excluir = this.excluir.bind(this);
    }

    render(){
        return(
           <View style={styles.area}>
               <TouchableHighlight style={[styles.marcarArea, this.state.done]} onPress={this.marcar}>
                   <View>

                   </View>
               </TouchableHighlight>
               <Text>{this.props.data.item}</Text>
               <Button style={styles.botao} title="X" onPress={this.excluir} />
           </View>
        );
    }

    marcar(){
        let s = this.state;
        let done = 'sim';
        if(s.done == styles.undone){
            s.done = styles.done;
            done = 'sim';
        }else{
            s.done = styles.undone;
            done = 'nao';
        }
        console.log("PUT " + this.props.url+'/'+this.props.data.id);
        fetch(this.props.url+'/'+this.props.data.id, {
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                done:done
            })
        })
            .then((r)=>r.json())
            .then((json)=>{});

        this.setState(s);
    }

    excluir(){
        let s = this.state;
        console.log("DELETE " + this.props.url+'/'+this.props.data.id);
        fetch(this.props.url+'/'+this.props.data.id, {
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
            .then((r)=>r.json())
            .then((json)=>{
                alert("Item excluído com sucesso.");
                this.props.loadFunction();
            });

        this.setState(s);
    }
}

const styles = StyleSheet.create({
    area:{
        paddingTop:10,
        paddingBottom:10,
        borderBottomWidth: 1,
        borderColor:'#CCCCCC',
        flex:1,
        flexDirection:'row',
        alignItems:'center'
    },
    marcarArea:{
        width:40,
        height:40,
        marginRight:10,
        marginLeft:10
    },
    undone:{
        backgroundColor:'#CCCCCC'
    },
    done:{
        backgroundColor:'#00FF00'
    },
    botao:{
        width:40,
        height:40,
        marginLeft:10
    }
});
