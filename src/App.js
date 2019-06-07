import React, {Component} from 'react';
import './App.css';
import {getMatriXData, sendInitInfo} from "./components/raid-service";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {ErrorBoundary} from "./Error-boundary";
import {Block, Column, Flex} from "./Styled";

const style = {
    margin: {
        margin: "10px"
    },
    block: {}
}



class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            size: 5,
            number: 5,
            data: []
        }
    }

    componentWillMount() {
        // this.sendInit()
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
                    data: Math.floor(Math.random() * 10 % 2),
                    type: index % this.state.number !== index2 ? "NORMAL" : "CROSS"
                }
            })
        })
    }

    sendInit = (event) => {
        event && event.preventDefault();
        sendInitInfo(this.state).then(value => {
            console.log(value)

            const data = value.disks.map((a, index) => {
                return a.array.map((b, index2) => {
                    return {
                        data: b,
                        type: index !== index2 % this.state.number ? "NORMAL" : "CROSS"
                    }
                })
            })
            console.log(data)
            this.setState({
                data
            })
        })
    };

    setDiskSize = (event) => {
        event.persist();
        this.setState(() => ({
            size: event.target.value
        }), () => {
            this.sendInit()
        })
    };
    setDiskCount = (event) => {
        event.persist();
        this.setState(() => ({
            number: event.target.value
        }), () => {
            this.sendInit()
        })

    };
    getData = () => {
        getMatriXData().then(value => {
            this.setState(() => ({data: value.disks}))
            console.log(value)
        })
    };

    destruction = () => {
        let data = this.state.data;
        const random = Math.floor(Math.random() * this.state.number);
        data.forEach((el, index) => {
            el.forEach((el2, index2) => {
                if (index === random) {
                    if (el2.type === "CROSS")
                        el2.type = "TODELETE CROSS";
                    else
                        el2.type = "TODELETE"
                    el2.data = "X"
                }
            })
        })
        this.setState({
            data
        })
    };

    regenerate = () => {
        // this.sendInit();
        let data = this.state.data;
        data.forEach((el, index) => {
            el.forEach((el2, index2) => {
                if (el2.type === "TODELETE CROSS")
                    el2.type = "REGENERATED CROSS";
                else
                    el2.type = "REGENERATED";
            })
        })
        this.setState({
            data
        })
    };

    render() {
        const {data} = this.state;
        return (
            <div className="App">
                <ErrorBoundary>
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
                    <Flex>
                        {data && data.map(((array, index) => (
                            <Column key={index}>
                                {array && array.map(((value2, index2) => (
                                    <Block key={index2} className={value2.type}>{value2.data}</Block>
                                )))}
                            </Column>
                        )))}
                    </Flex>
                    <br/>
                    <Button variant={'contained'} onClick={this.destruction}>Siej znieszczenie</Button>
                    <Button variant={'contained'} onClick={this.regenerate}>Powstań z popiołów</Button>
                </ErrorBoundary>
            </div>
        );
    }
}

export default App;


