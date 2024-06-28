import './assets/main.css';

import { createApp } from 'vue';


// Import the CSS or use your own!
import "vue-toastification/dist/index.css";



import App from './App.vue';
import router from './router';
import store from './store/index';
import Toast  from 'vue-toastification';

const app = createApp(App);


// const options = {
//   position: 'top-right',
//   timeout: 3000, // Optional timeout
//   closeOnClick: true, // Click to close
//   pauseOnHover: true, // Pause timeout on hover
//   draggable: true, // Draggable toast
//   draggablePercent: 0.6, // Draggable area percentage
//   showCloseButtonOnHover: false, // Show close button on hover
//   hideProgressBar: false, // Hide progress bar
//   closeButton: 'button', // Custom close button
//   icon: true, // Show icon
//   rtl: false, // Right to Left support
// };

app.use(router);
app.use(store)

app.use(Toast);


app.mount('#app');
