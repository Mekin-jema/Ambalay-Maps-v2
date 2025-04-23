import React, { useState, useMemo } from "react";
import { useTable } from "react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus, Trash } from "lucide-react";
import { NavUser } from "@/pages/dashboard/navbar/header-user";
import { Search } from "@/pages/dashboard/navbar/search";
import { DarkModeToggle } from "@/pages/dashboard/navbar/toggle-theme";
import { Header } from "@/pages/dashboard/navbar/main-header";

const TeamManagement = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Read-Only");
  const [users, setUsers] = useState([
    { id: 1, email: "@Binyam5m@example.com", role: "Admin", apiCalls: 120 },
    { id: 2, email: "@BM197@example.com", role: "Developer", apiCalls: 80 },
    { id: 2, email: "@@Advance_with_resolve@example.com", role: "Developer", apiCalls: 80 },
    { id: 3, email: "@HawiGirma@example.com", role: "Read-Only", apiCalls: 10 },
  ]);
  const [confirmDelete, setConfirmDelete] = useState(null); // State for confirmation modal

  // Handle inviting a new user
  const handleInviteUser = () => {
    if (email && role) {
      const newUser = {
        id: users.length + 1,
        email,
        role,
        apiCalls: 0, // New users start with 0 API calls
      };
      setUsers([...users, newUser]);
      setEmail("");
      setRole("Read-Only");
    }
  };

  // Handle role change for a user
  const handleRoleChange = (userId, newRole) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  // Handle user deletion
  const handleDeleteUser = (userId) => {
    setConfirmDelete(userId); // Show confirmation modal
  };

  // Confirm deletion
  const confirmDeletion = () => {
    setUsers(users.filter((user) => user.id !== confirmDelete));
    setConfirmDelete(null); // Close confirmation modal
  };

  // Define columns for react-table
  const columns = useMemo(
    () => [
      { Header: "Email", accessor: "email", width: "40%" },
      {
        Header: "Role",
        accessor: "role",
        width: "30%",
        Cell: ({ row }) => (
          <Select
            value={row.original.role}
            onValueChange={(value) => handleRoleChange(row.original.id, value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent className="dark:bg-[#1F2937] dark:text-white bg-slate-600 text-white ">
              <SelectItem value="Read-Only">Read-Only</SelectItem>
              <SelectItem value="Admin">Admin</SelectItem>
              <SelectItem value="Billing">Billing</SelectItem>
              <SelectItem value="Developer">Developer</SelectItem>
            </SelectContent>
          </Select>
        ),
      },
      { Header: "API Calls", accessor: "apiCalls", width: "20%" },
      {
        Header: "Actions",
        width: "10%",
        Cell: ({ row }) => (
          <Button
            variant="destructive"
            onClick={() => handleDeleteUser(row.original.id)}
          >
            <Trash className="h-4 w-4 text-red-600" />
          </Button>
        ),
      },
    ],
    []
  );

  // Use react-table to create the table instance
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: users });

  return (
    <Card>
         <Header>
                              {/* <TopNav links={topNav} /> */}
                              <div className="ml-auto flex items-center space-x-4">
                                <Search />
                                <DarkModeToggle />
                                <NavUser />
                              </div>
                            </Header>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add Users Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold ">Add Users to Team</h2>
          <div className="flex gap-2 ">
            <Input
              type="email"
              placeholder="Enter user email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Select value={role} onValueChange={(value) => setRole(value)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
            <SelectContent className="dark:bg-[#1F2937] dark:text-white bg-slate-600 text-white ">
                <SelectItem value="Read-Only">Read-Only</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Billing">Billing</SelectItem>
                <SelectItem value="Developer">Developer</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleInviteUser} className="bg-[#00432f] text-white"> <Plus width={5} height={5} />Invite User</Button>
          </div>
        </div>

        {/* User List Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Team Members</h2>
          <div className="overflow-x-auto">
            <table {...getTableProps()} className="w-full">
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps()}
                        className="px-4 py-2 text-left"
                        style={{ width: column.width }}
                      >
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => (
                        <td
                          {...cell.getCellProps()}
                          className="px-4 py-2 border-t"
                          style={{ width: cell.column.width }}
                        >
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>

      {/* Confirmation Modal */}
      {confirmDelete !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Confirm Deletion</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Are you sure you want to delete this user?</p>
              <div className="flex justify-end gap-2">
                <Button variant="outline" className="bg-[#00432f] text-white" onClick={() => setConfirmDelete(null)}>
                  Cancel
                </Button>
                <Button variant="destructive" className="bg-red-600 text-white" onClick={confirmDeletion}>
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </Card>
  );
};

export default TeamManagement;