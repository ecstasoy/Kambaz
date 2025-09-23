import Link from "next/link";
export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
      <input defaultValue="kunhuahuang" placeholder="username" />
      <br />
      <input defaultValue="default" placeholder="password" type="password" />
      <br />
      <input defaultValue="Kunhua" placeholder="First Name" />
      <br />
      <input defaultValue="Huang" placeholder="Last Name" />
      <br />
      <input defaultValue="2000-11-29" type="date" id="wd-dob" />
      <br />
      <input defaultValue="example@email.com" type="email" id="wd-email" />
      <br />
      <select defaultValue="STUDENT" id="wd-role">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>
      <br />
      <Link href="Signin"> Sign out </Link>
    </div>
  );
}
