import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";

function MainLayout(){
    return(
        <>
            <Navbar/> {/*this navbar is shared ui we want to have across pages */}
            <Outlet/> {/*the actual page which will be rendered along with navbar} */}

        </>
    )
}

export default MainLayout;
