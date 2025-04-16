// This is just an example,
// so you can safely delete all default props below
import ruRU from "../ru-RU/index";
import kzKZ from "../kz-Kz/index";
import deDU from "../de-DU/index";
export default {
  "en-US": {
    welcome: "Welcome",
    registrationText: "Registration",
    enterName: "Enter your name",
    enterSecondName: "Enter your second name",
    enterEmail: "Enter your email",
    enterPassword: "Enter your password",
    serviceText: "Service",
    ratingText: "Rating",
    experienceText: "Experience",
    notSpecifiedText: "Not specified",
    cityText: "City",
    registration: {
      button: "Register",
      accountText: "Do you have an account? Enter",
      carousel: {
        mail: {
          title: "Mail",
          text: `The special character  must be present in the mail. Make sure
       that you have entered the correct and working email address.`,
        },
        password: {
          title: "Password",
          text: ` The password must consist of 6 characters with special characters.`,
        },
      },
    },
    authorization: {
      text: "Authorization",
      button: "Authorize",
      welcomeBack: "Welcome back",
      accountText: "Don't have an account? Enter",
    },
    indexPage: {
      tournamentPage: {
        newsText: "News",
        allNews: "All",
        interview: "Interviews",
        championships: "Championships",
        analysis: "Analysis",
      },
      achievementsPage: {
        achievementText: "Our Achievements",
        tournamentsHeld: "Tournaments Held",
        usedBalls: "Balls Used",
        numberOfPlayers: "Number of Players",
        subscribers: "Subscribers",
      },
      parallaxPage: {
        block1: {
          text: "Why Choose Us?",
        },
        block2: {
          text: "Unique Approach",
          caption: "Mentorship and personal attention to each participant",
        },
        block3: {
          text: "Growth and Development",
          caption:
            "We support skill development and personal growth at every stage.",
        },
        block4: {
          text: "Strong Community",
          caption: "You become part of a friendly and supportive community.",
        },
        block5: {
          text: "Skill Sharpening",
          caption: "Real tournaments, challenges, and a chance to shine.",
        },
      },
    },
    tournamentPage: {
      mainPage: {
        participants: "Participants",
        exploreButton: "Explore",
      },
    },
    coachPage: {
      mainText: "Submit your application to join our coaching program.",
      mainTextWithAnotherColor: "We’ll get in touch with you shortly.",
      captionText: `Fill out the form below to apply, share your experience, and become
          part of our professional coaching team.`,
      search: "Search...",
      addFormText: 'Add a form"',
      clickToViewDetailedInformation:
        " Click here to view detailed information about the coach",
    },
  },
  "ru-RU": ruRU,
  "kz-KZ": kzKZ,
  "de-DU": deDU,
};
