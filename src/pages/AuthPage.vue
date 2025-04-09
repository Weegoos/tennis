<template>
  <div
    class="fixed-center"
    style="display: flex; height: 100vh; width: 100vw"
    @keydown="handleKey"
  >
    <!-- Левая половина с видео -->
    <div
      style="flex: 1; position: relative; overflow: hidden"
      v-if="$q.screen.width > mobileWidth"
    >
      <video
        src="../assets/background.mp4"
        autoplay
        muted
        loop
        playsinline
        style="width: 100%; height: 100%; object-fit: cover"
      ></video>
    </div>

    <!-- Правая половина с текстом -->
    <div
      class="content"
      :class="
        $q.screen.width > mobileWidth ? 'desktopDesign' : 'background-container'
      "
    >
      <video
        v-if="$q.screen.width < mobileWidth"
        autoplay
        muted
        loop
        playsinline
        class="background-video"
      >
        <source src="../assets/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <q-card
        class="my-card"
        :class="
          $q.screen.width > mobileWidth
            ? 'desktopDesign'
            : 'mobileDesign contentRelative text-white'
        "
      >
        <q-card-section>
          <p
            aling="center"
            class="text-bold text-center"
            :class="
              $q.screen.width > mobileWidth
                ? 'text-h4 text-black'
                : 'text-h6 text-white'
            "
            data-testid="authorizationContent"
          >
            {{
              email
                ? `${t("authorization.welcomeBack")} ${email}`
                : `${t("authorization.text")}`
            }}
          </p>

          <div
            class="q-gutter-sm"
            :class="$q.screen.width > mobileWidth ? 'row' : 'column'"
          >
            <div class="col">
              <q-input
                v-model="email"
                data-testid="emailInput"
                type="email"
                :placeholder="t('enterEmail')"
                stack-label
                class="q-mb-sm input"
                :class="
                  $q.screen.width < mobileWidth ? 'text-white ' : 'text-black'
                "
                :color="$q.screen.width < mobileWidth ? 'white' : 'black'"
                :input-class="
                  $q.screen.width < mobileWidth ? 'text-white' : 'text-black'
                "
                :label-class="
                  $q.screen.width < mobileWidth ? 'text-white' : 'text-black'
                "
                :input-style="
                  $q.screen.width < mobileWidth
                    ? 'color: white'
                    : 'color: black'
                "
                rounded
                outlined
              />
            </div>
            <div class="col">
              <q-input
                v-model="password"
                data-testid="passwordInput"
                :type="isPwd ? 'password' : 'text'"
                :placeholder="t('enterPassword')"
                stack-label
                class="q-mb-sm input"
                :class="
                  $q.screen.width < mobileWidth ? 'text-white ' : 'text-black'
                "
                :color="$q.screen.width < mobileWidth ? 'white' : 'black'"
                :input-class="
                  $q.screen.width < mobileWidth ? 'text-white' : 'text-black'
                "
                :label-class="
                  $q.screen.width < mobileWidth ? 'text-white' : 'text-black'
                "
                :input-style="
                  $q.screen.width < mobileWidth
                    ? 'color: white'
                    : 'color: black'
                "
                rounded
                outlined
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    :class="
                      $q.screen.width < mobileWidth
                        ? 'text-white'
                        : 'text-black'
                    "
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>
          </div>
        </q-card-section>
        <q-card-actions vertical>
          <q-btn
            no-caps
            color="green"
            :label="t('authorization.button')"
            @click="authorization"
            rounded
          />
          <q-btn
            :color="$q.screen.width < mobileWidth ? 'white' : 'primary'"
            no-caps
            flat
            :label="t('authorization.accountText')"
            @click="pushToRegistration"
          />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { Cookies, QSpinnerGears, useQuasar } from "quasar";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getCurrentInstance } from "vue";
import { useNotifyStore } from "src/stores/notify-store";
import { useI18n } from "vue-i18n";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const mobileWidth = proxy.$mobileWidth;
const $q = useQuasar();
const notifyStore = useNotifyStore();
const router = useRouter();

// variables
const isPwd = ref(true);
const { t } = useI18n();

// function
const email = ref("");
const password = ref("");

const authorization = async () => {
  notifyStore.loading($q, "Подождите...", QSpinnerGears);
  try {
    const data = {
      email: email.value,
      password: password.value,
    };
    const response = await axios.post(`${serverURL}auth/signin`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    $q.loading.hide();
    notifyStore.nofifySuccess($q, `Авторизация прошла успешно!`);

    Cookies.set("accessToken", response.data.accessToken);
    Cookies.set("refreshToken", response.data.refreshToken);

    console.log("Токен после установки:", Cookies.get("accessToken"));

    setTimeout(() => {
      router.push("/");
    }, 50);
  } catch (error) {
    $q.loading.hide();
    notifyStore.notifyError($q, "Ошибка при авторизации. Попробуйте снова.");
  }
};

const pushToRegistration = () => {
  router.push("/registration");
};

const handleKey = (e) => {
  if (e.key === "Enter") {
    authorization();
  }
};
</script>

<style scoped>
.carouselClass {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  justify-content: center;
  align-items: center;
}

.transparent-carousel {
  background-color: rgba(0, 0, 0, 0.5);
  box-shadow: none;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.desktopDesign {
  width: 90%;
}
</style>
