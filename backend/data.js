import bcrypt from "bcryptjs";

const data = {
  contacts: [
    {
      name: "David Marrr",
      email: "david@example.com",
      message: "I like your website!",
    },
  ],
  users: [
    {
      name: "Alex",
      email: "admin@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },
    {
      name: "User",
      email: "user@example.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: false,
    },
  ],
  abouts: [
    {
      slug: "front-end-developer",
      title: "Front End Developer",
      description:
        "A Software Developer designs and builds computer programs that power mobile devices, desktop computers, and even cars. They not only identify user needs but also create new applications for any given market while making improvements based on feedback from users.",
      image: "/images/about01.png",
    },
    {
      slug: "back-end-developer",
      title: "Back End Developer",
      description:
        "A Software Developer designs and builds computer programs that power mobile devices, desktop computers, and even cars. They not only identify user needs but also create new applications for any given market while making improvements based on feedback from users.",
      image: "/images/about01.png",
    },
    {
      slug: "front-end-developerr",
      title: "MERN Stack Developer",
      description:
        "A Software Developer designs and builds computer programs that power mobile devices, desktop computers, and even cars. They not only identify user needs but also create new applications for any given market while making improvements based on feedback from users.",
      image: "/images/about01.png",
    },
    {
      slug: "front-end-developerrr",
      title: "Figma Design",
      description:
        "A Software Developer designs and builds computer programs that power mobile devices, desktop computers, and even cars. They not only identify user needs but also create new applications for any given market while making improvements based on feedback from users.",
      image: "/images/about01.png",
    },
  ],
  works: [
    {
      slug: "63u87t77yt",
      name: "Mobile App1",
      title: "IOS Senior developer6",
      image: "/images/about04.png",
      view: "https://eloquent-meninsky-db4152.netlify.app",
      github:
        "https://github.com/anishgithub890/personal-portfoilo-react-sanity-",
    },
    {
      slug: "63u23424t3",
      name: "Mobile App2",
      title: "IOS Senior developer5",
      image: "/images/about04.png",
      view: "https://eloquent-meninsky-db4152.netlify.app",
      github:
        "https://github.com/anishgithub890/personal-portfoilo-react-sanity-",
    },
    {
      slug: "63u342342343t",
      name: "Mobile App3",
      title: "IOS Senior developer4",
      image: "/images/about04.png",
      view: "https://eloquent-meninsky-db4152.netlify.app",
      github:
        "https://github.com/anishgithub890/personal-portfoilo-react-sanity-",
    },
    {
      slug: "63123ut",
      name: "Mobile App4",
      title: "IOS Senior developer3",
      image: "/images/about04.png",
      view: "https://eloquent-meninsky-db4152.netlify.app",
      github:
        "https://github.com/anishgithub890/personal-portfoilo-react-sanity-",
    },
    {
      slug: "63u2343t3",
      name: "Mobile App5",
      title: "IOS Senior developer2",
      image: "/images/about04.png",
      view: "https://eloquent-meninsky-db4152.netlify.app",
      github:
        "https://github.com/anishgithub890/personal-portfoilo-react-sanity-",
    },
    {
      slug: "63u234343t",
      name: "Mobile App6",
      title: "IOS Senior developer1",
      image: "/images/about04.png",
      view: "https://eloquent-meninsky-db4152.netlify.app",
      github:
        "https://github.com/anishgithub890/personal-portfoilo-react-sanity-",
    },
  ],
  skills: [
    {
      slug: "ytewyubeh643t8",
      skillname: "HTML1",
      image: "/images/html.png",
    },
    { slug: "ytewy7634r5t7y", skillname: "HTML5", image: "/images/html.png" },
    {
      slug: "ytewykjwedjer",
      skillname: "HTML2",
      image: "/images/html.png",
    },
    {
      slug: "ytewy323weanish",
      skillname: "HTML3",
      image: "/images/html.png",
    },
  ],
  experiences: [
    {
      slug: "2u764tr273rt",
      year: "2020",
      name: "Figma Design",
      company: "Googlel",
      description:
        "Testing and evaluating new programs. Identifying areas for modification.",
    },
    {
      slug: "7r4tolb",
      year: "2021",
      name: "Frontend Developerrr",
      company: "Google",
      description:
        "Testing and evaluating new programs. Identifying areas for modification.",
    },
    {
      slug: "uywtru3r",
      year: "2022",
      name: "Frontend Developer1",
      company: "Walmart",
      description:
        "Testing and evaluating new programs. Identifying areas for modification.",
    },
    {
      slug: "362gyueg326tbx",
      year: "2023",
      name: "Backend Developer",
      company: "amazon",
      description:
        "Testing and evaluating new programs. Identifying areas for modification.",
    },
  ],
  reviews: [
    {
      slug: "743ytfejkcb",
      image: "/images/about01.png",
      name: "John Doe",
      company: "Senior Web Developer at Google",
      feedback:
        "Orion is a great place to work. The people are friendly, helpful and very knowledgeable. I recommend Orion to anyone looking for a job.",
    },
    {
      slug: "63rbewbc",
      image: "/images/about01.png",
      name: "Alex Doe",
      company: "Senior Web Developer at Amazon",
      feedback:
        "Orion is a great place to work. The people are friendly, helpful and very knowledgeable. I recommend Orion to anyone looking for a job.",
    },
    {
      slug: "743ytfesdjkcb",
      image: "/images/about01.png",
      name: "Robort Doe",
      company: "Senior Web Developer at Walmart",
      feedback:
        "Orion is a great place to work. The people are friendly, helpful and very knowledgeable. I recommend Orion to anyone looking for a job.",
    },
    {
      slug: "63rbewbsdc",
      image: "/images/about01.png",
      name: "David Doe",
      company: "Senior Web Developer at KFC",
      feedback:
        "Orion is a great place to work. The people are friendly, helpful and very knowledgeable. I recommend Orion to anyone looking for a job.",
    },
  ],
  brands: [
    {
      slug: "667tejabd",
      brand_image: "/images/spotify.png",
    },
    {
      slug: "467374yr7",
      brand_image: "/images/spotify.png",
    },
    {
      slug: "667tsdfevejabd",
      brand_image: "/images/spotify.png",
    },
    {
      slug: "467374qwfeyr7",
      brand_image: "/images/spotify.png",
    },
  ],
};
export default data;
