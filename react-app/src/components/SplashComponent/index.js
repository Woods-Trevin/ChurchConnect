import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import "./SplashComponent.css";

export default function SplashComponent() {

    const history = useHistory();

    const [splash_to_animate, set_splash_to_animate] = useState(1)
    // let splash_to_animate = 2

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (splash_to_animate < 3) {
                set_splash_to_animate(splash_to_animate + 1)
                console.log(splash_to_animate)
            } else {
                set_splash_to_animate(1)
            }
        }, 6000)

        return () => clearTimeout(timeout)

    }, [splash_to_animate])

    return (
        <div className="Splash_outmost_ctnr">
            <div className={`splashImg_Three ${splash_to_animate === 3 && "splash--visible"} ${splash_to_animate != 3 && "splash--hidden"}`} />
            <div className={`splashImg_Two ${splash_to_animate === 2 && "splash--visible"} ${splash_to_animate != 2 && "splash--hidden"}`} />
            <div className={`splashImg_One ${splash_to_animate === 1 ? "splash--visible" : "splash--hidden"}`} />
            <div className={`signupNewUser_btn_ctnr`} >
                <li className={`signupNewUser_btn`} onClick={() => history.push("/sign-up")}>Start Your Journey</li>
            </div>
        </div>
    )
}