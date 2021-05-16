<template>
    <div class="row">
        <IotIndicator :config = "configIndicator"></IotIndicator>
        <button @click="sendData()">SEND</button>
        
        <IotButton :config = "configButton"></IotButton>

    </div>
</template>

<script>
import Iotbutton from '../components/Widgets/Iotbutton.vue';
export default {
    components: { Iotbutton },
    data(){
        return {
            value:false,
        configIndicator: {
            userId:"userid",
            selectedDevice:{
                name:"home",
                dId:"8888",
                templateName:"Power Sensor",
                templateId:"868966887876",
                saveStatus:false,
            },
            label:"Pump",  
            variable:"var1",
            icon:"fa-sun",
            column:"col-6",
            widget:"indicator",
            class:"success"
            },
        configButton: {
            userId:"userid",
            selectedDevice:{
                name:"home",
                dId:"8888",
                templateName:"Power Sensor",
                templateId:"868966887876",
                saveStatus:false,
            },
            label:"Pump",  
            variable:"var1",
            icon:"fa-sun",
            column:"col-6",
            widget:"indicator",
            class:"success",
            message:"{'fanstatus':'stop'}"
            }            
        }
    },
    methods:{
