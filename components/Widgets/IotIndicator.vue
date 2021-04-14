<template>

<card>
            <div slot="header"> 
            <h4 class="card-tittle">{{config.selectedDevice.name}} -{{config.label}}</h4>
            </div>
            <i class="fa " :class="[config.icon, getIconClass()]" style="font-size:50px"></i>
</card>

</template>

<script>
export default {
    //props:"config",
    data(){
        return{
            value: true,
            config: {

                userId:"userid",
                selectedDevice:{
                    name:"home",
                    dId:"8888",
                    templateName:"Power Sensor",
                    templateId:"868966887876",
                    saveStatus:false,
                },
                label:"Pump",  
                variable:"unniquestr",
                icon:"fa-sun",
                column:"col-6",
                widget:"indicator",
                class:"success"
            }
        };
    },
    mounted(){
        this.$nuxt.$on('widget-topic', this.receivedDataProcess)
    },
    methods:{
        receivedDataProcess(data){
            //console.log("received ");
            console.log (data);
            this.value =  data.value;

        },
        getIconClass(){
            if(!this.value) {
                    return "text-dark";
            }
            if(this.config.class=="success") {
                return "text-success"; 
            } 
            if(this.config.class=="primary") {
                return "text-success";  
            }
            if(this.config.class=="warning"){
                return "text-warning";  
            }
            if(this.config.class=="danger"){
                return "text-danger";  
            }
        }
    }
};

</script>


/// Formato topicos /userId/dId/temperature/data