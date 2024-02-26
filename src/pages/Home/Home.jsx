import "./Home.css";

import { Link } from "react-router-dom";

export default function Home() {
    return (
        <main className="Home">
            <Link to="/list">List Your Home</Link>
            &nbsp; | &nbsp;
            <Link to="/buy">Buy A Home</Link>
        </main>
    )
}