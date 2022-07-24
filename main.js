const app = document.getElementById('app');

const Title = ({ }) => {
    return <h1 className='title u-center'>
        Mon Application Météo
    </h1>
}

const Search = ({ }) => {
    return <div>
        <form className="mx-20 form-group">
            <input type='text' className="form-group-input input--lg" placeholder="Entrez le nom d'une ville" />
            <input type='submit' className="form-group-btn btn-primary btn--lg" value='rechercher'></input>
        </form>
    </div>
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


ReactDOM.render(
    <React.Fragment>
        <Title />
        <DateDisplay />
        <Search />
    </React.Fragment>,
    app
)