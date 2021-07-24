// socket connection client side

import socketIOClient from "socket.io-client";
import React from 'react'
const token = localStorage.getItem('token')
const SOCKET_URL = "http://localhost:4000";

export const socket = socketIOClient(SOCKET_URL)
export const SocketContext = React.createContext()