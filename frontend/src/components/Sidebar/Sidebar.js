import React, { useContext } from 'react';
import './Sidebar.css'
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarFooter,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';
import { PageContext } from '../../contexts/Page';

function Sidebar() {
    const [page, setPage] = useContext(PageContext)

    const showProfile = () => {
        setPage("1")
    }

    const showCalendar = () => {
        setPage("2")
    }

    const showVideo = () => {
        setPage("3")
    }

    return (
        <div className="sidebar-format">
            <CDBSidebar textColor="#fff" backgroundColor="#333">
                <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                    <p>Navigation</p>
                </CDBSidebarHeader>

                <CDBSidebarContent className="sidebar-content">
                    <CDBSidebarMenu>
                        <CDBSidebarMenuItem icon="user" onClick={showProfile} >Profile</CDBSidebarMenuItem>
                        <CDBSidebarMenuItem icon="table" onClick={showCalendar} >Calendar</CDBSidebarMenuItem>
                        <CDBSidebarMenuItem icon="video" onClick={showVideo} >Video Call</CDBSidebarMenuItem>
                    </CDBSidebarMenu>
                </CDBSidebarContent>

                <CDBSidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 5px',
                        }}
                    >
                        Get a Headstart :D 
                    </div>
                </CDBSidebarFooter>
            </CDBSidebar>
        </div >
    );
}

export default Sidebar;
