<template>
  <div
    class="fixed-center"
    style="display: flex; height: 100vh; width: 100vw"
    @keydown="handleKey"
  >
    <!-- Левая половина с видео -->
    <div
      data-testid="videoTestid"
      style="flex: 1; position: relative; overflow: hidden"
      v-if="$q.screen.width > mobileWidth"
    >
      <img
        src="../assets/tennis-background-img.avif"
        autoplay
        muted
        loop
        playsinline
        style="width: 100%; height: 100%; object-fit: cover"
      />
      <!-- Надпись -->
      <div class="carouselClass" data-testid="carouselTestID">
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
          <q-carousel-slide name="tv" class="column no-wrap flex-center">
            <p class="text-h5 text-bold">
              {{ t("registration.carousel.mail.title") }}
            </p>
            <div class="q-mt-md text-center">
              {{ t("registration.carousel.mail.text") }}
            </div>
          </q-carousel-slide>
          <q-carousel-slide name="style" class="column no-wrap flex-center">
            <p class="text-h5 text-bold">
              {{ t("registration.carousel.password.title") }}
            </p>
            <div class="q-mt-md text-center">
              {{ t("registration.carousel.password.text") }}
            </div>
          </q-carousel-slide>
        </q-carousel>
      </div>
    </div>

    <!-- Правая половина с текстом -->
    <div
      data-testid="backgroundText"
      class="content"
      :class="
        $q.screen.width > mobileWidth ? 'desktopDesign' : 'background-container'
      "
    >
      <img
        v-if="$q.screen.width < mobileWidth"
        src="../assets/tennis-background-img.avif"
        class="background-video"
      />
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
            align="center"
            class="text-bold text-center"
            :class="
              $q.screen.width > mobileWidth
                ? 'text-h4 text-black'
                : 'text-h6 text-white'
            "
            data-testid="registrationContent"
          >
            {{ name ? `${t("welcome")} ${name}` : t("registrationText") }}
          </p>
          <div
            data-testid="inputDiv"
            class="q-gutter-sm"
            :class="$q.screen.width > mobileWidth ? 'row' : 'column'"
          >
            <div class="col">
              <q-input
                data-testid="nameInput"
                v-model="name"
                :placeholder="t('enterName')"
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
                :style="
                  $q.screen.width < mobileWidth
                    ? 'border: 1px solid white'
                    : 'border: 1px solid black'
                "
                rounded
                outlined
              />
            </div>
            <div class="col">
              <q-input
                v-model="secondName"
                data-testid="secondNameInput"
                :placeholder="t('enterSecondName')"
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
          </div>
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
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>
          </div>
        </q-card-section>
        <q-card-actions data-testid="actions" vertical>
          <q-btn
            no-caps
            color="green"
            :label="t('registration.button')"
            @click="registration"
            rounded
          />
          <q-btn
            :color="$q.screen.width < mobileWidth ? 'white' : 'primary'"
            no-caps
            flat
            :label="t('registration.accountText')"
            @click="pushToAuthorization"
          />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Cookies, QSpinnerGears, useQuasar } from "quasar";
import { onBeforeMount, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { getCurrentInstance } from "vue";
import { useNotifyStore } from "src/stores/notify-store";
import { useI18n } from "vue-i18n";
export default {
  setup() {
    // global variables
    const { proxy } = getCurrentInstance();
    const serverURL = proxy.$serverURL;
    const mobileWidth = proxy.$mobileWidth;
    const $q = useQuasar();
    const notifyStore = useNotifyStore();
    const router = useRouter();
    const { t } = useI18n();

    // slide

    const slide = ref("style");
    const slides = ["style", "tv"];
    let slideIndex = 0;
    let interval = null;

    // variables
    const isPwd = ref(true);

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
          firstName: name.value,
          lastName: secondName.value,
          password: password.value,
          role: "USER",
        };
        const response = await axios.post(`${serverURL}auth/signup`, data, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        notifyStore.nofifySuccess($q, "Сообщение отправлено в почту!");
        Cookies.set("accessToken", response.data.accessToken);
        Cookies.set("refreshToken", response.data.refreshToken);
      } catch (error) {
        console.error("Registration error:", error);
        notifyStore.notifyError($q, "Ошибка регистрации. Попробуйте снова.");
      } finally {
        $q.loading.hide();
      }
    };

    const pushToAuthorization = () => {
      router.push("/authorization");
    };

    const handleKey = (e) => {
      if (e.key === "Enter") {
        registration();
      }
    };

    return {
      slide,
      isPwd,
      name,
      secondName,
      mobileWidth,
      email,
      password,
      registration,
      pushToAuthorization,
      handleKey,
      t,
    };
  },
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
