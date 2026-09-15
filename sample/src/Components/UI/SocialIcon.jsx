import React from "react";
import {
  SiGithub,
  SiLinkedin,
  SiInstagram,
  SiFacebook,
  SiWhatsapp,
  SiGmail,
  SiX,
} from "react-icons/si";

const ICON_MAP = {
  github: SiGithub,
  linkedin: SiLinkedin,
  instagram: SiInstagram,
  facebook: SiFacebook,
  whatsapp: SiWhatsapp,
  gmail: SiGmail,
  x: SiX,
};

export function SocialIcon({ icon, size = 18, className = "", ...props }) {
  const Icon = ICON_MAP[icon];
  if (!Icon) return null;
  return <Icon size={size} className={className} {...props} />;
}

export default SocialIcon;
