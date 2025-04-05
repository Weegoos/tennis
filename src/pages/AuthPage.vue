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
    <div class="content">
      <q-card class="my-card" style="width: 100%">
        <q-card-section align="center">
          <p
            class="text-bold"
            :class="$q.screen.width > mobileWidth ? 'text-h4' : 'text-h6'"
            data-testid="authorizationContent"
          >
            Authorization
          </p>
        </q-card-section>

        <q-card-section>
          <div
            class="q-gutter-sm"
            :class="$q.screen.width > mobileWidth ? 'row' : 'column'"
          >
            <div class="col">
              <q-input
                v-model="email"
                data-testid="emailInput"
                type="email"
                label="Enter your email address"
                hint="For example: example@gmail.com"
              />
            </div>
            <div class="col">
              <q-input
                v-model="password"
                data-testid="passwordInput"
                :type="isPwd ? 'password' : 'text'"
                hint="At least 8 characters"
                label="Enter the password"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>
          </div>
        </q-card-section>

        <q-card-actions vertical>
          <q-btn
            color="positive"
            no-caps
            label="Enter"
            data-testid="authorizationButton"
            rounded
            @click="authorization"
          />
          <q-btn
            color="primary"
            no-caps
            flat
            label="Don't have an account?"
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
import { useApiStore } from "src/stores/api-store";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const mobileWidth = proxy.$mobileWidth;
const $q = useQuasar();
const notifyStore = useNotifyStore();
const router = useRouter();

// variables
const isPwd = ref(true);

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
  background-color: rgba(255, 255, 255, 0.8);
}
</style>
