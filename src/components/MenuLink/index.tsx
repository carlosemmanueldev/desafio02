import { NavLink } from "react-router-dom";

export default function MenuLink({ children, to } ) {
    return(
        <NavLink to={to} >{children}</NavLink>
    )
}
