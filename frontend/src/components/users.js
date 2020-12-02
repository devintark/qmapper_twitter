import React, { useState, useEffect } from 'react';
import { 
    Container, 
    Table, 
    Dropdown, 
    DropdownToggle, 
    DropdownMenu, 
    DropdownItem 
} from 'reactstrap';

import apiWrapper from '../api'


function Users() {
    const [topUsers, setTopUsers] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownValue, setDropDownValue] = useState('Follower Count');

    const toggle = () => setDropdownOpen(prevState => !prevState);

    const toggleData = async e => {
        setDropDownValue((e && e.target.value) ? 'Tweet Count' : 'Follower Count')
        if (e && e.target.value === 'tweet') {
            let topTweetUsers = await apiWrapper.getTopTweetUsers();
            setTopUsers(() => topTweetUsers.data)
        } else {
            let topUsers = await apiWrapper.getTopUsers();
            setTopUsers(() => topUsers.data);
        }
    }

    useEffect(() => {
        toggleData()
    }, [])

    return(
        <Container>
            <Table striped bordered>
                <thead>
                    <tr>
                    <th id="user-header">Top Users</th>
                    <th id="user-dropdown" className="text-center">
                        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                            <DropdownToggle caret onChange={e => toggleData(e)}>
                                {dropdownValue}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem value='follow' onClick={e => toggleData(e)}>Follower Count</DropdownItem>
                                <DropdownItem value='tweet' onClick={e => toggleData(e)}>Tweet Count</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </th>
                    </tr>
                </thead>

                <tbody>
                    {topUsers.slice(0, 10).map((user, idx) => {
                        return (
                            <tr key={idx}>
                                <td colSpan="2">{user.username}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </Container>
    )
}

export default Users;
