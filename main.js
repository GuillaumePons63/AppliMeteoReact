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

ReactDOM.render(
    <React.Fragment>
        <Title />
        <Search />
    </React.Fragment>,
    app
)