const app = Vue.createApp({
    data() {
      return {
        checked:false
      }
    },
    methods: {
        clickImg(s) {
            const im = document.getElementById("img_pop");
            im.src = s;
            this.checked = true;
        },
        closeImg() {
            if (this.checked == true) {
                this.checked = false;
            }
        }
    },
    
  })
 app.mount('#app2')