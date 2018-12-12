import React, { Component } from 'react';
import './Bootstrap.min.css';
import './Companydashboard.css';
import firebaseconfig from './Firebaseconfig';
import swal from 'sweetalert2';
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'
// import { faBuilding } from '@fortawesome/free-solid-svg-icons'

// library.add(faBuilding)


class Companydashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userFullName: "",
            userLocation: "",
            userIndustry: "",
            userEmployees: "",
            userFounded: "",
            userFb: "",
            userTw: "",
            userGp: "",
            userSite: "",
            userBio: "",
            userData: {},
            showEditForm: false,
            showOtherDivs: {
                myJobs: true,
                postNewJobs: false,
                studentsList: false,
            },
            jobTitle: "",
            jobLocation: "",
            jobSalary: "",
            jobDescription: "",
            jobsArray: [],
            studentArray: [],
        }
        // Log Out Handler 
        this.logOut = this.logOut.bind(this);
        // Edit Profile Handlers
        this.showEditFormHandler = this.showEditFormHandler.bind(this);
        this.hideEditFormHandler = this.hideEditFormHandler.bind(this);
        this.saveEditFormHandler = this.saveEditFormHandler.bind(this);
        this.userFullNameHandler = this.userFullNameHandler.bind(this);
        this.userLocationHandler = this.userLocationHandler.bind(this);
        this.userIndustryHandler = this.userIndustryHandler.bind(this);
        this.userEmployeesHandler = this.userEmployeesHandler.bind(this);
        this.userFoundedHandler = this.userFoundedHandler.bind(this);
        this.userFbHandler = this.userFbHandler.bind(this);
        this.userTwHandler = this.userTwHandler.bind(this);
        this.userGpHandler = this.userGpHandler.bind(this);
        this.userSiteHandler = this.userSiteHandler.bind(this);
        this.userBioHandler = this.userBioHandler.bind(this);
        this.showOtherDivsHandler = this.showOtherDivsHandler.bind(this);
        // Post New Job Handlers
        this.jobTitleHandler = this.jobTitleHandler.bind(this);
        this.jobLocationHandler = this.jobLocationHandler.bind(this);
        this.jobSalaryHandler = this.jobSalaryHandler.bind(this);
        this.jobDescriptionHandler = this.jobDescriptionHandler.bind(this);
        this.jobPostingHandler = this.jobPostingHandler.bind(this);
    }

    componentDidMount() {
        let jobsArray = [];
        let studentArray = [];
        let userData;
        var that = this;
        firebaseconfig.auth().onAuthStateChanged(function (user) {
            if (user) {
                var uid = user.uid;
                let firebaseRefKey = firebaseconfig.database().ref().child(uid);
                firebaseRefKey.on('value', (dataSnapShot) => {
                    userData = dataSnapShot.val();
                    // userData.uid = uid;
                    that.setState({
                        userData: userData,
                    })
                })
                let jobRefKey = firebaseconfig.database().ref().child(uid).child('jobs');
                if(jobRefKey !== null){
                    jobRefKey.once('value', (dataSnapShot) => {
                        for(let key in dataSnapShot.val()){
                            jobsArray.push(dataSnapShot.val()[key])
                        }
                    })
                    that.setState({
                        jobsArray: jobsArray,
                    })
                }
                let studentRefKey = firebaseconfig.database().ref();
                studentRefKey.once('value', (dataSnapShot) => {
                    for(let key in dataSnapShot.val()){
                        if (dataSnapShot.val()[key].userStatus.student === true) {
                            studentArray.push(dataSnapShot.val()[key])
                        }
                    }
                    that.setState({
                        studentArray: studentArray,
                    })
                })
            } else {
                console.log("User is not logged in")
            }
        });
    }

    userFullNameHandler(event) {
        this.setState({
            userFullName: event.target.value,
        })
    }
    userLocationHandler(event) {
        this.setState({
            userLocation: event.target.value,
        })
    }
    userIndustryHandler(event) {
        this.setState({
            userIndustry: event.target.value,
        })
    }
    userEmployeesHandler(event) {
        this.setState({
            userEmployees: event.target.value,
        })
    }
    userFoundedHandler(event) {
        this.setState({
            userFounded: event.target.value,
        })
    }
    userFbHandler(event) {
        this.setState({
            userFb: event.target.value,
        })
    }
    userTwHandler(event) {
        this.setState({
            userTw: event.target.value,
        })
    }
    userGpHandler(event) {
        this.setState({
            userGp: event.target.value,
        })
    }
    userSiteHandler(event) {
        this.setState({
            userSite: event.target.value,
        })
    }
    userBioHandler(event) {
        this.setState({
            userBio: event.target.value,
        })
    }
    showEditFormHandler() {
        if (this.state.showEditForm === false) {
            this.setState({
                showEditForm: true,
            })
        }
    }
    hideEditFormHandler() {
        if (this.state.showEditForm === true) {
            this.setState({
                showEditForm: false,
            })
        }
    }

    saveEditFormHandler() {
        let userData;
        var that = this;
        firebaseconfig.auth().onAuthStateChanged(function (user) {
            if (user) {
                var uid = user.uid;
                let firebaseRefKey = firebaseconfig.database().ref().child(uid);
                firebaseRefKey.on('value', (dataSnapShot) => {
                    userData = dataSnapShot.val();
                    userData.userFullName = that.state.userFullName;
                    userData.userLocation = that.state.userLocation;
                    userData.userIndustry = that.state.userIndustry;
                    userData.userEmployees = that.state.userEmployees;
                    userData.userFounded = that.state.userFounded;
                    userData.userFb = that.state.userFb;
                    userData.userTw = that.state.userTw;
                    userData.userGp = that.state.userGp;
                    userData.userSite = that.state.userSite;
                    userData.userBio = that.state.userBio;
                    that.setState({
                        userData: userData,
                    })
                })
                firebaseRefKey.set(that.state.userData)
                swal({
                    type: 'success',
                    title: 'Successfully Updated',
                    text: 'Profile has been successfully updated',
                }).then((value) => {
                    that.setState({
                        showEditForm: false,
                    })
                });
            } else {
                console.log("User is not logged in")
            }
        });
    }

    showOtherDivsHandler(event) {
        let showOtherDivs = this.state.showOtherDivs;
        for (let key in showOtherDivs) {
            showOtherDivs[key] = false;
        }
        showOtherDivs[event.target.value] = event.target.checked;
        this.setState({
            showOtherDivs: showOtherDivs
        })
    }

    jobTitleHandler(event) {
        this.setState({
            jobTitle: event.target.value,
        })
    }
    jobLocationHandler(event) {
        this.setState({
            jobLocation: event.target.value,
        })
    }
    jobSalaryHandler(event) {
        this.setState({
            jobSalary: event.target.value,
        })
    }
    jobDescriptionHandler(event) {
        this.setState({
            jobDescription: event.target.value,
        })
    }
    jobPostingHandler(event) {
        let currentDate = new Date().toDateString()
        let myJobs = {
            jobTitle: this.state.jobTitle,
            companyName: this.state.userData.userFullName,
            companyEmail: this.state.userData.userEmail,
            jobLocation: this.state.jobLocation,
            jobSalary: this.state.jobSalary,
            jobDescription: this.state.jobDescription,
            jobPostDate: currentDate,
        }
        let userData;
        let that = this;
        firebaseconfig.auth().onAuthStateChanged(function (user) {
            if (user) {
                var uid = user.uid;
                // firebaseconfig.database().ref().child(uid).child("jobs").push(myJobs);
                let pushKey = firebaseconfig.database().ref().child(uid).child("jobs").push().getKey();
                myJobs.jobUid = pushKey;
                myJobs.companyUid = user.uid;
                firebaseconfig.database().ref().child(uid).child("jobs").child(pushKey).set(myJobs)
                let firebaseRefKey = firebaseconfig.database().ref().child(uid);
                firebaseRefKey.on('value', (dataSnapShot) => {
                    userData = dataSnapShot.val();
                    that.setState({
                        userData: userData,
                    })
                })
                swal({
                    type: 'success',
                    title: 'Successfully Posted',
                    text: 'Job has been successfully posted',
                }).then((value) => {
                    that.setState({
                        showOtherDivs: {
                            myJobs: true,
                            postNewJobs: false,
                            studentsList: false,
                        }
                    })
                });
            } else {
                console.log("User is not logged in")
            }
        });
    }

    logOut() {
        firebaseconfig.auth().signOut().then(() => {
            // Sign-out successful.
            swal({
                type: 'success',
                title: 'Successfully Logged Out',
            }).then((value) => {
                // setTimeout(function(){
                // }, 1000)
                this.props.history.push('/')
            });
        }).catch((error) => {
            // An error happened.
            let errorMessage = error.message;
            swal({
                type: 'error',
                title: 'Error',
                text: errorMessage,
            })
        });
    }
    render() {

        let myJobItems = this.state.jobsArray.map((value) => {
            return(
                <div key={value.jobUid}>
                    <div className="col-lg-11 col-md-11 p-3 mx-auto border border-bottom-0 border-primary">
                        <h3 className="h3 text-dark mb-3">{value.jobTitle}</h3>
                        <strong><p className="text-secondary"><span>{value.companyName}</span><span className="ml-3">{value.jobLocation}</span></p></strong>
                        <p>{value.jobDescription}</p>
                    </div>
                    <div className="col-lg-11 col-md-11 py-2 mb-3 mx-auto border border-primary">
                        <small>
                        <i className="far fa-calendar-alt text-primary mr-2"></i><span>{value.jobPostDate}</span>
                        <i className="fas fa-dollar-sign text-primary ml-3 mr-2"></i><span>{value.jobSalary}</span>
                        </small>
                    </div>
                </div>
            )
        })

        let studentList = this.state.studentArray.map((value) => {
            return(
                <div key={value.userUid}>
                    <div className="col-lg-11 col-md-11 p-3 mx-auto border border-bottom-0 border-primary">
                        <h3 className="h3 text-dark mb-3">{value.userFullName}</h3>
                        <strong><p className="text-secondary"><span>{value.userQualification}</span><span className="ml-3">{value.userLocation}</span></p></strong>
                        <p>{value.userBio}</p>
                    </div>
                    <div className="col-lg-11 col-md-11 py-2 mb-3 mx-auto border border-primary">
                        <small>
                            <i className="far fa-envelope text-primary mr-2"></i><span>{value.userEmail}</span>
                        </small>
                    </div>
                </div>
            )
        })
        return (
            <div>
                {this.state.showEditForm ?
                    <div className="col-11 mx-auto py-4 px-lg-5 px-md-5 my-5 bg-white shadow border border-primary">
                        <div className="col-lg-6 col-md-6 mx-auto">
                            <h2 className="h2 text-center text-dark mb-3">Edit Profile</h2>
                            <div className="form-group">
                                <label htmlFor="userFullName">Full name</label>
                                <input type="text" value={this.state.userFullName} onChange={this.userFullNameHandler} className="form-control" id="userFullName" placeholder="Name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userIndustry">Industry</label>
                                <input type="text" value={this.state.userIndustry} onChange={this.userIndustryHandler} className="form-control" id="userIndustry" placeholder="Information Technology" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userLocation">Location</label>
                                <input type="text" value={this.state.userLocation} onChange={this.userLocationHandler} className="form-control" id="userLocation" placeholder="City, Country" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userEmployees">Employees</label>
                                <input type="number" value={this.state.userEmployees} onChange={this.userEmployeesHandler} className="form-control" id="userEmployees" placeholder="No of Employees" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userFounded">Founded</label>
                                <input type="number" value={this.state.userFounded} onChange={this.userFoundedHandler} className="form-control" id="userFounded" placeholder="2015" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userFacebook">Facebook</label>
                                <input type="text" value={this.state.userFb} onChange={this.userFbHandler} className="form-control" id="userFacebook" placeholder="https://www.facebook.com/" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userTwitter">Twitter</label>
                                <input type="text" value={this.state.userTw} onChange={this.userTwHandler} className="form-control" id="userTwitter" placeholder="https://www.twitter.com/" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userGooglePlus">Google Plus</label>
                                <input type="text" value={this.state.userGp} onChange={this.userGpHandler} className="form-control" id="userGooglePlus" placeholder="https://plus.google.com/" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userSite">Website</label>
                                <input type="text" value={this.state.userSite} onChange={this.userSiteHandler} className="form-control" id="userSite" placeholder="https://www.example.com/" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userBio">Profile Description</label>
                                <textarea value={this.state.userBio} onChange={this.userBioHandler} className="form-control" id="userBio" rows="4"></textarea>
                            </div>
                            <button type="button" className="btn btn-success btn-block text-uppercase mb-3" onClick={this.saveEditFormHandler}>Save Profile</button>
                            <button type="button" className="btn btn-outline-danger btn-block text-uppercase" onClick={this.hideEditFormHandler}>Cancle</button>
                        </div>
                    </div>
                    :
                    <div>
                        <div className="col-11 mx-auto my-4 bg-white shadow border border-primary">
                            <div className="row">
                                <div className="col-lg-8 col-md-8 pt-3 py-lg-3 py-md-3 px-lg-5 px-md-5">
                                    <div className="row">
                                        <div className="col-lg-2 col-md-2 my-lg-4 text-center">
                                            <i className="display-2 text-primary far fa-building"></i>
                                            {/* <FontAwesomeIcon className="display-2 text-primary" icon="building" /> */}
                                        </div>
                                        <div className="col-lg-10 col-md-10 my-4">
                                            <h1 className="">{this.state.userData.userFullName}</h1>
                                            <p>{this.state.userData.userBio}</p>
                                            <button type="button" onClick={this.showEditFormHandler} className="btn btn-success mr-3 text-uppercase">Edit Profile</button>
                                            <button type="button" onClick={this.logOut} className="btn btn-outline-danger text-uppercase">Log Out</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 py-lg-3 py-md-3">
                                    <div className="my-4 pl-4 border-left">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <th className="pb-2">Industry:</th>
                                                    <td className="pl-lg-5 pl-md-5 pl-3 pb-2">{this.state.userData.userIndustry}</td>
                                                </tr>
                                                <tr>
                                                    <th className="pb-2">Location:</th>
                                                    <td className="pl-lg-5 pl-md-5 pl-3 pb-2">{this.state.userData.userLocation}</td>
                                                </tr>
                                                <tr>
                                                    <th className="pb-2">Employees:</th>
                                                    <td className="pl-lg-5 pl-md-5 pl-3 pb-2">{this.state.userData.userEmployees}</td>
                                                </tr>
                                                <tr>
                                                    <th className="pb-2">Founded:</th>
                                                    <td className="pl-lg-5 pl-md-5 pl-3 pb-2">{this.state.userData.userFounded}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="my-4">
                                            <a href={this.state.userData.userFb} target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f text-primary mr-4" ></i></a>
                                            <a href={this.state.userData.userTw} target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter text-primary mr-4"></i></a>
                                            <a href={this.state.userData.userGp} target="_blank" rel="noopener noreferrer"><i className="fab fa-google-plus-g text-primary mr-4"></i></a>
                                            <a href={this.state.userData.userSite} target="_blank" rel="noopener noreferrer"><i className="fas fa-globe text-primary mr-4"></i></a>
                                            {/* <FontAwesomeIcon className="display-2 text-primary" icon={['fab', 'facebook']} /> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="myNavbar" className="col-11 mx-auto my-4 bg-white shadow border border-primary">
                            <ul className="list-inline m-3">
                                <li className="list-inline-item px-3 border-right border-primary">
                                    <input type="radio" id="myJobs" name="showOtherDivs" value="myJobs" checked={this.state.showOtherDivs["myJobs"]} onChange={this.showOtherDivsHandler}/>
                                    <label className="myNavbarItems m-0" htmlFor="myJobs"><strong>My Jobs</strong></label>
                                </li>
                                <li className="list-inline-item px-3 border-right border-primary">
                                    <input type="radio" id="postNewJobs" name="showOtherDivs" value="postNewJobs" checked={this.state.showOtherDivs["postNewJobs"]} onChange={this.showOtherDivsHandler}/>
                                    <label className="myNavbarItems m-0" htmlFor="postNewJobs"><strong>Post New Job</strong></label>
                                </li>
                                <li className="list-inline-item px-3">
                                    <input type="radio" id="studentsList" name="showOtherDivs" value="studentsList" checked={this.state.showOtherDivs["studentsList"]} onChange={this.showOtherDivsHandler}/>
                                    <label className="myNavbarItems m-0" htmlFor="studentsList"><strong>Students List</strong></label>
                                </li>
                            </ul>
                        </div>
                        {this.state.showOtherDivs.myJobs ?
                            <div>
                                <div className="col-11 pt-4 pb-5 px-lg-5 px-md-5 mx-auto my-4 bg-white shadow border border-primary">
                                    <h2 className="h2 text-center text-dark mb-4">My Jobs</h2>
                                    {myJobItems}
                                </div>
                            </div> :
                        this.state.showOtherDivs.postNewJobs ?
                            <div>
                                <div className="col-11 py-4 px-lg-5 px-md-5 mx-auto my-4 bg-white shadow border border-primary">
                                    <h2 className="h2 text-center text-dark mb-3">Post New Jobs</h2>
                                    <div className="form-group">
                                        <label htmlFor="jobTitle">Job Title</label>
                                        <input type="text" value={this.state.jobTitle} onChange={this.jobTitleHandler} className="form-control" id="jobTitle" placeholder="Job Title/ Job Position" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="jobLocation">Location</label>
                                        <input type="text" value={this.state.jobLocation} onChange={this.jobLocationHandler} className="form-control" id="jobLocation" placeholder="City, Country" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="jobSalary">Salary</label>
                                        <input type="number" value={this.state.jobSalary} onChange={this.jobSalaryHandler} className="form-control" id="jobSalary" placeholder="25000" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="jobDescription">Job Description</label>
                                        <textarea value={this.state.jobDescription} onChange={this.jobDescriptionHandler} className="form-control" id="userBio" rows="4"></textarea>
                                    </div>
                                    <div className="col-lg-6 col-md-6 mx-auto mt-3">
                                        <button type="button" className="btn btn-success btn-block text-uppercase mb-3" onClick={this.jobPostingHandler}>Publish</button>
                                    </div>
                                </div>
                            </div> :
                        this.state.showOtherDivs.studentsList ?
                            <div>

                                <div className="col-11 pt-4 pb-5 px-lg-5 px-md-5 mx-auto my-4 bg-white shadow border border-primary">
                                    <h2 className="h2 text-center text-dark mb-4">Students List</h2>
                                    {studentList}                                
                                </div>
                            </div> : null
                        }


                    </div>
                }
            </div>
        )
    }
}
export default Companydashboard;
