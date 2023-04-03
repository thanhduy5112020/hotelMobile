
import { Link, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import useFetch from "../../hooks/useFetch";
import "./edituser.css";
import axios from "axios";
import { useEffect, useState } from "react";



export default function EditUser() {
    const location = useLocation()
    const id = location.pathname.split("/")[3]
    let { data, loading, error } = useFetch(`/users/${id}`)
    // let { data, loading, error } = useFetch(`/users/${id}`)
    const navigate = useNavigate()
    // const user = axios.get(`/users/${id}`)
    // console.log(data)

    const [useredit, setUseredit] = useState({});
    useEffect(async() => {
        setUseredit(data)
    }, [data.usename, data.email, data.country, data.img, data.city])

    const handleUpdate = async (id) => {
        try {
            const updateUser = {
                ...useredit
              }
            await axios.put(`/users/${id}`, updateUser);
            navigate("/")
          
        } catch (err) {}
      };
    // console.log(data)
    return (
        <div className="user">
            <div className="userTitleContainer">
                <h1 className="userTitle">Edit User</h1>
            </div>
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <img
                            src={data.img}
                            alt=""
                            className="userShowImg"
                        />
                        <div className="userShowTopTitle">
                            <span className="userShowUsername">{data.username}</span>
                    
                        </div>
                    </div>
                    <div className="userShowBottom">
                        
                        <span className="userShowTitle">Contact Details</span>
                        <div className="userShowInfo">

                            <span className="userShowInfoTitle">{data.phone}</span>
                        </div>
                        <div className="userShowInfo">

                            <span className="userShowInfoTitle">{data.email}</span>
                        </div>
                        <div className="userShowInfo">

                            <span className="userShowInfoTitle">{data.city} | {data.country} </span>
                        </div>
                    </div>
                </div>
                <div className="userUpdate">
                    <span className="userUpdateTitle">Edit</span>
                    <form className="userUpdateForm">
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label>Username</label>
                                <input
                                    type="text"
                                    // placeholder={data.username}
                                    className="userUpdateInput"
                                    value = {useredit.username}
                                    onChange={e => {
                                        setUseredit({...useredit, username: e.target.value})
                                    }}
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Email</label>
                                <input
                                    type="text"
                                    // placeholder={data.email}
                                    className="userUpdateInput"
                                    value = {useredit.email}
                                    onChange={e => {
                                        setUseredit({...useredit, email: e.target.value})
                                    }}
                                    
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Phone</label>
                                <input
                                    type="text"
                                    // placeholder={data.phone}
                                    className="userUpdateInput"
                                    value = {useredit.phone}
                                    onChange={e => {
                                        setUseredit({...useredit, phone: e.target.value})
                                    }}
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>City</label>
                                <input
                                    type="text"
                                    // placeholder={data.city}
                                    className="userUpdateInput"
                                    value = {useredit.city}
                                    onChange={e => {
                                        setUseredit({...useredit, city: e.target.value})
                                    }}
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Country</label>
                                <input
                                    type="text"
                                    // placeholder={data.country}
                                    className="userUpdateInput"
                                    value = {useredit.country}
                                    onChange={e => {
                                        setUseredit({...useredit, country: e.target.value})
                                    }}

                                />
                            </div>
                        </div>
                        <div className="userUpdateRight">
                            <div className="userUpdateUpload">
                                <img
                                    className="userUpdateImg"
                                    src={data.img}
                                    alt=""
                                />
                                <label htmlFor="file">
                                    {/* <Publish className="userUpdateIcon" /> */}
                                </label>
                                <input type="file" id="file" style={{ display: "none" }} />
                            </div>
                            <button  onClick={() => navigate("/users")}>Back</button>
                            <button className="userUpdateButton" onClick={() => handleUpdate(id)}>Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}