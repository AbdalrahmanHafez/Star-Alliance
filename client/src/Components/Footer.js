import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-solid-svg-icons";
import logo from "../images/logo.png";

const Footer = () => {

  return (

    <footer
      style={{        
        backgroundColor: "#112D4E",
        color: "#DBE2EF",
        fontFamily: "",
      }}
    >
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-12 text-center">
            <br></br>

            <h2 class="footer-heading">
              Star-Alliance
              <img style={{ height: "5cm" }} src={logo} />
            </h2>
            <br></br>
            <p class="menu">
              <a href="https://www.instagram.com/staralliance/?hl=en">
                <img
                  style={{ height: "1cm", width: "1cm", marginRight: "0.5cm" }}
                  src="https://cdn-icons-png.flaticon.com/512/174/174855.png"
                />{" "}
              </a>
              <a href="https://www.facebook.com/staralliance/">
                <img
                  style={{ height: "1cm", width: "1cm", marginRight: "0.5cm" }}
                  src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                />{" "}
              </a>
              <a href="https://twitter.com/staralliance?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor">
                <img
                  style={{ height: "1cm", width: "1cm", marginRight: "0.5cm" }}
                  src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
                />
              </a>
              <a href="https://www.youtube.com/user/staralliancenetwork">
                <img
                  style={{ height: "1cm", width: "1cm", marginRight: "0.5cm" }}
                  src="https://cdn-icons-png.flaticon.com/512/174/174883.png"
                />
              </a>
            </p>
          </div>
        </div>
        <div class="row mt-5">
          <div class="col-md-12 text-center">
            <p class="copyright">
              Copyright © {new Date().getFullYear()} Star-Alliance All rights
              reserved
            </p>
          </div>
        </div>
      </div>
    </footer>

  );
};

export default Footer;
