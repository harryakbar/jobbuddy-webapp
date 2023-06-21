"use client";

import styles from "../page.module.css";
import "../global.css";
import DashboardForm from "../components/coverLetterForm";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublicKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabasePublicKey);

const Container = (props) => {
  return (
    <div
      className={classNames(
        "flex flex-row mb-4 row drop-shadow-md bg-[#FFFDF6] rounded-md w-full place-content-between justify-between",
        props.margin || "m-2",
        props.padding || "p-2"
      )}
    >
      {props.children}
    </div>
  );
};

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Fetch data from Supabase
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("cover_letters")
        .select("company_name, role, created_at")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching data:", error.message);
        return;
      }

      // Store fetched data in state variable
      setTableData(data);
    };
    if (user !== null) {
      fetchData();
    }
  }, [user]);

  console.log(tableData);

  useEffect(() => {
    const response = supabase.auth?.onAuthStateChange((_, session) => {
      if (session) {
        setUser(session.user);
      }
    });
    return () => {
      if (typeof response?.data?.unsubscribe === "function") {
        response?.data?.unsubscribe();
      }
    };
  }, []);

  const signOut = async () => {
    try {
      // Sign in with email
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error sign out:", error.message);
        return;
      }
      // Sign-out successful
      router.push("/sign-in");
      console.log("Sign out successful!");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <main className={classNames(styles.main, "p-4 sm:p-8 h-auto")}>
      <Container margin="m-0">
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <a className="btn btn-ghost normal-case text-l">JobBuddy</a>
          </div>
          <div className="flex-none gap-2">
            <a className="btn btn-ghost normal-case text-l">Dashboard</a>
            <div className="dropdown dropdown-end">
              <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </label>
              <ul
                tabIndex="0"
                className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <a onClick={signOut}>Profile</a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a onClick={signOut}>Sign Out</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
      
      <Container className="h-full">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>Company</th>
                <th>Role</th>
                <th>Created Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.id}>
                  <th>
                    <label>
                      <input type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <td>
                    <div>
                      <div className="font-bold">{row.company_name}</div>
                    </div>
                  </td>
                  <td>{row.role}</td>
                  <td>{row.created_at}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
              ))}
            </tbody>
            {/* foot */}
            <tfoot>
              <tr>
                <th></th>
                <th>Company</th>
                <th>Role</th>
                <th>Created Date</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </Container>
    </main>
  );
}
