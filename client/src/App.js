import React, {Component} from 'react';
import "./App.css";

class App extends Component 
{
  constructor(props)
  {
    super(props);
    this.state = { apiResponse: "",
                   newUrl: undefined,
                  longUrl: "",
                  count_access: 0,
                  count_short: 0,
                  stats: undefined}
  
    this.updateInput = this.updateInput.bind(this);
    this.updateCountShort = this.updateCountShort.bind(this);
    this.updateCountAccess = this.updateCountAccess.bind(this);
    this.updateStats = this.updateCountAccess.bind(this);
  }

  updateInput(event){
    this.setState({longUrl : event.target.value})
  }

  updateCountShort(value){
    this.setState({count_short : value})
  }

  updateCountAccess(value){
    this.setState({count_access : value})
  }

  updateStats(value){
    this.setState({stats : value})
  }

  getStats()
  {
    fetch('/api/url/stats')
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
            console.log(data);

            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            this.setState({stats: data})
        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });
  }

  onButtonClick(url) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({longUrl: url})
    };
        fetch('/api/url/shorten', requestOptions)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
            console.log(response);

            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }

            this.setState({ newUrl: data.shortUrl})
            this.setState({count_short: data.count_short})
            this.setState({count_access: data.count_access})
        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
            console.error('There was an error!', error);
        });
  }

  render()
  {
    return (
      <div id="shortener">
        <h1>Enter your URL</h1>
        <br/>
        <input id="url" type="url" name="longUrl" placeholder="Enter your url" onChange={this.updateInput}  required/>
        <br/>
        <button onClick={() => this.onButtonClick(this.state.longUrl)}>Send</button>  
        <br/><br/>

        {(typeof this.state.newUrl === 'undefined') ? (
          <p></p>
        ): (
          <div>
            <p>Shorten url: <a href={this.state.newUrl}>{this.state.newUrl}</a></p>
            <p>Number of times URL was shortened: {this.state.count_short} </p>
            <p>Number of times new URL was accessed: {this.state.count_access} </p>
          </div>
        )
        }

        <button onClick={() => this.getStats()}>View all statistics</button>  
        {(typeof this.state.stats === 'undefined') ? (
          <p></p>
        ): (
          this.state.stats.map((entry) => ( 
            <div key={entry._id}>
              <p>{entry.longUrl}</p>
              <p>Number of times URL was shortened: {entry.count_short}</p>
              <p>Number of times new URL was accessed: {entry.count_access}</p>
              <p>---------------------</p>
            </div>
          ))
        )}
      </div>
    );
  }
}

export default App;