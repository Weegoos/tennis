<template>
  <div
    class="fixed-center"
    style="display: flex; height: 100vh; width: 100vw"
    @keydown="handleKey"
  >
    <!-- Левая половина с видео -->
    <div style="flex: 1; position: relative; overflow: hidden">
      <video
        src="../assets/background.mp4"
        autoplay
        muted
        loop
        playsinline
        style="width: 100%; height: 100%; object-fit: cover"
      ></video>
      <!-- Надпись -->
      <div class="carouselClass">
        <q-carousel
          v-model="slide"
          transition-prev="scale"
          transition-next="scale"
          swipeable
          animated
          control-color="white"
          navigation
          padding
          arrows
          height="300px"
          class="transparent-carousel text-white shadow-1 rounded-borders"
        >
          <q-carousel-slide name="style" class="column no-wrap flex-center">
            <p class="text-h5 text-bold">Пароль</p>
            <div class="q-mt-md text-center">
              Пароль должен состоять из 6 символов с специальными символами
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="tv" class="column no-wrap flex-center">
            <p class="text-h5 text-bold">Почта</p>
            <div class="q-mt-md text-center">
              В почте обязательно должен присутствовать специальный символ "@".
              Убедитесь, что вы ввели правильный и рабочий адрес электронной
              почты
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="layers" class="column no-wrap flex-center">
            <p class="text-h5 text-bold">
              Индивидуальный идентификационный номер (ИИН)
            </p>
            <div class="q-mt-md text-center">
              Убедитесь, что вы ввели правильный индивидуальный
              идентификационный номер (ИИН). После ввода изменить ИИН будет
              невозможно
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="map" class="column no-wrap flex-center">
            <p class="text-h5 text-bold">Департамент и регион</p>
            <div class="q-mt-md text-center">
              Убедитесь, что вы ввели правильный департамент и также выбрали
              правильный регион
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </div>

    <!-- Правая половина с текстом -->
    <div class="content">
      <q-card class="my-card" style="width: 90%">
        <q-card-section align="center">
          <p class="text-h5">Регистрация</p>
        </q-card-section>
        <q-card-section>
          <div class="row q-gutter-sm">
            <div class="col">
              <q-input
                v-model="name"
                type="text"
                label="Введите имя"
                hint="Например: Айсултан"
              />
            </div>
            <div class="col">
              <q-input
                v-model="secondName"
                type="text"
                label="Введите фамилию"
                hint="Например: Хаббасов"
              />
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="row q-gutter-sm">
            <div class="col">
              <q-input
                v-model="email"
                type="email"
                label="Введите почту"
                hint="Например: example@gmail.com"
              />
            </div>
            <div class="col">
              <q-input
                v-model="password"
                :type="isPwd ? 'password' : 'text'"
                hint="Не менее 6 символов"
                label="Введите пароль"
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
            label="Зарегистрироваться"
            @click="registration"
          />
          <q-btn
            color="primary"
            no-caps
            flat
            label="Есть аккаунт? Войти"
            @click="pushToAuthorization"
          />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { Cookies, QSpinnerGears, useQuasar } from "quasar";
import { onBeforeMount, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { getCurrentInstance } from "vue";
import { useNotifyStore } from "src/stores/notify-store";

// global variables
const { proxy } = getCurrentInstance();
const serverURL = proxy.$serverURL;
const $q = useQuasar();
const notifyStore = useNotifyStore();
const cookie = Cookies.has("accessToken");
const router = useRouter();
console.log(cookie);

// slide
const slide = ref("style");
const slides = ["style", "tv", "layers", "map"];
let slideIndex = 0;
let interval = null;

// variables
const isPwd = ref(true);

console.log(serverURL);

onMounted(() => {
  interval = setInterval(() => {
    slideIndex = (slideIndex + 1) % slides.length;
    slide.value = slides[slideIndex];
  }, 5500);
});

onBeforeMount(() => {
  clearInterval(interval);
});

// function
const name = ref("");
const secondName = ref("");
const email = ref("");
const password = ref("");

const registration = async () => {
  notifyStore.loading($q, "Подождите...", QSpinnerGears);
  try {
    const data = {
      email: email.value,
      name: name.value,
      secondName: secondName.value,
      password: password.value,
    };
    const response = await axios.post(`${serverURL}auth/signup`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    $q.loading.hide();
    notifyStore.nofifySuccess($q, "Регистрация прошла успешно!");
    console.log("Response:", response.data);
    Cookies.set("accessToken", response.data.accessToken);
    Cookies.set("refreshToken", response.data.refreshToken);
  } catch (error) {
    $q.loading.hide();
    console.error("Registration error:", error);
    notifyStore.notifyError($q, "Ошибка регистрации. Попробуйте снова.");
  }
};

const pushToAuthorization = () => {
  router.push("/authorization");
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
