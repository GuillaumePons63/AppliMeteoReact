
const app = document.getElementById('app');

const Title = ({ }) => {
    return <h1 className='title u-center'>
        Mon Application Météo
    </h1>
}

const Erreur = (props) => {
    return <p className='u-center'> {props.erreur}</p>
}

class Search extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div>
            <form className="form-group mx-20-md mx-3" onSubmit={this.props.onClick}>
                <input type='text' className="form-group-input" placeholder="Entrez le nom d'une ville" value={this.props.value} onChange={this.props.onChange} />
                <input type='submit' onClick={this.props.onClick} className="form-group-btn btn-primary" value='rechercher'></input>
            </form>
        </div>
    }
}

class DateDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: null,
            heure: null
        }
    }

    componentDidMount() {
        window.setInterval(() => {
            const date = new Date();
            this.setState(() => ({ date: date.toLocaleDateString(), heure: date.toLocaleTimeString('it-IT') }));
        }, 1000)
    }

    render() {
        return <div className='u-center'>
            <p> Nous sommes le {(this.state.date)} et il est {(this.state.heure)}</p>
        </div>

    }
}

class MeteoCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let data = this.props.data;
        const cards = [data.fcst_day_0, data.fcst_day_1, data.fcst_day_2, data.fcst_day_3, data.fcst_day_4];
        return <div>
            <h2 className='u-center m-3'> Météo pour {data.city_info.name} en {data.city_info.country} </h2>
            <div className='u-flex u-justify-space-around u-flex-wrap u-gap-3'>
                {cards.map((value) => {
                    return <OneCard title={value.day_long} img={value.icon_big} condition={value.condition} tmax={value.tmax} tmin={value.tmin} />
                })}
            </div>
        </div>
    }
}

class OneCard extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <div className='card u-text-center bg-info p-2 u-round-md animated bounceIn' >
            <h3 className='title m-3'>{this.props.title}</h3>
            <img className='content u-text-center pt-3' src={this.props.img} alt='image pour illustrér la condition météo' />
            <p> Condition Météo : {this.props.condition}</p>
            <p> Temperature maximale :  {this.props.tmax} °c</p>
            <p> Temperature minimale :  {this.props.tmin} °c</p>

        </div>
    }
}


class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            url: '',
            fetchOk: false,
            erreur: '',
            data: undefined
        }
        this.fetch = this.fetch.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    fetch(e) {
        e.preventDefault()

        const fetchUrl = `https://www.prevision-meteo.ch/services/json/${this.state.url}`
        fetch(fetchUrl)
            .then((response) => response.json().then((data) => {
                if (data.errors) {

                    this.setState({ fetchOk: false, erreur: data.errors[0].description })
                } else {
                    this.setState({ fetchOk: true, data: data })
                    console.log(this.state.data)
                }
            })



            )
    }

    onChange(e) {
        this.setState({ url: e.target.value })
    }


    render() {
        if (this.state.fetchOk) {
            return <React.Fragment>
                <Title />
                <DateDisplay />
                <Search onClick={this.fetch} value={this.state.url} onChange={this.onChange} />
                <MeteoCard data={this.state.data} />
            </React.Fragment>
        } else if (this.state.erreur.length > 1) {
            return <React.Fragment>
                <Title />
                <DateDisplay />
                <Search onClick={this.fetch} value={this.state.url} onChange={this.onChange} />
                <Erreur erreur={this.state.erreur} />
            </React.Fragment>

        } else {
            return <React.Fragment>
                <Title />
                <DateDisplay />
                <Search onClick={this.fetch} value={this.state.url} onChange={this.onChange} />
            </React.Fragment>
        }
    }
}


ReactDOM.render(
    <Home />,
    app
)