import ReactDOM from "react-dom/client";
import { useNavigate, useParams } from 'react-router-dom';

import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useLocation,
} from 'react-router-dom';
import { useState } from "react";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

var testData = [
    {
        venueID: 1,
        venue: "North District Town Hall (Auditorium)",
        latitude: 22.501639,
        longtitude: 114.128911,
        eventNo: 10,
        eventDetails: "test"
    },
    {
        venueID: 2,
        venue: "Sha Tin Town Hall (Auditorium)",
        latitude: 22.38136,
        longtitude: 114.18990,
        eventNo: 15,
        eventDetails: "test"
    },
    {
        venueID: 3,
        venue: "Hong Kong Cultural Centre (Concert Hall)",
        latitude: 22.29386,
        longtitude: 114.17053,
        eventNo: 8,
        eventDetails: "test"
    },
    {
        venueID: 4,
        venue: "Kwai Tsing Theatre (Auditorium)",
        latitude: 22.35665,
        longtitude: 114.12623,
        eventNo: 20,
        eventDetails: "test"
    },
]

var testCommentData = [
    {
        venueID: 1,
        comments: [
            {
                commentID: 1,
                username: 'test',
                comment: "hello world"
            }, 
            {
                commentID: 2,
                username: 'test',
                comment: "yay haha"
            }, 
        ]
    },
    {
        venueID: 2,
        comments: [
            {
                commentID: 1,
                username: 'hello',
                comment: "hello"
            }, 
            {
                commentID: 2,
                username: 'test',
                comment: "test haha"
            }, 
        ]
    },
    {
        venueID: 3,
        comments: [
            {
                commentID: 1,
                username: 'bonjour',
                comment: "hello bonjour"
            }, 
            {
                commentID: 2,
                username: 'hihi',
                comment: "yay haha"
            }, 
        ]
    },
    {
        venueID: 4,
        comments: [
            {
                commentID: 1,
                username: 'xdxd',
                comment: "hihihi"
            }, 
            {
                commentID: 2,
                username: 'aaaa',
                comment: "yeaaa"
            }, 
        ]
    },
]


var testFavLocation = [
    {
        venueID: 1,
        location: {
            venueID: 1,
            venue: "North District Town Hall (Auditorium)",
            latitude: 22.501639,
            longtitude: 114.128911,
            eventNo: 10,
            eventDetails: "test"
        }
    }, 
    {
        venueID: 2,
        location: {
            venueID: 2,
            venue: "Sha Tin Town Hall (Auditorium)",
            latitude: 22.38136,
            longtitude: 114.18990,
            eventNo: 15,
            eventDetails: "test"
        }
    }, 
]

class UserHome extends React.Component {
    render() {
        return (
            <h1 className="d-flex justify-content-center"> Welcome {localStorage.getItem("username")}! </h1>
        )
    }
}

class LocationTable extends React.Component {
	constructor(props) {
        super(props);
        this.state = { data: testData, ascend: false };
	}

    sortByEventNo() {
        if (!this.state.ascend) {
            this.state.data.sort((a, b) => {
                return a['eventNo'] - b['eventNo']
            })
            this.setState({ascend: true})
        } else {
            this.state.data.sort((a, b) => {
                return b['eventNo'] - a['eventNo']
            })
            this.setState({ascend: false})
        }
    }

    render() {
        return (
            <>
            <div className="d-flex justify-content-center"> 
            <table className="table table-striped table-bordered table-hover" style={{width: "50%"}}>
                <tbody>
                    <tr>
                        <th style={{verticalAlign: "middle"}}>Venue</th>
                        <th style={{verticalAlign: "middle"}}>Latitude</th>
                        <th style={{verticalAlign: "middle"}}>Longtitude</th>
                        <th style={{verticalAlign: "middle"}}>
                            No. of Events
                            <button type="button" className="btn btn-primary-outline btn-sm" onClick={()=>this.sortByEventNo()}>
                                <i class={this.state.ascend ? "fa-solid fa-sort-up": "fa-solid fa-sort-down"}></i>
                            </button>
                        </th>
                    </tr>
                    {this.state.data.map((venueData, index) => 
                        <tr key={index}>
                            <td><Link className="link-dark" to={"/user/place/" + venueData['venueID']}>{venueData['venue']}</Link></td>
                            <td>{venueData['latitude']}</td>
                            <td>{venueData['longtitude']}</td>
                            <td>{venueData['eventNo']}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            </div>
            </>
        );
    }
}


function LocationMap() {
    const navigate = useNavigate();
    const data = testData
    const mapSize = {
        width: '720px',
        height: '480px'
    }
    const center = {
        lat: 22.35,
        lng: 114.16
    }

    function toLocation(venueID) {
        navigate("/user/place/" + venueID);
    }

    return (
        <>
        <div className="d-flex justify-content-center">
            <LoadScript googleMapsApiKey="AIzaSyDYatMSt1rSLsJczbRkS_O3h6fF9lM9J6c">
                <GoogleMap mapContainerStyle={mapSize} center={center} zoom={10.7}>
                    {data.map((venueData, index) => 
                        <Marker position={{lat: venueData['latitude'], lng: venueData['longtitude']}} key={index} onClick={(e)=>toLocation(venueData['venueID'])}/>
                    )}
                </GoogleMap>
            </LoadScript>
        </div>
        </>
    );

}


class LocationSearch extends React.Component {
	constructor(props) {
        super(props);
        this.state = { data: testData, keywords: "", submitted: false };
	}

    updateKeywords = (e) => {
        this.setState({keywords: e.target.value})
    }

    locSearch = (e) => {
        e.preventDefault();
		this.setState({submitted: true});
    }

    
    sortByEventNo() {
        if (!this.state.ascend) {
            this.state.data.sort((a, b) => {
                return a['eventNo'] - b['eventNo']
            })
            this.setState({ascend: true})
        } else {
            this.state.data.sort((a, b) => {
                return b['eventNo'] - a['eventNo']
            })
            this.setState({ascend: false})
        }
    }

    render() {
        return (
            <>
                <div style={{margin: "20"}}>
                    <form>
                        <div className = "d-flex justify-content-center">
                            <input
                                type="text"
                                name="keywords"
                                value={this.state.keywords}
                                onChange={this.updateKeywords}
                                placeholder="Search..."
                            />
                            <button type="button" className="btn btn-dark btn-sm mx-1" onClick={this.locSearch}> <i class="fa fa-search"></i> </button>
                        </div>
                    </form>
                    <br/>
                </div>
                {this.state.submitted && 
                <div className="d-flex justify-content-center"> 
                <table className="table table-striped table-bordered table-hover" style={{width: "50%"}}>
                    <tbody>
                        <tr>
                            <th style={{verticalAlign: "middle"}}>Venue</th>
                            <th style={{verticalAlign: "middle"}}>Latitude</th>
                            <th style={{verticalAlign: "middle"}}>Longtitude</th>
                            <th style={{verticalAlign: "middle"}}>
                                No. of Events
                                <button type="button" className="btn btn-primary-outline btn-sm" onClick={()=>this.sortByEventNo()}>
                                    <i class={this.state.ascend ? "fa-solid fa-sort-up": "fa-solid fa-sort-down"}></i>
                                </button>
                            </th>
                        </tr>
                        {this.state.data.map((venueData, index) => 
                            <tr key={index}>
                                <td><Link className="link-dark" to={"/user/place/" + venueData['venueID']}>{venueData['venue']}</Link></td>
                                <td>{venueData['latitude']}</td>
                                <td>{venueData['longtitude']}</td>
                                <td>{venueData['eventNo']}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                </div>}
            </>
        );
    }
}


function SeparateLocation() {
    const { venueID } = useParams();
    const data = testData.find(x => x.venueID === parseInt(venueID));
    const commentData = testCommentData.find(x => x.venueID === parseInt(venueID)).comments;

    const mapSize = {
        width: '600px',
        height: '400px'
    }
    const venueLoc = {
        lat: data.latitude,
        lng: data.longtitude
    }

    return (
        <>
        <div className="container">
            <div className="row">
                <section className="col-1"></section> 
                <section className="col-5">
                <div>
                    <div style={{margin: "0 0 15px 0"}}>
                    <h3 style={{padding: 3}}>{ data.venue }</h3>
                    <button type="button" className="btn btn-primary">Add to Favourite &nbsp; <i class="fa-solid fa-heart"></i></button>
                    </div>
                </div>
                <div style={{margin: "0 0 15px 0"}}>
                    <p> Event details: {data.eventDetails}</p>

                </div> 
                </section>
                <section className="col-6">
                    <div className="d-flex justify-content-center"> 
                        <LoadScript googleMapsApiKey="AIzaSyDYatMSt1rSLsJczbRkS_O3h6fF9lM9J6c">
                            <GoogleMap mapContainerStyle={mapSize} center={venueLoc} zoom={15}>
                                <Marker position={venueLoc}/>
                            </GoogleMap>
                        </LoadScript>
                    </div>
                    <hr/>
                    <div style={{margin: "0 0 15px 0"}}>
                    <h5>Comments</h5>
                    {commentData.map((venueComment, index) =>
                        <>
                        <div className="card shadow-5 border" style={{margin: "0 0 10px 0"}}>
                            <p className="m-3"> <h6> User: {venueComment['username']} </h6> {venueComment['comment']}</p>
                        </div>
                        </>
                    )}
                    </div>
                    <div> 
                    <form className="d-flex">
                        <textarea className="form-control d-inline-block" required id="new-comment" rows="3" placeholder="Write a comment..."></textarea>
                        <button type="button" className="btn btn-primary d-inline-block"> <i class="fa-solid fa-paper-plane"></i> </button>
                    </form>
                    </div>
                </section>
            </div>
        </div>
        </>
    );
}


class FavouriteLocation extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: testFavLocation };
	}

    sortByEventNo() {
        if (!this.state.ascend) {
            this.state.data.sort((a, b) => {
                return a['eventNo'] - b['eventNo']
            })
            this.setState({ascend: true})
        } else {
            this.state.data.sort((a, b) => {
                return b['eventNo'] - a['eventNo']
            })
            this.setState({ascend: false})
        }
    }

    render() {
        return (
            <>
            <div className="d-flex justify-content-center"> 
                <table className="table table-striped table-bordered table-hover" style={{width: "50%"}}>
                    <tbody>
                        <tr>
                            <th style={{verticalAlign: "middle"}}>Venue</th>
                            <th style={{verticalAlign: "middle"}}>Latitude</th>
                            <th style={{verticalAlign: "middle"}}>Longtitude</th>
                            <th style={{verticalAlign: "middle"}}>
                                No. of Events
                                <button type="button" className="btn btn-primary-outline btn-sm" onClick={()=>this.sortByEventNo()}>
                                    <i class={this.state.ascend ? "fa-solid fa-sort-up": "fa-solid fa-sort-down"}></i>
                                </button>
                            </th>
                        </tr>
                        {this.state.data.map((venueData, index) => 
                            <tr key={index}>
                                <td><Link className="link-dark" to={"/user/place/" + venueData['venueID']}>{venueData['location']['venue']}</Link></td>
                                <td>{venueData['location']['latitude']}</td>
                                <td>{venueData['location']['longtitude']}</td>
                                <td>{venueData['location']['eventNo']}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                </div>
            </>
        );
    }
}


function Home() {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    var handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    var handleSubmit = (event) => {
        event.preventDefault();
        // check with those username / password, do 
        if (inputs.username && inputs.password) {
            localStorage.setItem("username", inputs.username);
            navigate("/user");
        } else {
            alert("Nothing typed!");
        }
    }

    return (
        <>
		    <h3 className="d-flex justify-content-center"> User Login</h3>	
            <div className = "d-flex justify-content-center">
                <form onSubmit={handleSubmit}>
                    <div className = "d-flex justify-content-center p-2">
                        <label> Enter your username: &nbsp;
                            <input
                                type="text"
                                name="username"
                                value={inputs.username}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className = "d-flex justify-content-center p-2">
                        <label>Enter your password: &nbsp;
                            <input
                                type="password"
                                name="password"
                                value={inputs.password}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className = "d-flex justify-content-center p-2">
                        <input className="form-control" type="submit" value="Login"/>
                    </div>
                </form>
            </div>
        </>
    )
}


function Title(props) {
    return (
        // that is bootstrap element
        <header className="bg-warning">
            {/* right now is CUHK Pictures */}
            <h1 className="display-4 text-center p-3">{props.name}</h1>
        </header>
    );

}


function User() {
    const navigate = useNavigate();
    
	const logOut = (event) => {
        localStorage.removeItem("username");
        navigate("/"); 
    }    
    
    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-light">
                <div className="container">
                <ul className="navbar-nav" style={{padding: "0 0 0 28%"}}>
                    <li className="nav-item px-3">
                        <Link className="nav-link" to="/user/locationlist" label="LocationList">List All Locations</Link>
                    </li>
                    <li className="nav-item px-3">
                        <Link className="nav-link" to="/user/locationmap" label="LocationMap">Show Locations on Map</Link>
                    </li> 
                    <li className="nav-item px-3">
                        <Link className="nav-link" to="/user/search" label="Search">Search</Link>
                    </li>
                    <li className="nav-item px-3">
                        <Link className="nav-link" to="/user/favlocation" label = "FavouriteLocations">Favourite Locations</Link>
                    </li>
                </ul>       
                </div>

                <div className="px-3" align="right">
                    <h6>Hello {localStorage.getItem("username")}</h6>
                    <button type="button" className="btn btn-dark btn-sm" onClick={logOut}>Log out</button>
                </div>
            </nav>
            <hr/>
            <Routes>
                <Route path="/" element={<UserHome />}/>
                <Route path="/locationlist" element={<LocationTable />} />
                <Route path="/locationmap" element={<LocationMap />} />   
                <Route path="/search" element={<LocationSearch />} />
                <Route path="/favlocation" element={<FavouriteLocation />} />
                <Route path="/place/:venueID" element={<SeparateLocation />} />
                <Route path="*" element={<NoMatch />} />
            </Routes>
        </>
    );
}

class Admin extends React.Component {
    render() {
        return (
            <> 
            </>
        )
    }
}

function NoMatch() {
    let location = useLocation();
    return (
        <div>
            <h3>
                No match for <code>{location.pathname}</code>
            </h3>
        </div>
    );
}


class App extends React.Component {
    render() {
      return (
        <> 
          <Title name={this.props.name}/>
          <BrowserRouter>
            <div>
                <ul>
                    <Link to="/" />
                    <Link to="/user" />
                    <Link to="/admin" />
                </ul>
            </div>
  
            <hr />
  
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/user/*" element={<User />} />
                <Route path="/admin/*" element={<Admin />} />
                <Route path="*" element={<NoMatch />} />
            </Routes>
          </BrowserRouter>
        </>  
      );
    }
}

const root = ReactDOM.createRoot(document.querySelector('#app'));
root.render(<App name="LCSD Cultural Programmes" />);