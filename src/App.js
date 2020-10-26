import './App.css';
import React from 'react';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: '', A: []};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTact = this.handleTact.bind(this);
    }

    Rule(a,  b,  c) {
    if (a === 1 && b === 1 && c === 1) {return 1;}
        if (a === 1 && b === 1 && c === 0) {return 0;}
        if (a === 1 && b === 0 && c === 1) {return 1;}
        if (a === 1 && b === 0 && c === 0) {return 1;}
        if (a === 0 && b === 1 && c === 1) {return 1;}
        if (a === 0 && b === 1 && c === 0) {return 0;}
        if (a === 0 && b === 0 && c === 1) {return 0;}
        if (a === 0 && b === 0 && c === 0) {return 0;}
        return 0;
    }

    handleTact(event) {
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        let A = this.state.A;
        let B = [];
        for (let i = 0; i < this.state.value; ++i) {
            let j;
            if (i === 0) {
                j = this.state.value - 1;
            } else {
                j = i - 1;
            }
            let k
            if (i === (this.state.value - 1)) {
                k = 0;
            } else {
              k = i + 1;
            }
            B[i] = this.Rule(A[j],A[i],A[k])
            console.log(j);
            console.log("j: " + j + "i: " + i + "k " + k + "    aaray " +  A[j] + " " + A[i] + " " + A[k] + "     " + B[i]);
        }

        for (let i = 0; i < this.state.value; ++i) {
                if (B[i] === 1)
                    ctx.fillRect(i * 20, this.state.y * 20, 20, 20);
        }
        this.setState({A : B, y :this.state.y + 1})
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let temp = parseInt(this.state.value)
        if (!isNaN(temp)) {

            this.setState({value :  temp})
            if (temp < 3 || temp > 50) {
                alert('Вы неправильно заполнили количество элементов: ' + this.state.value);
            } else {
                let A = [];
                for (let i = 0; i < temp; ++i) {
                    A.push(Math.floor(Math.random() * 2));
                }
                this.setState({A : A, y : 1})

                for (let i = 0; i < temp; ++i) {
                    if (A[i] === 1)
                    ctx.fillRect(i * 20, 0, 20, 20);
                }
            }
        } else {
            alert('Вы неправильно заполнили количество элементов: ' + this.state.value);
        }

        event.preventDefault();
    }


    render() {

        return (

            <div className="App">
                <header className="App-header">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            {this.state.A}
                        </label>
                        <br/>
                        <label>
                            Введит количество элементов в массиве
                        </label>
                        <input type="text" onChange={this.handleChange} size="7" placeholder=""/>
                        <input type="submit" value="Отправить"/>
                        <br/>

                    </form>
                    <form onSubmit={this.handleTact}>
                        <input type="submit" value="Новый такт"/>
                    </form>
                    <canvas id="canvas" height="2500" width = "2500"/>
                </header>

            </div>
        )
    }
    ;

}

export default App;
