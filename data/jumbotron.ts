/**
 * @name backgroundPicture
 * @description Jumbotron Cover Picture
 *
 * @hint Pic Source 1
 * @see http://wallhaven.cc/
 * Select a picture, inspect for the jpg path, download it
 * @see https://imgchr.com/
 * Upload the ORIGINAL HIGH RESOLUTION picture to this site
 * Then copy the MID RESOLUTION PICTURE path below
 *
 * @hint Pic Source 2
 * Gitee Repo
 */

const backgroundPictureLib = [
  "https://i.picsum.photos/id/311/1600/900.jpg?hmac=yUS02Bgwg81GbTpDuG813r871akJWNv-_Oem7a6PtWY",
  "https://i.picsum.photos/id/83/1600/900.jpg?hmac=R9BQdLAPaGw27suOHRBe6G6xb7m1XzQlbsx7as1N7-s",
  "https://i.picsum.photos/id/667/1600/900.jpg?hmac=JScRHUs-2c2rX10nkdYL8sWamAcZM0ax0n18X_N4s0Y",
  "https://i.picsum.photos/id/888/1600/900.jpg?hmac=hw_TgE4fAZhZAjM5W_sTVY3_SpRrZU7vKw42ZtQt6mo",
  "https://i.picsum.photos/id/649/1600/900.jpg?hmac=MfwiBIOCS7_7zBii3bCvlKJIUO7rxdhOtDPhgvnn8tk",
];

export const backgroundPicture =
  backgroundPictureLib[Math.floor(Math.random() * backgroundPictureLib.length)];

/**
 * @name jumbotronButtonSet
 * @description Jumbotron buttons
 */
export const jumbotronButtonSet: {
  setName: string;
  color?: "primary" | "secondary" | "default" | undefined;
  links: {
    localeKey: string;
    link: string;
  }[];
}[] = [
  {
    setName: "tour",
    color: "primary",
    links: [
      {
        localeKey: "whatsnew",
        link: "/tech/2021/05/30/Document-Main#Dev",
      },
      { localeKey: "demo", link: "https://szhshp.org" },
      {
        localeKey: "documents",
        link: "/tech/2021/05/30/Document-Main",
      },
    ],
  },
  {
    setName: "github",
    links: [
      {
        localeKey: "github",
        link: "https://github.com/szhielelp/NextJS-BlogTemplate-ProjectTitan",
      },
    ],
  },
];
