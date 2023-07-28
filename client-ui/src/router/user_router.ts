export const user_router = {
  path: "/user",
  name: "user",
  meta: {
    requiresAuth: true,
  },
  component: () =>
    import(
      /* webpackChunkName: "layout" */ "@/components/layouts/mainLayout/userLayout.vue"
    ),
  children: [
    {
      path: "users",
      meta: {
        requiresAuth: true,
      },
      component: () =>
        import(
          /* webpackChunkName: "layout" */ "@/components/layouts/mainLayout/Layout.vue"
        ),
      children: [
        {
          path: "",
          name: "user-list-user",
          component: () =>
            import(
              /* webpackChunkName: "list-user" */ "@/views/main/user/UserList.vue"
            ),
        },
        {
          path: "create",
          name: "user-create-user",
          component: () =>
            import(
              /* webpackChunkName: "create-user" */ "@/views/main/user/UserCreate.vue"
            ),
        },
        {
          path: "edit/:id",
          name: "user-edit-user",
          component: () =>
            import(
              /* webpackChunkName: "edit-user" */ "@/views/main/user/UserEdit.vue"
            ),
        },
        {
          path: ":id",
          name: "user-detail-user",
          component: () =>
            import(
              /* webpackChunkName: "detail-user" */ "@/views/main/user/UserDetail.vue"
            ),
        },
        {
          path: "import",
          name: "user-import-data-user",
          component: () =>
            import(
              /* webpackChunkName: "import-data-user" */ "@/views/main/user/UserImportData.vue"
            ),
        },
      ],
    },
    {
      path: "appconfigs",
      meta: {
        requiresAuth: true,
      },
      component: () =>
        import(
          /* webpackChunkName: "layout" */ "@/components/layouts/mainLayout/Layout.vue"
        ),
      children: [
        {
          path: "",
          name: "user-list-appconfig",
          component: () =>
            import(
              /* webpackChunkName: "list-appConfig" */ "@/views/main/appConfig/AppConfigList.vue"
            ),
        },
        {
          path: "create",
          name: "user-create-appconfig",
          component: () =>
            import(
              /* webpackChunkName: "create-appConfig" */ "@/views/main/appConfig/AppConfigCreate.vue"
            ),
        },
        {
          path: "edit/:id",
          name: "user-edit-appconfig",
          component: () =>
            import(
              /* webpackChunkName: "edit-appConfig" */ "@/views/main/appConfig/AppConfigEdit.vue"
            ),
        },
        {
          path: ":id",
          name: "user-detail-appconfig",
          component: () =>
            import(
              /* webpackChunkName: "detail-appConfig" */ "@/views/main/appConfig/AppConfigDetail.vue"
            ),
        },
        {
          path: "import",
          name: "user-import-data-appconfig",
          component: () =>
            import(
              /* webpackChunkName: "import-data-appConfig" */ "@/views/main/appConfig/AppConfigImportData.vue"
            ),
        },
      ],
    },
    {
      path: "patients",
      meta: {
        requiresAuth: true,
      },
      component: () =>
        import(
          /* webpackChunkName: "layout" */ "@/components/layouts/mainLayout/Layout.vue"
        ),
      children: [
        {
          path: "",
          name: "user-list-patient",
          component: () =>
            import(
              /* webpackChunkName: "list-patient" */ "@/views/main/patient/PatientList.vue"
            ),
        },
        {
          path: "create",
          name: "user-create-patient",
          component: () =>
            import(
              /* webpackChunkName: "create-patient" */ "@/views/main/patient/PatientCreate.vue"
            ),
        },
        {
          path: "edit/:id",
          name: "user-edit-patient",
          component: () =>
            import(
              /* webpackChunkName: "edit-patient" */ "@/views/main/patient/PatientEdit.vue"
            ),
        },
        {
          path: ":id",
          name: "user-detail-patient",
          component: () =>
            import(
              /* webpackChunkName: "detail-patient" */ "@/views/main/patient/PatientDetail.vue"
            ),
        },
        {
          path: "import",
          name: "user-import-data-patient",
          component: () =>
            import(
              /* webpackChunkName: "import-data-patient" */ "@/views/main/patient/PatientImportData.vue"
            ),
        },
      ],
    },
    {
      path: "sagesfemmes",
      meta: {
        requiresAuth: true,
      },
      component: () =>
        import(
          /* webpackChunkName: "layout" */ "@/components/layouts/mainLayout/Layout.vue"
        ),
      children: [
        {
          path: "",
          name: "user-list-sagesfemme",
          component: () =>
            import(
              /* webpackChunkName: "list-sagesFemme" */ "@/views/main/sagesFemme/SagesFemmeList.vue"
            ),
        },
        {
          path: "create",
          name: "user-create-sagesfemme",
          component: () =>
            import(
              /* webpackChunkName: "create-sagesFemme" */ "@/views/main/sagesFemme/SagesFemmeCreate.vue"
            ),
        },
        {
          path: "edit/:id",
          name: "user-edit-sagesfemme",
          component: () =>
            import(
              /* webpackChunkName: "edit-sagesFemme" */ "@/views/main/sagesFemme/SagesFemmeEdit.vue"
            ),
        },
        {
          path: ":id",
          name: "user-detail-sagesfemme",
          component: () =>
            import(
              /* webpackChunkName: "detail-sagesFemme" */ "@/views/main/sagesFemme/SagesFemmeDetail.vue"
            ),
        },
        {
          path: "import",
          name: "user-import-data-sagesfemme",
          component: () =>
            import(
              /* webpackChunkName: "import-data-sagesFemme" */ "@/views/main/sagesFemme/SagesFemmeImportData.vue"
            ),
        },
      ],
    },
    {
      path: "messages",
      meta: {
        requiresAuth: true,
      },
      component: () =>
        import(
          /* webpackChunkName: "layout" */ "@/components/layouts/mainLayout/Layout.vue"
        ),
      children: [
        {
          path: "",
          name: "user-list-message",
          component: () =>
            import(
              /* webpackChunkName: "list-message" */ "@/views/main/message/MessageList.vue"
            ),
        },
        {
          path: "create",
          name: "user-create-message",
          component: () =>
            import(
              /* webpackChunkName: "create-message" */ "@/views/main/message/MessageCreate.vue"
            ),
        },
        {
          path: "edit/:id",
          name: "user-edit-message",
          component: () =>
            import(
              /* webpackChunkName: "edit-message" */ "@/views/main/message/MessageEdit.vue"
            ),
        },
        {
          path: ":id",
          name: "user-detail-message",
          component: () =>
            import(
              /* webpackChunkName: "detail-message" */ "@/views/main/message/MessageDetail.vue"
            ),
        },
        {
          path: "import",
          name: "user-import-data-message",
          component: () =>
            import(
              /* webpackChunkName: "import-data-message" */ "@/views/main/message/MessageImportData.vue"
            ),
        },
      ],
    },
    {
      path: "creneauxconsultationdomiciles",
      meta: {
        requiresAuth: true,
      },
      component: () =>
        import(
          /* webpackChunkName: "layout" */ "@/components/layouts/mainLayout/Layout.vue"
        ),
      children: [
        {
          path: "",
          name: "user-list-creneauxconsultationdomicile",
          component: () =>
            import(
              /* webpackChunkName: "list-creneauxConsultationDomicile" */ "@/views/main/creneauxConsultationDomicile/CreneauxConsultationDomicileList.vue"
            ),
        },
        {
          path: "create",
          name: "user-create-creneauxconsultationdomicile",
          component: () =>
            import(
              /* webpackChunkName: "create-creneauxConsultationDomicile" */ "@/views/main/creneauxConsultationDomicile/CreneauxConsultationDomicileCreate.vue"
            ),
        },
        {
          path: "edit/:id",
          name: "user-edit-creneauxconsultationdomicile",
          component: () =>
            import(
              /* webpackChunkName: "edit-creneauxConsultationDomicile" */ "@/views/main/creneauxConsultationDomicile/CreneauxConsultationDomicileEdit.vue"
            ),
        },
        {
          path: ":id",
          name: "user-detail-creneauxconsultationdomicile",
          component: () =>
            import(
              /* webpackChunkName: "detail-creneauxConsultationDomicile" */ "@/views/main/creneauxConsultationDomicile/CreneauxConsultationDomicileDetail.vue"
            ),
        },
        {
          path: "import",
          name: "user-import-data-creneauxconsultationdomicile",
          component: () =>
            import(
              /* webpackChunkName: "import-data-creneauxConsultationDomicile" */ "@/views/main/creneauxConsultationDomicile/CreneauxConsultationDomicileImportData.vue"
            ),
        },
      ],
    },
    {
      path: "patientsagefemmemappings",
      meta: {
        requiresAuth: true,
      },
      component: () =>
        import(
          /* webpackChunkName: "layout" */ "@/components/layouts/mainLayout/Layout.vue"
        ),
      children: [
        {
          path: "",
          name: "user-list-patientsagefemmemapping",
          component: () =>
            import(
              /* webpackChunkName: "list-patientSageFemmeMapping" */ "@/views/main/patientSageFemmeMapping/PatientSageFemmeMappingList.vue"
            ),
        },
        {
          path: "create",
          name: "user-create-patientsagefemmemapping",
          component: () =>
            import(
              /* webpackChunkName: "create-patientSageFemmeMapping" */ "@/views/main/patientSageFemmeMapping/PatientSageFemmeMappingCreate.vue"
            ),
        },
        {
          path: "edit/:id",
          name: "user-edit-patientsagefemmemapping",
          component: () =>
            import(
              /* webpackChunkName: "edit-patientSageFemmeMapping" */ "@/views/main/patientSageFemmeMapping/PatientSageFemmeMappingEdit.vue"
            ),
        },
        {
          path: ":id",
          name: "user-detail-patientsagefemmemapping",
          component: () =>
            import(
              /* webpackChunkName: "detail-patientSageFemmeMapping" */ "@/views/main/patientSageFemmeMapping/PatientSageFemmeMappingDetail.vue"
            ),
        },
        {
          path: "import",
          name: "user-import-data-patientsagefemmemapping",
          component: () =>
            import(
              /* webpackChunkName: "import-data-patientSageFemmeMapping" */ "@/views/main/patientSageFemmeMapping/PatientSageFemmeMappingImportData.vue"
            ),
        },
      ],
    },
    {
      path: "rooms",
      meta: {
        requiresAuth: true,
      },
      component: () =>
        import(
          /* webpackChunkName: "layout" */ "@/components/layouts/mainLayout/Layout.vue"
        ),
      children: [
        {
          path: "",
          name: "user-list-room",
          component: () =>
            import(
              /* webpackChunkName: "list-room" */ "@/views/main/room/RoomList.vue"
            ),
        },
        {
          path: "create",
          name: "user-create-room",
          component: () =>
            import(
              /* webpackChunkName: "create-room" */ "@/views/main/room/RoomCreate.vue"
            ),
        },
        {
          path: "edit/:id",
          name: "user-edit-room",
          component: () =>
            import(
              /* webpackChunkName: "edit-room" */ "@/views/main/room/RoomEdit.vue"
            ),
        },
        {
          path: ":id",
          name: "user-detail-room",
          component: () =>
            import(
              /* webpackChunkName: "detail-room" */ "@/views/main/room/RoomDetail.vue"
            ),
        },
        {
          path: "import",
          name: "user-import-data-room",
          component: () =>
            import(
              /* webpackChunkName: "import-data-room" */ "@/views/main/room/RoomImportData.vue"
            ),
        },
      ],
    },
  ],
};
