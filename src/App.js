import React, {Component} from 'react';
import './App.css';
import {getMatriXData, sendInitInfo} from "./components/raid-service";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

const style = {
    margin: {
        margin: "10px"
    },
    block: {

    }
}

const Block = styled.span`
    padding: 5px;
    margin: 5px;
    display: inline-flex;
    border-radius: 100%;
    transition: all 300ms ease-in-out;
`;

// const BlockCross = styled(Block)`
//     background-color: #ffe000;
// `;

class App extends Component {

    constructor(props) {
        super(props);
        // this.setDiskSize = this.setDiskSize.bind(this);
        // this.setDiskCount = this.setDiskCount.bind(this);
        // this.getData();
        this.state = {
            size: 10,
            number: 10,
            data: []
        }
    }

    componentWillMount() {
        this.setState({
            data: this.random()
        })
    }

    random = () => {
        const sizeX = +this.state.size;
        const sizeY = +this.state.number;
        const array = Array.apply(null, Array(sizeX))
        return array.map((a, index) => {
            const a2 = Array.apply(null, Array(sizeY));
            return a2.map((b, index2) => {
                return {
                    data: Math.floor(Math.random()* 10 % 2),
                    type: index%this.state.number !== index2 ? "NORMAL" : "CROSS"
                }
            })
        })
    }

    sendInit = (event) => {
        event.preventDefault();
        sendInitInfo(this.state);
    };

    setDiskSize = (event) => {
        event.persist();
        this.setState(()=>({
            size: event.target.value
        }), ()=>{
            this.setState({
                data: this.random()
            })
        })
    };
    setDiskCount = (event) => {
        event.persist();
        this.setState(()=>({
            number: event.target.value
        }), ()=>{
            this.setState({
                data: this.random()
            })
        })

    };
    getData = () => {
        getMatriXData().then(value => {
            this.setState(() => ({data: value}))
        })
    };

    destruction = ()=>{
        let data = this.state.data;
        const random = Math.floor(Math.random() * this.state.number +1);
        data.forEach(()=>{

        })
    };

    render() {
        const {data} = this.state;
        return (
            <div className="App">
                <form style={{display: "block"}}>
                    <TextField style={style.margin} label={'Rozmiar dysku'} type={'number'}
                               value={this.state.size} onChange={this.setDiskSize}/>
                    <br/>
                    <TextField style={style.margin} label={'Ilość dysków'} type={'number'}
                               value={this.state.number} onChange={this.setDiskCount}/>
                    <br/>
                    <Button variant={'contained'} onClick={this.sendInit}>Inicjuj</Button>
                </form>
                <br/>
                {data && data.map(((value, index) => (
                    <div key={index}>
                        {value && value.map(((value2, index2) => (
                            <Block key={index2} className={value2.type}>{value2.data}</Block>
                        )))}
                        <br/>
                    </div>
                )))}
                <br/>
                <Button variant={'contained'} onClick={this.destruction}>Siej znieszczenie</Button>
            </div>
        );
    }
}

export default App;
