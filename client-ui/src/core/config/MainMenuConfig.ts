import { ref } from "vue";
import { useAuthStore } from "@/store/useAuth";
const { currentUser } = useAuthStore();

export default function useDocMenuConfig() {
  const DocMenuConfig = ref([
    {
      pages: [
        {
          heading: "Home",
          route: "/",
          svgIcon: "svg/icons/art002.svg",
          fontIcon: "bi-app-indicator",
        },
      ],
    },
    {
      heading: "users",
      route: `/${currentUser.role}/users`,
      pages: [
        {
          heading: "All users",
          route: `/${currentUser.role}/users`,
          svgIcon: "/svg/icons/abs015.svg",
          fontIcon: "bi-calendar3-event",
        },
        {
          heading: "Create user",
          route: `/${currentUser.role}/users/create`,
          svgIcon: "/svg/icons/lay009.svg",
          fontIcon: "bi-calendar3-event",
        },
        {
          heading: "Import data",
          route: `/${currentUser.role}/users/import`,
          svgIcon: "/svg/files/upload.svg",
          fontIcon: "bi-calendar3-event",
        },
      ],
    },
    {
      heading: "appconfigs",
      route: `/${currentUser.role}/appconfigs`,
      pages: [
        {
          heading: "All appconfigs",
          route: `/${currentUser.role}/appconfigs`,
          svgIcon: "/svg/icons/abs015.svg",
          fontIcon: "bi-calendar3-event",
        },
        {
          heading: "Create appconfig",
          route: `/${currentUser.role}/appconfigs/create`,
          svgIcon: "/svg/icons/lay009.svg",
          fontIcon: "bi-calendar3-event",
        },
        {
          heading: "Import data",
          route: `/${currentUser.role}/appconfigs/import`,
          svgIcon: "/svg/files/upload.svg",
          fontIcon: "bi-calendar3-event",
        },
      ],
    },
    {
      heading: "patients",
      route: `/${currentUser.role}/patients`,
      pages: [
        {
          heading: "All patients",
          route: `/${currentUser.role}/patients`,
          svgIcon: "/svg/icons/abs015.svg",
          fontIcon: "bi-calendar3-event",
        },
        {
          heading: "Create patient",
          route: `/${currentUser.role}/patients/create`,
          svgIcon: "/svg/icons/lay009.svg",
          fontIcon: "bi-calendar3-event",
        },
        {
          heading: "Import data",
          route: `/${currentUser.role}/patients/import`,
          svgIcon: "/svg/files/upload.svg",
          fontIcon: "bi-calendar3-event",
        },
      ],
    },
    {
      heading: "sagesfemmes",
      route: `/${currentUser.role}/sagesfemmes`,
      pages: [
        {
          heading: "All sagesfemmes",
          route: `/${currentUser.role}/sagesfemmes`,
          svgIcon: "/svg/icons/abs015.svg",
          fontIcon: "bi-calendar3-event",
        },
        {
          heading: "Create sagesfemme",
          route: `/${currentUser.role}/sagesfemmes/create`,
          svgIcon: "/svg/icons/lay009.svg",
          fontIcon: "bi-calendar3-event",
        },
        {
          heading: "Import data",
          route: `/${currentUser.role}/sagesfemmes/import`,
          svgIcon: "/svg/files/upload.svg",
          fontIcon: "bi-calendar3-event",
        },
      ],
    },
    {
      heading: "messages",
      route: `/${currentUser.role}/messages`,
      pages: [
        {
          heading: "All messages",
          route: `/${currentUser.role}/messages`,
          svgIcon: "/svg/icons/abs015.svg",
          fontIcon: "bi-calendar3-event",
        },
        {
          heading: "Create message",
          route: `/${currentUser.role}/messages/create`,
          svgIcon: "/svg/icons/lay009.svg",
          fontIcon: "bi-calendar3-event",
        },
        {
          heading: "Import data",
          route: `/${currentUser.role}/messages/import`,
          svgIcon: "/svg/files/upload.svg",
          fontIcon: "bi-calendar3-event",
        },
      ],
    },
    {
      heading: "creneauxconsultationdomiciles",
      route: `/${currentUser.role}/creneauxconsultationdomiciles`,
      pages: [
        {
          heading: "All creneauxconsultationdomiciles",
          route: `/${currentUser.role}/creneauxconsultationdomiciles`,
          svgIcon: "/svg/icons/abs015.svg",
          fontIcon: "bi-calendar3-event",
        },
        {
          heading: "Create creneauxconsultationdomicile",
          route: `/${currentUser.role}/creneauxconsultationdomiciles/create`,
          svgIcon: "/svg/icons/lay009.svg",
          fontIcon: "bi-calendar3-event",
        },
        {
          heading: "Import data",
          route: `/${currentUser.role}/creneauxconsultationdomiciles/import`,
          svgIcon: "/svg/files/upload.svg",
          fontIcon: "bi-calendar3-event",
        },
      ],
    },
    {
      heading: "patientsagefemmemappings",
      route: `/${currentUser.role}/patientsagefemmemappings`,
      pages: [
        {
          heading: "All patientsagefemmemappings",
          route: `/${currentUser.role}/patientsagefemmemappings`,
          svgIcon: "/svg/icons/abs015.svg",
          fontIcon: "bi-calendar3-event",
        },
        {
          heading: "Create patientsagefemmemapping",
          route: `/${currentUser.role}/patientsagefemmemappings/create`,
          svgIcon: "/svg/icons/lay009.svg",
          fontIcon: "bi-calendar3-event",
        },
        {
          heading: "Import data",
          route: `/${currentUser.role}/patientsagefemmemappings/import`,
          svgIcon: "/svg/files/upload.svg",
          fontIcon: "bi-calendar3-event",
        },
      ],
    },
    {
      heading: "rooms",
      route: `/${currentUser.role}/rooms`,
      pages: [
        {
          heading: "All rooms",
          route: `/${currentUser.role}/rooms`,
          svgIcon: "/svg/icons/abs015.svg",
          fontIcon: "bi-calendar3-event",
        },
        {
          heading: "Create room",
          route: `/${currentUser.role}/rooms/create`,
          svgIcon: "/svg/icons/lay009.svg",
          fontIcon: "bi-calendar3-event",
        },
        {
          heading: "Import data",
          route: `/${currentUser.role}/rooms/import`,
          svgIcon: "/svg/files/upload.svg",
          fontIcon: "bi-calendar3-event",
        },
      ],
    },

    {
      sectionTitle: "authentication",
      svgIcon: "svg/icons//teh004.svg",
      fontIcon: "bi-sticky",
      sub: [
        {
          sectionTitle: "basicFlow",
          sub: [
            {
              heading: "signIn",
              route: "/auth/sign-in",
            },
            {
              heading: "signUp",
              route: "/auth/sign-up",
            },
            {
              heading: "passwordReset",
              route: "/auth/password-reset",
            },
            {
              heading: "emailResetPassword",
              route: "/auth/email-reset-password",
            },
            {
              heading: "msgResetPassword",
              route: "/auth/msg-reset-password",
            },
          ],
        },
        {
          heading: "error404",
          route: "/404",
        },
      ],
    },
    {
      pages: [],
    },
  ]);
  return DocMenuConfig;
}
