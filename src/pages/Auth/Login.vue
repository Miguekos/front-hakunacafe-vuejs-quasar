<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card
          v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '400px' }"
        >
          <q-card-section>
            <q-avatar size="143px" class="absolute-center shadow-10">
              <img src="../../assets/logo_1.jpg"/>
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis text-italic"></div>
            </div>
          </q-card-section>
          <form @submit.prevent="submitForm">
            <q-card-section class="q-gutter-md">
              <q-input
                filled
                name="username"
                ref="username"
                label-color="black-5"
                color="grey"
                v-model="form.username"
                label="Username"
              />

              <q-input
                filled
                name="password"
                ref="password"
                v-model="form.password"
                label="Contraseña"
                label-color="black-5"
                color="grey"
                :type="isPwd ? 'password' : 'text'"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </q-card-section>
            <q-list>
              <q-item>
                <q-item-section>
                  <q-btn
                    size="md"
                    :loading="loadlogin"
                    color="primary"
                    type="submit"
                    text-color="white"
                    label="Iniciar Sesión"
                  />
                </q-item-section>
              </q-item>
            </q-list>
          </form>
          <q-list class="q-pt-xs">
            <q-item>
              <q-item-section
                class="text-black cursor-pointer"
                style="font-size: 14px"
              >
                <q-item-label v-ripple:white @click="modalRecoverPass()"
                >Olvidaste tu contraseña
                </q-item-label>
              </q-item-section>
              <q-item-section></q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
// import { LocalStorage } from "quasar";
import {LocalStorage} from "quasar";
import {mapActions} from "vuex";
// console.log(process.env.API);
// import { openURL } from 'quasar'
export default {
  // preFetch({ store }) {
  //   // console.log("stored autth");
  //   // console.log(store.state.auth.auth);
  //   if (!store.state.auth) {
  //     // console.log(store.state.auth);
  //     // redirect('/')
  //   }
  // },
  data() {
    return {
      loadlogin: false,
      val: false,
      text: "",
      ph: "",
      password: "",
      isPwd: true,
      dense: false,
      loading: false,
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions("auth", ["login", "recuperar"]),
    ...mapActions("usuarios", ["callUsersId"]),
    modalRecoverPass() {
      this.$q
        .dialog({
          title: "Recuperar contraseña",
          message:
            "¡Un correo será enviado con la contraseña generada, no olvides verificar tu bandeja de spam!",
          prompt: {
            model: "",
            isValid: val => val.length > 2, // << here is the magic
            type: "text", // optional
            label: "Correo",
            outlined: true
          },
          color: "blue-5",
          cancel: true,
          persistent: true,
          transitionShow: "slide-down",
          transitionHide: "slide-up"
        })
        .onOk(async data => {
          console.log(">>>> OK, received", data);
          const res = await this.recuperar(data);
          console.log(res);
          if (res.codRes == "00") {
            this.$q.notify({
              // progress: true,
              message: "¡Correo enviado!",
              // icon: "favorite_border",
              icon: "username",
              color: "white",
              textColor: "green-5",
              position: "top"
            });
          } else if (res.codRes == "01") {
            this.$q.notify({
              // progress: true,
              message: "¡Correo no existe!",
              // icon: "favorite_border",
              icon: "unsubscribe",
              color: "white",
              textColor: "blue-5",
              position: "top"
            });
          } else {
            this.$q.notify({
              // progress: true,
              message: "¡Error controlado!",
              // icon: "favorite_border",
              icon: "cancel_presentation",
              color: "white",
              textColor: "blue-5",
              position: "top"
            });
          }
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    },
    submitForm() {
      this.loadlogin = true;
      this.$refs.username.validate();
      this.$refs.password.validate();
      if (!this.$refs.username.hasError && !this.$refs.password.hasError) {
        // console.log();
        this.login({
          username: this.form.username,
          password: this.form.password
        })
          .then(async resp => {
            if (resp.res == "ok") {
              // console.log("resp", resp.user.il_activo);
              if (!resp.user.il_activo) {
                this.$q.notify({
                  // progress: true,
                  message: `Tu cuenta esta inabilitada por el momento`,
                  // icon: "favorite_border",
                  icon: "insert_emoticon",
                  color: "white",
                  textColor: "blue-5",
                  position: "top"
                });
                this.loadlogin = false;
              } else {
                const dataUser = await this.callUsersId(resp.user.co_usuari);
                console.log("dataUser", dataUser);
                LocalStorage.set("loggin", true);
                // LocalStorage.set("role", resp.rol);
                // LocalStorage.set("idUser", resp.id_);
                // LocalStorage.set("prove", resp.proveedor);
                this.$store.commit("auth/setAuth", true);
                // this.$store.commit("auth/setRole", resprol);
                this.$q.notify({
                  // progress: true,
                  message: `${resp.message}`,
                  // icon: "favorite_border",
                  icon: "insert_emoticon",
                  color: "white",
                  textColor: "blue-5",
                  position: "top"
                });
                LocalStorage.set("UserDetalle", {
                  ...dataUser[0],
                  ...resp.user
                });
                // console.log("loguerado Correctamente");
                this.loadlogin = false;
                this.$router.push("/");
              }
            } else if (resp.res == "ko") {
              // console.log("Email o Contraseña incorrecta");
              this.$q.notify({
                message: `${resp.message}`,
                color: "white",
                textColor: "amber-5",
                position: "top"
              });
              this.loadlogin = false;
            } else {
              console.log("else");
            }
          })
          .catch(err => {
            console.log(err);
            this.loadlogin = false;
            this.$q.notify({
              message: "Error en la red",
              color: "white",
              textColor: "blue-5",
              position: "top"
            });
          });
        // console.log("login the user");
      }
    }
  }
};
</script>

<style>
.bg-image {
  /*background-image: linear-gradient(135deg, #7028e4 0%, #e5b2ca 100%);*/
  background-image: url("../../assets/fondo.jpg") !important;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 100px #ffffff inset !important;
  border-bottom: 1px solid #c2c2c2;
  border-top: 1px solid #c2c2c2;
}

.login {
  /*background-image: url("~assets/earth_dream.png");*/
  background-image: linear-gradient(
    -200deg,
    #ffffff 42%,
    #9abbee 60%,
    #def3f8 100%
  );
}
</style>
