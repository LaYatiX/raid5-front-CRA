import React, {Component} from 'react';
import './App.css';
import {getMatrixData, getRegenerateMatrixs, sendFile, sendInitInfo} from "./components/raid-service";
import TextField from '@material-ui/core/TextField';

import {ErrorBoundary} from "./Error-boundary";
import {Block, ButtonMargin, Column, Flex} from "./Styled";
import SimpleSnackbar from "./components/MySnackbarContentWrapper";

const style = {
    margin: {
        margin: "10px"
    },
    button: {
        margin: "3px",
    },
    block: {},
    input: {
        display: 'none',
    },
};

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ready: true,
            size: 5,
            snackOpen: false,
            number: 5,
            random: null,
            data: [],
            regenerateData: [[]]
        }
    }


    componentWillMount() {
        this.sendInit()
        // this.setState({
        //     data: this.random()
        // })
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
            this.mapDataFromServer(value)
        })
    };

    mapDataFromServer = (value) => {
        const data = value.disks.map((a, index) => {
            return a.array.map((b, index2) => {
                return {
                    data: b,
                    type: index !== index2 % this.state.number ? "NORMAL" : "CROSS"
                }
            })
        });
        console.log(data);
        this.setState({
            data
        })
    }


    sendFile = (event) => {
        event && event.preventDefault();
        const input = document.getElementById('raised-button-file');
        sendFile(input.files[0]).then((value) => {
            this.mapDataFromServer(value);
        })
    };

    setDiskSize = (event) => {
        const val = +event.target.value;
        if (val > 100 || val < 1 || this.state.number > val) return false;
        event.persist();
        this.setState(() => ({
            size: +event.target.value
        }), () => {
            this.sendInit()
        })
    };
    setDiskCount = (event) => {
        const val = +event.target.value;
        if (val > 100 || val < 3 || this.state.size < val) return false;
        event.persist();
        this.setState(() => ({
            number: +event.target.value
        }), () => {
            this.sendInit()
        })

    };
    // getData = () => {
    //     getMatriXData().then(value => {
    //         this.setState(() => ({data: value.disks}))
    //         console.log(value)
    //     })
    // };

    destruction = () => {
        let {data, ready} = this.state;
        if (!ready) {
            this.openSnack();
            return
        }
        const random = Math.floor(Math.random() * this.state.number);
        this.setState({ready: false});
        getRegenerateMatrixs(random).then(value => {
            const mapRegenerateData = value.map((matrix, mxIndex) => {
                return matrix.disks.map((disk, index) => {
                    return disk.array.map((a, index2) => {
                        console.log(mxIndex, index, index2);
                        let type = "NORMAL";
                        if (mxIndex === index2 && index === random) type = "GETREGENERATED";
                        else if (a === 7) type = "TODELETE";
                        else if (index === index2 % this.state.number) type = "CROSS";
                        return {
                            data: a === 7 ? "X" : a,
                            type
                        }
                    });
                })
            });

            this.setState(() => ({regenerateData: mapRegenerateData, random}))
        });

        data.forEach((el, index) => {
            el.forEach((el2, index2) => {
                if (index === random) {
                    if (el2.type === "CROSS")
                        el2.type = "CROSS TODELETE";
                    else
                        el2.type = "TODELETE";
                    el2.data = "X"
                }
            })
        });


        this.setState({
            data
        })
    };

    download = () => {
        getMatrixData();
    };
    openSnack = () => {
        this.setState({snackOpen: true});
    };
    regenerate = () => {
        let i = 0;
        const {regenerateData} = this.state;
        const interval = setInterval(() => {
            if (i === regenerateData.length - 1) {
                clearInterval(interval);
                this.setState({ready: true});
            }
            const data = regenerateData[i++].map((el, index) => {
                return el.map((el2, index2) => {
                    if (el2.type === "GETREGENERATED")
                        el2.type = "REGENERATED";
                    return el2;
                })
            });
            console.log(data, "new")

            this.setState({
                data
            })
        }, 1000);
        //
        // regenerateData.forEach(data => {
        //     data.forEach((el, index) => {
        //         el.forEach((el2, index2) => {
        //             if (el2.type === "CROSS TODELETE")
        //                 el2.type = "REGENERATED CROSS";
        //             else if (el2.type === "TODELETE")
        //                 el2.type = "REGENERATED";
        //         })
        //     })
        // })

    };

    render() {
        const {data, snackOpen} = this.state;
        const handleClose = () => {
            this.setState({snackOpen: false});
        };
        return (
            <div className="App">
                <ErrorBoundary>
                    <form style={{display: "block"}}>
                        <TextField style={style.margin} label={'Rozmiar dysku'} type={'number'} max={100} min={1}
                                   value={this.state.size} onChange={this.setDiskSize}/>
                        <br/>
                        <TextField style={style.margin} label={'Ilość dysków'} type={'number'} max={10} min={3}
                                   value={this.state.number} onChange={this.setDiskCount}/>
                        <br/>
                        <ButtonMargin variant={'contained'} onClick={this.sendInit}>Inicjuj</ButtonMargin>
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
                    <ButtonMargin variant={'contained'} onClick={this.destruction}>Zniszcz dysk</ButtonMargin>
                    <ButtonMargin variant={'contained'} onClick={this.regenerate}>Zregeneruj dysk</ButtonMargin>
                    <hr/>
                    <ButtonMargin variant={'contained'} onClick={this.download}><a
                        href={'http://localhost:8080/api/save'} rel="noopener noreferrer" target="_blank"> Pobierz
                        macierz</a></ButtonMargin>
                    <input
                        accept="text/plain"
                        className={style.input}
                        style={{display: 'none'}}
                        id="raised-button-file"
                        multiple
                        type="file"
                        onChange={this.sendFile}
                    />
                    <label htmlFor="raised-button-file">
                        <ButtonMargin variant="contained" component="span" className={style.button}>
                            Wyślij macierz
                        </ButtonMargin>
                    </label>
                    <SimpleSnackbar snackOpen={snackOpen} close={handleClose}/>
                </ErrorBoundary>
            </div>
        );
    }
}

export default App;


