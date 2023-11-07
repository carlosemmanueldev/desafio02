import Menu from "../../components/Menu";
import classes from "./Home.module.css";

function Home(){
    return(
        <div className={classes.background}>
            <Menu />
        </div>
    )
}

export default Home;