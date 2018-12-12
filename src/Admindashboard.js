import React, { Component } from 'react';
import './Bootstrap.min.css';
import firebaseconfig from './Firebaseconfig';
import swal from 'sweetalert2';

class Admindashboard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showOtherDivs: {
                jobList: true,
                companyList: false,
                studentList: false,
            },
            jobsArray: [],
            companyArray: [],
            studentArray: [],
        }
        // Log Out Handler 
        this.logOut = this.logOut.bind(this);
        this.showOtherDivsHandler = this.showOtherDivsHandler.bind(this);
    }

    componentDidMount() {
        let jobsArray = [];
        let companyArray = [];
        let studentArray = [];
        // let userData;
        var that = this;
        firebaseconfig.auth().onAuthStateChanged(function (user) {
            if (user) {
                // var uid = user.uid;
                // let firebaseRefKey = firebaseconfig.database().ref().child(uid);
                // firebaseRefKey.on('value', (dataSnapShot) => {
                //     userData = dataSnapShot.val();
                //     // userData.uid = uid;
                //     // console.log(userData);
                //     // console.log(userData.uid);
                //     that.setState({
                //         userData: userData,
                //     })
                // })
                let jobRefKey = firebaseconfig.database().ref();
                jobRefKey.once('value', (dataSnapShot) => {
                    for (let key1 in dataSnapShot.val()) {
                        if (dataSnapShot.val()[key1].jobs !== undefined) {
                            for (let key2 in dataSnapShot.val()[key1].jobs) {
                                dataSnapShot.val()[key1].jobs[key2].companyEmail = dataSnapShot.val()[key1].userEmail;
                                jobsArray.push(dataSnapShot.val()[key1].jobs[key2]);
                            }
                        }
                    }
                    that.setState({
                        jobsArray: jobsArray,
                    })
                })

                let companyRefKey = firebaseconfig.database().ref();
                companyRefKey.once('value', (dataSnapShot) => {
                    for (let key in dataSnapShot.val()) {
                        if (dataSnapShot.val()[key].userStatus.company === true) {
                            companyArray.push(dataSnapShot.val()[key])
                        }
                    }
                    that.setState({
                        companyArray: companyArray,
                    })
                })

                let studentRefKey = firebaseconfig.database().ref();
                studentRefKey.once('value', (dataSnapShot) => {
                    for (let key in dataSnapShot.val()) {
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

        // Create Job List
        let jobList = this.state.jobsArray.map((value) => {
            return (
                <div key={value.jobUid}>
                    <div className="col-lg-11 col-md-11 p-3 mx-auto border border-bottom-0 border-primary">
                        <h3 className="h3 text-dark mb-3">{value.jobTitle}</h3>
                        <div id="jobDetails">
                            <strong><p className="text-secondary mb-0"><span>{value.companyName}</span>,<span className="ml-3">{value.jobLocation}</span></p></strong>
                            <strong><p className="text-secondary"><span>Apply Now:</span><span className="ml-3">{value.companyEmail}</span></p></strong>
                        </div>
                        <p>{value.jobDescription}</p>
                    </div>
                    <div className="col-lg-11 col-md-11 py-2 mb-3 mx-auto border border-primary">
                        <div className="row">
                            <div className="col-lg-6 col-lg-6">
                                <small>
                                    <i className="far fa-calendar-alt text-primary mr-2"></i><span>{value.jobPostDate}</span>
                                    <i className="fas fa-dollar-sign text-primary ml-3 mr-2"></i><span>{value.jobSalary}</span>
                                </small>
                            </div>
                            <div className="col-lg-6 col-lg-6 text-lg-right text-md-right">
                                <button type="button" onClick={() => {
                                    firebaseconfig.database().ref().child(value.companyUid).child('jobs').child(value.jobUid).remove();
                                    this.componentDidMount();
                                }} className="btn btn-danger mt-lg-0 mt-md-0 mt-3 text-uppercase">Delete Job</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })

        // Create Company List
        let companyList = this.state.companyArray.map((value) => {
            return (
                <div key={value.userUid}>
                    <div className="col-lg-11 col-md-11 p-3 mx-auto border border-bottom-0 border-primary">
                        <h3 className="h3 text-dark mb-3">{value.userFullName}</h3>
                        <strong><p className="text-secondary"><span>{value.userIndustry}</span><span className="ml-3">{value.userLocation}</span></p></strong>
                        <p>{value.userBio}</p>
                    </div>
                    <div className="col-lg-11 col-md-11 py-2 mb-3 mx-auto border border-primary">
                        <div className="row">
                            <div className="col-lg-6 col-lg-6">
                                <small><i className="far fa-envelope text-primary mr-2"></i><span>{value.userEmail}</span></small>
                            </div>
                            <div className="col-lg-6 col-lg-6 text-lg-right text-md-right">
                                <button type="button" onClick={() => {
                                    firebaseconfig.database().ref().child(value.userUid).remove();
                                    this.componentDidMount();
                                }} className="btn btn-danger mt-lg-0 mt-md-0 mt-3 text-uppercase">Delete Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })

        // Create Student List
        let studentList = this.state.studentArray.map((value) => {
            return (
                <div key={value.userUid}>
                    <div className="col-lg-11 col-md-11 p-3 mx-auto border border-bottom-0 border-primary">
                        <h3 className="h3 text-dark mb-3">{value.userFullName}</h3>
                        <strong><p className="text-secondary"><span>{value.userQualification}</span><span className="ml-3">{value.userLocation}</span></p></strong>
                        <p>{value.userBio}</p>
                    </div>
                    <div className="col-lg-11 col-md-11 py-2 mb-3 mx-auto border border-primary">
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <small><i className="far fa-envelope text-primary mr-2"></i><span>{value.userEmail}</span></small>
                            </div>
                            <div className="col-lg-6 col-md-6 text-lg-right text-md-right">
                                <button type="button" onClick={() => {
                                    firebaseconfig.database().ref().child(value.userUid).remove();
                                    this.componentDidMount();
                                }} className="btn btn-danger mt-lg-0 mt-md-0 mt-3 text-uppercase">Delete Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })

        return (
            <div>
                <div className="col-11 mx-auto py-4 px-lg-5 px-md-5 mt-5 mb-4 bg-white shadow border border-primary">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <h1 className="h2 text-uppercase text-dark">Admin dashboard</h1>
                        </div>
                        <div className="col-lg-6 col-md-6 text-right">
                            <button type="button" onClick={this.logOut} className="btn btn-success text-uppercase px-4 m-2">Log Out</button>
                        </div>
                    </div>
                </div>
                <div id="myNavbar" className="col-11 mx-auto my-4 bg-white shadow border border-primary">
                    <ul className="list-inline m-3">
                        <li className="list-inline-item px-3 border-right border-primary">
                            <input type="radio" id="jobList" name="showOtherDivs" value="jobList" checked={this.state.showOtherDivs["jobList"]} onChange={this.showOtherDivsHandler} />
                            <label className="myNavbarItems m-0" htmlFor="jobList"><strong>Job List</strong></label>
                        </li>
                        <li className="list-inline-item px-3 border-right border-primary">
                            <input type="radio" id="companyList" name="showOtherDivs" value="companyList" checked={this.state.showOtherDivs["companyList"]} onChange={this.showOtherDivsHandler} />
                            <label className="myNavbarItems m-0" htmlFor="companyList"><strong>Company List</strong></label>
                        </li>
                        <li className="list-inline-item px-3">
                            <input type="radio" id="studentList" name="showOtherDivs" value="studentList" checked={this.state.showOtherDivs["studentList"]} onChange={this.showOtherDivsHandler} />
                            <label className="myNavbarItems m-0" htmlFor="studentList"><strong>Student List</strong></label>
                        </li>
                    </ul>
                </div>
                {this.state.showOtherDivs.jobList ?
                    <div>
                        <div className="col-11 pt-4 pb-5 px-lg-5 px-md-5 mx-auto my-4 bg-white shadow border border-primary">
                            <h2 className="h2 text-center text-dark mb-4">Job List</h2>
                            {jobList}
                        </div>
                    </div> :
                    this.state.showOtherDivs.companyList ?
                        <div>
                            <div className="col-11 pt-4 pb-5 px-lg-5 px-md-5 mx-auto my-4 bg-white shadow border border-primary">
                                <h2 className="h2 text-center text-dark mb-4">Company List</h2>
                                {companyList}
                            </div>
                        </div> :
                        this.state.showOtherDivs.studentList ?
                            <div>
                                <div className="col-11 pt-4 pb-5 px-lg-5 px-md-5 mx-auto my-4 bg-white shadow border border-primary">
                                    <h2 className="h2 text-center text-dark mb-4">Student List</h2>
                                    {studentList}
                                </div>
                            </div> : null
                }
            </div>
        )
    }
}
export default Admindashboard;
