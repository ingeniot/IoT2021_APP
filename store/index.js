export const state = () =>({
    auth: null,
    devices: [],
    selectedDevice: {},
    notifications: []
})

export const mutations = {
    setAuth(state, auth){
        state.auth = auth;
    },

    setDevices(state, devices){
        state.devices = devices;
    },

    setSelectedDevice(state, device){
        state.selectedDevice = device;
    },
    setNotifications(state, notifications){
        state.notifications = notifications;
    }


}

export const actions = {
    readToken(){
        let auth = null;
        try {
            auth=JSON.parse(localStorage.getItem('auth'));            
        } catch (error) {
            console.log(error);
        }
        this.commit('setAuth', auth);
    },

    getDevices(){
    console.log("getDevices");
        const axiosHeader = {
            headers: {
                token: this.state.auth.token
            }
        } 
        this.$axios.get("/device", axiosHeader)
            .then(res=>{
                console.log(res.data.data);
                res.data.data.forEach((device,index)=>{
                    if(device.selected){
                        this.commit('setSelectedDevice', device); 
                        $nuxt.$emit('selectedDeviceIndex',index);  
                    }
                });
                this.commit("setDevices", res.data.data);
            });  
    },
    getNotifications(){
        const axiosHeader = {
            headers: {
                token: this.state.auth.token
            }
        }
        this.$axios.get("/notifications", axiosHeader)
        .then(res=>{
            const notifications = res.data.data;
            console.log("Notificaciones recibidas desde el backend"+notifications);
            this.commit('setNotifications',notifications); 
        }).catch(error=> {
            console.log(error);
        });
}}  



