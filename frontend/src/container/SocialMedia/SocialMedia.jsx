import React from "react";
import { BsTwitter, BsInstagram, BsGithub } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import "./SocialMedia.scss";

const SocialMedia = () => {
  return (
    <div className="app__social">
      <ul>
        <div>
          <a href="https://www.facebook.com/profile.php?id=100011898127905&mibextid=LQQJ4d">
            <FaFacebookF />
          </a>
        </div>
        <div>
          <a href="https://instagram.com/an__ish__m?igshid=YmMyMTA2M2Y=">
            <BsInstagram />
          </a>
        </div>
        <div>
          <a href="https://twitter.com/AnishMa40489848">
            <BsTwitter />
          </a>
        </div>
        <div>
          <a href="https://github.com/anishgithub890">
            <BsGithub />
          </a>
        </div>
      </ul>
    </div>
  );
};

export default SocialMedia;
