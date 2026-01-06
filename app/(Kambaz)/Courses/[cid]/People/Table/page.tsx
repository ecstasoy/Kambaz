"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "../Table";
import * as client from "../client";

export default function PeopleTablePage() {
    const { cid } = useParams();
    const [users, setUsers] = useState<any[]>([]);
    
    const fetchUsers = async () => {
        const enrolledUsers = await client.findUsersForCourse(cid as string);
        setUsers(enrolledUsers);
    };
    
    useEffect(() => {
        fetchUsers();
    }, []);
    
    return <PeopleTable users={users} fetchUsers={fetchUsers} />;
}
